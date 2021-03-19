import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


import MainLayout from '../layouts';
import { ProtectRoute } from '../route';
import '../styles/stats.scss';
import Loader from '../components/loader';
import {getViewData} from '../libs/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isBrowser, isMobile } from 'react-device-detect';
import { SelectInput } from '../components/input';


export function Statistics({}){
    const router = useRouter();
    const {isLoading: isAreaLoading, data: areas} = getViewData('areas');
    const [activeArea, setActiveArea] = useState('');
    const Stats = dynamic(
        () => import('../components/detailsPage/stats'), {ssr: false, loading: () => <Loader />}
    )
    
    useEffect(() => {
        if (areas && activeArea === '') setActiveArea(areas[0])
    }, [areas]);

    return (
        <MainLayout>
            <div id='stats'>
                <div id="stat-banner">
                    <div id="overlay"></div>
                    <div id="content">
                        <h1 className="bannerH1">Area Stats</h1>
                        <p className="sub">Get historical data on all areas</p>
                    </div>
                </div>
                <div id="mainContent" className="container">
                    <div id="statList">
                        <div id="controllers">
                            { (isBrowser && !isAreaLoading) && areas.map(area => 
                                <div id={area === 'wuse II'? 'wuse': area} 
                                    className="button control"
                                    onClick={e => setActiveArea(area)}
                                >
                                    <span>{area === 'vi'? 'Victoria Island': area === 'ph'? "Port Harcourt": area}</span>
                                    {area === activeArea && <span className="tick"><FontAwesomeIcon icon="check" size="sm" color="#fff" /></span>}
                                </div>)
                            }
                            {
                                (isMobile && !isAreaLoading) && <SelectInput
                                    onChange={e => setActiveArea(e.target.value)}
                                    value={activeArea}
                                    options={areas?.map(area => ({value: area, text: area === 'vi'? 'Victoria Island'.toUpperCase(): area === 'ph'? "Port Harcourt".toUpperCase(): area.toUpperCase()}))} 
                                />
                            }
                        </div>
                        {activeArea !== '' && <Stats area={activeArea} />}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}



export default ProtectRoute(Statistics);