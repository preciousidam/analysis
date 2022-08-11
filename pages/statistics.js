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
    const [activeState, setActiveState] = useState('');
    const Stats = dynamic(
        () => import('../components/detailsPage/stats'), {ssr: false, loading: () => <Loader />}
    )

    useEffect(() => {
        if (areas && activeArea === '') setActiveArea(areas[0].area)
        if (areas && activeState === '') setActiveState(areas[0].state)
    }, [areas]);

    return (
        <MainLayout>
            <div id='stats'>
                <div id="stat-banner">
                    <div id="overlay"></div>
                    <div id="content">
                        <h1 className="bannerH1">Location Stats</h1>
                        <p className="sub">Get historical data on all locations</p>
                    </div>
                </div>
                <div id="mainContent" className="container">
                    <div id="statList">
                        <div id="controllers">
                            { (isBrowser && !isAreaLoading) && areas.sort((a,b) => a.area < b.area? -1 : 
                                a.area == b.area? 0 : 1).map(({area, state}) => 
                                <div id={area === 'wuse II'? 'wuse': area} 
                                    className="button control"
                                    onClick={e => {
                                        setActiveArea(area);
                                        setActiveState(state);
                                    }}
                                >
                                    <span>{area === 'vi'? 'Victoria Island': area === 'ph'? "Port Harcourt": area}</span>
                                    {area === activeArea && <span className="tick"><FontAwesomeIcon icon="check" size="sm" color="#fff" /></span>}
                                </div>)
                            }
                            {
                                (isMobile && !isAreaLoading) && <SelectInput
                                    onChange={e => {
                                        let act = areas.find(({area}) => area == e.target.value);
                                        setActiveArea(act.area);
                                        setActiveState(act.state);
                                    }}
                                    value={activeArea}
                                    options={areas?.sort((a,b) => a.area < b.area? -1 : 
                                        a.area == b.area? 0 : 1)?.map(({area}) => ({value: area, text: area === 'vi'? 'Victoria Island'.toUpperCase(): area === 'ph'? "Port Harcourt".toUpperCase(): area.toUpperCase()}))} 
                                />
                            }
                        </div>
                        {activeArea !== '' && <Stats area={activeArea} state={activeState} />}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}



export default ProtectRoute(Statistics);