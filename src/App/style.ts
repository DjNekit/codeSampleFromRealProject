import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
    html {
        font-size: 14px;

        @media (max-width: 992px) {
            font-size: 13px;
        }
        @media (max-width: 576px) {
            font-size: 11px;
        }
        
    }

    .text_center {
        text-align: center;
    }

    body {
        height: auto;
        background-color: #efedf1;
    }

    .ui.dropdown .menu > .divider.horizontal {
        border-top: none;
    }

    .ui.form > textarea[disabled] {
        opacity: 0.45;
    }

    .ui.modals.dimmer {
        z-index: 1090;
    }

    .ui.dropdown .menu > .divider.horizontal {
        border-top: none;
    }

    @media (min-width: 1199px) {
        .container {
            min-width: 978px;
        }
    }

    @media (min-width: 768px) {
        .hiddenDesktop  {
            display: none!important;
        }
    }

    @media screen and (max-width: 767px) {
        .ui.table:not(.unstackable) tbody.hiddenMobile, 
        .ui.table:not(.unstackable) tr.hiddenMobile, 
        .ui.table:not(.unstackable) tr>td.hiddenMobile, 
        .ui.table:not(.unstackable) tr>th.hiddenMobile,
        .hiddenMobile {
            display: none!important;
        }
        .ui.search.dropdown .menu {
            max-height: 50vh;
        }
        .modals.dimmer {
            padding: .2em;
        }
        .modals.dimmer .ui.scrolling.modal {
            margin: 0;
        }
    }
`