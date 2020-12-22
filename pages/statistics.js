import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


import MainLayout from '../layouts';
import { ProtectRoute } from '../route';
import '../styles/stats.scss';
import Loader from '../components/loader';
import {getViewData} from '../libs/hooks';


export function Statistics({}){
    const router = useRouter();
    
    
    return (
        <MainLayout>
            <div id='stats'>
                <div id="banner">
                    <div id="overlay"></div>
                    <div id="content">
                        <h1 className="bannerH1">Area Stats</h1>
                        <p className="sub">Get historical data on all areas</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Statistics);