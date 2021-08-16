import React from 'react'
import ThemeContext from '../../theme/context'

import { Button } from 'semantic-ui-react'

const ThemedButton = (props) => {
    return (
        <ThemeContext.Consumer>
            {theme => <Button {...props} color={theme.primary} />}
        </ThemeContext.Consumer>
    )
}

export default ThemedButton