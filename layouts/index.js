import React, {useState, useEffect} from 'react';
import Head from "next/head";
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

import '../styles/layout.scss';
import Sidebar, {MinSideBar} from '../components/sidebar';
import Header from '../components/header';
import { Breadcrumb } from '../components/breadcrumb';
import CustomScroll from 'react-custom-scroll';
import { Footer } from '../components/footer';


export const MainLayout = ({children, title="", BreadIcon, links=[], right}) => {

    const [min, setMin] = useState(false);
    
    const router = useRouter();
    const className = min ? 'col-sm-11 max' : 'col-sm-10';

    const handleToogle = e => {
        e.preventDefault();
        setMin(!min);
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler)
    },[min]);

    const resizeHandler = _ => {
        if (window.innerWidth < 1000) setMin(true)
        else setMin(false)
    }
    
    return (
        <div className="main">
            <Head>
                <title>NAPIMS | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="mainContainer" className="container-fluid">
                
                <div className="row" id="mainContent">
                    {min? <MinSideBar min={min} /> :<Sidebar min={min} />}
                    <div className={`${className} content-area`}>
                        <Header toogle={handleToogle} />
                        <Breadcrumb 
                            pageTitle={title}
                            pageIcon={BreadIcon}
                            links={['Home', ...links]}
                            right={right}
                        />
                        <CustomScroll heightRelativeToParent="calc(100% - 135px)">
                            {children}
                            <Footer />
                        </CustomScroll>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainLayout;

MainLayout.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    right: PropTypes.element,
    links: PropTypes.arrayOf(PropTypes.string),
}