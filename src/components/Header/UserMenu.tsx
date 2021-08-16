import React from 'react'

import { TeacherUserType } from './TeacherUserType'
import { UnifiedAccountType } from './UnifiedAccountType'
import { UserMenuWrapper } from './style'

export const UserMenu = (props) => {
    const { userName, teacherDemoActMode, userType, isUnifiedAccount, fakeActMode, projects, sessionInfo } = props

    return (
        <UserMenuWrapper show={!!userName}>
            {isUnifiedAccount 
                ? <UnifiedAccountType projects={projects} fakeActMode={fakeActMode} sessionInfo={sessionInfo} />
                : <TeacherUserType userType={userType} userName={userName} teacherDemoActMode={teacherDemoActMode} />}
        </UserMenuWrapper>
    )
}
