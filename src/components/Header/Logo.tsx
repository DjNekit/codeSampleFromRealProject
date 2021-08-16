import React from 'react'
import { Item, Dropdown } from 'semantic-ui-react'

import { LogoWrapper, Img, Div, DropdownMenu } from './style'

type Props = {
    icon: string
    title: string 
    isDefault: boolean
    requests: any
    sessionInfo: any
}
export const Logo: React.FC<Props> = ({ icon, title, isDefault, requests, sessionInfo }) => {
    return (
        <LogoWrapper>
            <Img src={icon} isDefault={isDefault} />
            <Div>
                {title} 

                {requests.active.length > 0 && requests.archive.length > 0 && (
                    <Item.Description>
                        <Dropdown
                            compact
                            wrapSelection={false}
                            text={sessionInfo.text}
                            className='dropdown_stages'
                        >
                            <DropdownMenu>
                                {!!requests.active.length && <React.Fragment>
                                    <Dropdown.Header>Активные</Dropdown.Header>
                                    <Dropdown.Divider />
                                </React.Fragment>}
                                {requests.active.map((item, key) => <Dropdown.Item key={key} {...item} />)}
                                {!!requests.archive.length && <React.Fragment>
                                    <Dropdown.Header>Архивные</Dropdown.Header>
                                    <Dropdown.Divider />
                                </React.Fragment>}
                                {requests.archive.reduceRight((memo, item, key) => {
                                    memo.push(<Dropdown.Item key={key} {...item} />)

                                    return memo
                                }, [])}
                            </DropdownMenu>
                        </Dropdown>
                    </Item.Description>
                )}
            </Div>
        </LogoWrapper>
    )
}
