import React from 'react'
import ThemeContext from '@context'

import { Input } from 'semantic-ui-react'

import './style.css'

const ThemedInlineInput = (props) => {
    return (
        <ThemeContext.Consumer>
            {theme => <Input {...props} className={theme.primary} />}
        </ThemeContext.Consumer>
    )
}

export default ThemedInlineInput