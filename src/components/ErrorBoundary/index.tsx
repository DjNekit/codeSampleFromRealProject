import React from 'react'
import { Message } from 'semantic-ui-react'
import { logError } from '@/helpers/index'

interface Props {
    fallback?: React.ReactNode
    children: React.ReactNode
}
export class ErrorBoundary extends React.Component<Props> {
    state = { hasError: false }

    componentDidCatch(error) {
        this.setState({ hasError: true })
        logError(error)
    }

    render() {
        const {
            fallback = <Message icon="bug" size="big" content="Возникла непредвиденная ошибка :(" />,
            children
        } = this.props

        return this.state.hasError
            ? fallback
            : children
    }
}