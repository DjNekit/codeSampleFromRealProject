import React from 'react'

import { Modal, Button, Header, Segment, SemanticCOLORS } from 'semantic-ui-react'

interface Props {
    error: {
        message: string
        action: () => void
        actionMessage: string
        title: string
        color?: SemanticCOLORS
    },

    deleteError: () => { type: string }
}
export class GlobalErrorContainer extends React.Component<Props> {
    actionHandler = () => {
        const { error, deleteError } = this.props
        if (typeof error.action === 'function') error.action()

        deleteError()
    }
    render () {
        const { error } = this.props

        if (error) {
            let { message, actionMessage, title='Ошибка', color='red' } = error

            return (
                <Modal size="tiny" onClose={this.actionHandler} closeOnDimmerClick={false} open>
                    <Header icon="warning circle" content={title} color={color} />
                    <Modal.Content>
                        <Segment basic>
                            {!!message && (Array.isArray(message) ? message.map((item, index) => {
                                return <p key={index} dangerouslySetInnerHTML={{ __html: item.text || item }}/>
                            }) :
                                <p dangerouslySetInnerHTML={{ __html: message }} />
                            )}
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color={color} onClick={this.actionHandler}>{actionMessage || 'Закрыть'}</Button>
                    </Modal.Actions>
                </Modal>
            )
        } else {
            return null
        }
    }
}