import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import 'react-custom-scroll/dist/customScroll.css';
import '../styles/styles.scss';


config.autoAddCss = false;
 
import { faBars, faSpinner, faCheck, faEnvelope, faListAlt, faPlus,faFilePdf, faExchangeAlt, faUser,
        faCreditCard, faMoneyBillAlt, faEllipsisH, faCaretDown, faCalendarAlt, faMapMarkedAlt, faMapMarkerAlt,
        faArrowUp, faArrowDown, faBell, faSearch, faFileCsv, faMapPin, faBed, faBuilding, faArrowRight,} 
from '@fortawesome/free-solid-svg-icons';

import {fab,faEtsy} from '@fortawesome/free-brands-svg-icons';
import { AuthProvider } from '../provider/index';
 
library.add(faBars,faSpinner, faCheck, faEnvelope, faListAlt, faCalendarAlt, faMapPin, faBed, faBuilding,
            faFilePdf, faExchangeAlt, faCreditCard, faMoneyBillAlt, faEllipsisH, faMapMarkedAlt, faUser,
           faCaretDown, faArrowUp, faArrowDown, faEtsy, faPlus, faBell, faSearch, faFileCsv, faArrowRight,
           faMapMarkerAlt,);

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
 
const MyApp = ({ Component, pageProps }) => (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
);
 
export default MyApp;