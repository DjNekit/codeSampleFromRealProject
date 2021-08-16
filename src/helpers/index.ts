import * as Sentry from '@sentry/browser'
import { storageFactory } from "storage-factory"

export const getStoreData = () => {
    let data = {}
    
    Array.prototype.forEach.call(document.querySelectorAll('input[type=hidden]'), (el) => {
        if (el.name !== 'test_datetime_hook') data[el.name] = el.value
    })

    Array.prototype.forEach.call(document.querySelectorAll('textarea[class=hidden]'), (el) => {
        try {
            data[el.name] = el.innerText ? JSON.parse(el.innerText) : undefined
        } catch (e) {
            logError(e)
            data[el.name] = undefined
        }
    })
    
    return data
}

export const logError = (error => {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error)
    }
})

export function getFileFromURL(url) {
    let base64 = url.split(',')[1],
        bin = atob(base64),
        length = bin.length,
        buf = new ArrayBuffer(length),
        arr = new Uint8Array(buf)

    bin
        .split('')
        .forEach((e,i)=>arr[i]=e.charCodeAt(0))

    return new Blob([buf], { type: 'image/png' })
}

export const plural = (number, one, two, five) => {
    let n = Math.abs(number)

    n %= 100
    if (n >= 5 && n <= 20) return five
    
    n %= 10
    if (n === 1) return one

    if (n >= 2 && n <= 4) return two
    
    return five
}

export const local = storageFactory(() => localStorage)
export const session = storageFactory(() => sessionStorage)

export const isEmptyObj = obj => Object.keys(obj).length ? false : true

export class PhoneFormatter {
    // ? метод извлекает из строки все числа в массив и, по мере увеличения его длины, добавляет скобочки и тире
    static format = (phone = ''): string => {
        const hasPlusOnly = /^\+$/.test(phone)
		if (hasPlusOnly) return '+'
		
		let numbers = phone.match(/\d/g)
		if (!numbers) return ''
		
		const length = numbers.length
		
		const hasPlusNine = /^((\+9)|9)/.test(phone)

		if (hasPlusNine) 
			numbers = numbers.slice(0, 15)
		else 
			numbers = numbers.slice(0, 11)
		
		if (length > 1) numbers.splice(1, 0, '(')
		if (length > 4) numbers.splice(5, 0, ')')
		if (length > 7) numbers.splice(9, 0, '-')
		if (length > 9) numbers.splice(12, 0, '-')

		const number = numbers.join('')

		return `+${number}`
    }

    // ? метод возвращает строку из цифр
    static removeFormat = (phone = ''): string => phone.match(/\d/g)?.join('') || ''
}

