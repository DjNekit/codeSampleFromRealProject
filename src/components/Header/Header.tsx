import React, { useState, useEffect } from 'react'
import axios from 'axios'
import sortBy from 'lodash-es/sortBy'

import { Container } from '../Container'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { Wrapper, HeaderContent } from './style'
import { themes } from '@context'
import { dateTransformer, normalizeActMode } from '@/helpers/index'

export const Header = props => {
    const actMode = normalizeActMode(props.actMode)
    const theme = themes[actMode]

    const defaultSessionInfo = window['PAGE_ACT'] ? {
        text: dateTransformer(window['PAGE_ACT'].startDate) + ' \u2013 ' + dateTransformer(window['PAGE_ACT'].endDate)
    } : {}

    const { isUnifiedAccount, fakeActMode } = props
    const [{ projects, requests, sessionInfo }, setState] = useState({ projects: {}, requests: { active: [], archive: [] }, sessionInfo: defaultSessionInfo })

    useEffect(() => {
        if (!isUnifiedAccount || fakeActMode === 'unified') return undefined;
        axios.post('/ajax/ajax_contact.php', {
            action: 'getRequests'
        }).then(({ data }) => {
            if (!data.result) {
                const requests: { active, archive } = { active: [], archive: [] }
                let sessionInfo = {
                    text: '',
                    organizationName: '',
                    contactFio: ''
                }

                const projects = sortBy(data.message, ['startDate']).reduce((memo, item) => {
                    const { alternativeActMode, isArchive, requestId, startDate, endDate, actId, inSession, organizationName, contactFio, status } = item,
                        containerName = isArchive ? 'archive' : 'active'

                    if (status === 'unreg') return memo;

                    if (!memo[alternativeActMode] && !isArchive)
                        memo[alternativeActMode] = requestId

                    if (alternativeActMode === window['PAGE_ALTERNATIVE_ACT_MODE']) {
                        const text = dateTransformer(startDate) + ' \u2013 ' + dateTransformer(endDate)

                        requests[containerName].push({
                            text,
                            value: actId,
                            href: inSession ? undefined : '/?requestid=' + requestId,
                            disabled: inSession
                        })

                        if (inSession) {
                            sessionInfo = { text, organizationName, contactFio }
                        }
                    }

                    return memo;
                }, {})

                setState({ projects, requests, sessionInfo })
            }
        })
    }, [])

    return (
        <Wrapper>
            <Container>
                <HeaderContent>
                    <Logo
                        icon={theme.logoUrl}
                        title={theme.title}
                        isDefault={actMode === 'default'}
                        requests={requests}
                        sessionInfo={sessionInfo}
                    />
                    <UserMenu {...props} projects={projects} sessionInfo={sessionInfo} />
                </HeaderContent>
            </Container>
        </Wrapper>
    )
}
