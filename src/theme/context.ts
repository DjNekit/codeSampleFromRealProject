import React from 'react'

export const themes = {
    diag: {
        primary: 'purple',
        primaryColor: '#a333c8',
        logoUrl: '/images/portal/icon-diag.png',
        title: 'Диагностическое интернет-тестирование студентов первого курса',
        href: '//diag.i-exam.ru/'
    },
    diag9: {
        primary: 'purple',
        primaryColor: '#a333c8',
        logoUrl: '/images/portal/icon-diag.png',
        title: 'Диагностика (тестирование на базе 9 классов)',
        href: '//diag.i-exam.ru/'
    },
    diag11: {
        primary: 'purple',
        primaryColor: '#a333c8',
        logoUrl: '/images/portal/icon-diag.png',
        title: 'Диагностика (тестирование на базе 11 классов)',
        href: '//diag.i-exam.ru/'
    },
    psych: {
        primary: 'purple',
        primaryColor: '#a333c8',
        logoUrl: '/images/portal/icon-diag.png',
        title: 'Диагностическое интернет-тестирование студентов первого курса',
        href: '//diag.i-exam.ru/'
    },
    fepo: {
        primary: 'green',
        primaryColor: '#4caf50',
        logoUrl: '/images/portal/icon-fepo.png',
        title: 'ФЭПО',
        href: '//fepo.i-exam.ru/'
    },
    ias: {
        primary: 'blue',
        primaryColor: '#2185d0',
        logoUrl: '/images/portal/icon-training.png',
        title: 'Интернет-тренажеры',
        href: '//training.i-exam.ru/'
    },
    olymp: {
        primary: 'orange',
        primaryColor: '#f2711c',
        logoUrl: '/images/portal/icon-olymp.png',
        title: 'Интернет-олимпиады (международные)',
        href: '//olymp.i-exam.ru/'
    },
    olps: {
        primary: 'orange',
        primaryColor: '#f2711c',
        logoUrl: '/images/portal/icon-olymp.png',
        title: 'Интернет-олимпиады (междисциплинарные)',
        href: '//olymp.i-exam.ru/'
    },
    fieb: {
        primary: 'pink',
        primaryColor: '#FF1493',
        logoUrl: '/images/portal/icon-bakalavr.png',
        title: 'ФИЭБ (базовая площадка)',
        href: '//bakalavr.i-exam.ru/'
    },
    fieb_part: {
        primary: 'pink',
        primaryColor: '#FF1493',
        logoUrl: '/images/portal/icon-bakalavr.png',
        title: 'ФИЭБ (вуз-участник)',
        href: '//bakalavr.i-exam.ru/'
    },
    fieb_tren: {
        primary: 'red',
        primaryColor: '#d81558',
        logoUrl: '/images/portal/icon-fieb-tren.png',
        title: 'Тренажер ФИЭБ',
        href: '//bakalavr.i-exam.ru/'
    },
    fos: {
        primary: '#yellow',
        primaryColor: '#fbbd08',
        logoUrl: '/images/portal/icon-fos.png',
        title: 'Мастер ФОС',
        href: '//fos.i-exam.ru/'
    },
    default: {
        primary: 'blue',
        primaryColor: '#4caf50',
        logoUrl: '/images/portal/icon-default.png',
        title: 'Единый портал интернет-тестирования в сфере образования',
        href: '//i-exam.ru/'
    },
    studentProfile: {
        primary: 'blue',
        primaryColor: '#4caf50',
        logoUrl: '/images/portal/icon-default.png',
        title: 'Личный кабинет',
        href: '//i-exam.ru/'
    },
    unified: {
        primary: 'blue',
        primaryColor: '#2185d0',
        logoUrl: '/images/portal/icon-default.png',
        title: 'Единый личный кабинет',
        href: '//i-exam.ru/'
    }
}
  
const ThemeContext = React.createContext(themes.default)

export default ThemeContext