import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Icon, Card, Popup, Image, Container } from 'semantic-ui-react'
import axios from 'axios'
import * as Sentry from '@sentry/browser'

import * as constants from '@/constants'
import { DropdownMenu } from '../style'
const styles = require('./style.css')

export const UnifiedAccountType = ({ fakeActMode, projects, sessionInfo }) => {
    const projectKeys: any = Object.keys(projects)
    const [userInfo, setState] = useState({ email: '' })

    useEffect(() => {
        axios.post('/ajax/ajax_contact.php', {
            action: 'getUserInfo',
        }).then(({ data }) => {
            if (!data.result && data.message) {
                //временное решение. Ошибка может возникнуть до того как выполнится запрос. Тогда email не отправится
                Sentry.configureScope(function (scope) {
                    scope.setTag("email", data.message.email)
                })
                setState(data.message)
            }
        })
    }, [])

    function handleChangeProject() {
        if (window['yaCounter1240185']) {
            window['yaCounter1240185'].reachGoal('CHANGE_PROJECT_ELK')
        }
    }

    function renderProjectCards() {
        if (!projectKeys.length) return (
            <Container className={styles.noProjects}>
                <h5>В настоящее время заявки на
                    участие образовательной организации
                    в проектах отсутствуют или находятся в
                    обработке.</h5>
            </Container>
        )
        var fosIndex = projectKeys.findIndex(el => {
            return el == 'fos' ? true : false
        })
        var fosElement: any = projectKeys.splice(fosIndex, 1)
        projectKeys.push(fosElement)

        return projectKeys.map((actMode, index) => {
            const { icon, secondHeader, fullName, firstHeader } = constants.projects[actMode]
            return <Popup
                key={index}
                trigger={
                    <Card href={'/?requestid=' + projects[actMode]} className={styles.project_card} onClick={handleChangeProject}>
                        <div className={`${styles.wrapImg} ${styles[actMode]}`}>
                            <Image src={icon} className={styles[actMode]} />
                        </div>
                        <Card.Meta textAlign="center">{firstHeader}</Card.Meta>
                    </Card>
                }
                content={secondHeader || fullName}
                position='bottom center'
            />
        })
    }

    return (
        <React.Fragment>
            {fakeActMode !== 'unified' &&
                <Dropdown
                    icon={null}
                    floating
                    trigger={
                        <Icon link name='block layout' size='large' />
                    }
                    direction="left"
                >
                    <DropdownMenu className='dropdown_card_projects'>
                        <Card>
                            <Card.Content>
                                <Card.Group stackable itemsPerRow={projectKeys.length || 1}>
                                    {renderProjectCards()}
                                </Card.Group>
                            </Card.Content>
                            <Card.Content extra>
                                <a href="/index.php?menu=forvuzes&action=projects" className={styles.exitLink}>Единый личный кабинет</a>
                            </Card.Content>
                        </Card>
                    </DropdownMenu>
                </Dropdown>
            }
            <Dropdown
                icon={null}
                floating
                trigger={
                    <Icon link name='user circle' size='large' />
                }
                direction="left"
            >
                <DropdownMenu>
                    <Card>
                        <Card.Content>
                            <Card.Description as="h4"><Icon name='user circle' /> {userInfo.email}</Card.Description>
                            <Card.Description textAlign='left'>{sessionInfo.organizationName}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button className={styles.exit} color="blue" floated="right" href="/index.php?menu=forvuzes&action=exit">
                                Выйти
                            </Button>
                        </Card.Content>
                    </Card>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}