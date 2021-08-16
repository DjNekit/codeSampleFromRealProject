import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, { useEffect } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Layout } from '@/components/Layout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ThemeContext, { themes } from '@context'
import * as actions from '@globalActions'

import { GlobalStyle } from './style'
import 'normalize.min.css/normalize.min.css'

import * as Sentry from '@sentry/browser'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: "https://example.com/8" })
}

const App = props => {

  useEffect(() => {
    const { showGlobalError } = props.actions
    axios.interceptors.request.use(config => {
      let { data } = config

      const inputTestDateTime: HTMLInputElement | null = document.querySelector('input[name="test_datetime_hook"]')
      const test_datetime_hook = inputTestDateTime?.value
      if (test_datetime_hook) data.test_datetime_hook = test_datetime_hook

      if (!(data instanceof FormData)) {

        data.page_session_hash = window['PAGE_SESSION_HASH']


        if (window['PAGE_ACT']) {
          data.page_actid = window['PAGE_ACT'].id
          data.page_act_mode = window['PAGE_ACT'].mode
        }
      }
      return config
    })

    axios.interceptors.response.use(response => {
      let { data } = response

      if (data.result == -1 && data.message === 'need authorization') {
        showGlobalError('Не удалось выполнить запрос. Для продолжения работы необходимо перезагрузить страницу.', {
          action: () => document.location.reload(),
          actionMessage: 'Перезагрузить страницу',
          priority: true
        })
      }
      if (data.result === -2) {
        showGlobalError(data.message, {
          actionMessage: 'Перезагрузите страницу',
          action: () => { document.location.reload() },
          priority: true
        })
      }

      return response
    })
  }, [])

  const actMode = window['PAGE_ALTERNATIVE_ACT_MODE'] || props.fakeActMode || props.actMode

  return (
    <ThemeContext.Provider value={Object.assign({}, themes.default, themes[actMode])}>
      <ErrorBoundary>
        <Layout {...props}>
          <ErrorBoundary>
            {props.children}
          </ErrorBoundary>
        </Layout>
      </ErrorBoundary>
      <GlobalStyle />
    </ThemeContext.Provider>
  )
}

const mapStateToProps = ({ actMode, fakeActMode, userName, GLOBAL_ERROR, MODAL, headerSecondaryMenu, allMenuLinks, isUnifiedAccount, header }) => ({
  actMode,
  fakeActMode,
  userName,
  GLOBAL_ERROR,
  MODAL,
  headerSecondaryMenu,
  allMenuLinks,
  isUnifiedAccount,
  header,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)