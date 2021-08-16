import React from 'react'
import * as Sentry from '@sentry/browser';

import { Dropdown, Card, Image, Icon, Button } from 'semantic-ui-react'
import { DropdownMenu } from '../style'

import * as constants from '../../../constants'
const styles = require('../UnifiedAccountType/style.css')

export const TeacherUserType = ({ teacherDemoActMode, userName, userType }) => {
    Sentry.configureScope(function(scope) {
        scope.setTag("userName", userName);
    })
    
    function renderUserWindow() {
        return(
            <Dropdown
                icon={null}
                floating
                trigger={
                    <Icon link name='user circle' size='large'/>
                }
                direction="left"
            >
                <DropdownMenu>
                    <Card>
                        <Card.Content>
                            <Card.Description as="h4"><Icon name='user circle'/>{userName}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button className={styles.exit} color="blue" floated="right" href="/index.php?menu=forvuzes&action=exit">
                                Выйти
                            </Button>
                        </Card.Content>
                    </Card>
                </DropdownMenu>
            </Dropdown>
        )
    }
    function redirectLink(e, actMode) {
        e.preventDefault();
        e.stopPropagation();

        if (window['yaCounter1240185']) {
            window['yaCounter1240185'].reachGoal('CHANGE_PROJECT');
        }

        location.href = `index.php?menu=forvuzes&teacher-selected-project=${actMode}`;
    }
    function renderDropdownProjects() {
        const teacherProjects = ['ias', 'fepo'];

        return (
            <Dropdown
                icon={null}
                floating
                trigger={
                    <Icon link name='block layout' size='large'/>
                }
                direction="left"
                className="teacherProjects"
            >
                <DropdownMenu className='dropdown_card_projects'>
                    <Card>
                        <Card.Content className={styles.headerTeacherProjects}>
                            <div>
                                <strong>Перейти в личный кабинет проекта</strong>
                            </div>
                        </Card.Content>
                        <Card.Content>
                            <Card.Group stackable itemsPerRow={2}>
                                {teacherProjects.map((actMode, index) => {
                                    var { icon, shortName } = constants.projects[actMode];
                                    return ( 
                                        <Card className={styles.project_card} key={index} href={'#'} onClick={e => redirectLink(e, actMode)}>
                                            <div className={`${styles.wrapImg} ${styles[actMode]}`}>
                                                <Image src={icon} className={styles[actMode]}/>
                                            </div>
                                            <Card.Meta textAlign="center">{ shortName }</Card.Meta>
                                        </Card>
                                )})}
                            </Card.Group>
                        </Card.Content>
                    </Card>
                </DropdownMenu>
            </Dropdown>
        )
    }

    return (
        <React.Fragment>
            {!teacherDemoActMode && userType == 'teacher' && renderDropdownProjects()}
            {renderUserWindow()}
        </React.Fragment>
    )
}