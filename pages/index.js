import React, {useState} from 'react';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { Paper } from '@material-ui/core';
import {HomeOutlined} from '@material-ui/icons';

import MainLayout from '../layouts';
import { SelectInput, Search } from '../components/input';
import '../styles/index.scss';
import { PropertyList } from '../components/table/table';
import { PriceChart } from '../components/charts';
import { ProtectRoute } from '../route';
import { getViewData } from '../libs/hooks';


const {Title} = Typography;
const areas = [
    {code: 'vi', text:"VICTORIA ISLAND"},
    {code: 'ikoyi', text:"IKOYI"},
    {code: 'lekki', text:"LEKKI"},
    {code: 'oniru', text:"ONIRU"},
]

export function Home({}){

    const router = useRouter();
    
    return (
        <MainLayout title='Dashboard' BreadIcon={<HomeOutlined fontSize='large' />}>
            <div id="home">
                <div id="top" className="row">
                    {
                        areas.map(area => (
                            <div className='col-sm-3'>
                                <CountCard area={area} />
                            </div>
                        ))
                    }
                    
                </div>
                <div id="table-chart" className="row">
                    <div  className="col-sm-8">
                        <Paper id="float-left">
                            <PriceChart />
                        </Paper>
                    </div>
                    <div  className="col-sm-4">
                        <Paper id="float-right">
                            <div 
                                style={{
                                    padding: 20, 
                                    display: "flex", 
                                    flexDirection: 'row', 
                                    justifyContent: "space-between", 
                                    alignItems: "center"
                                }}
                            >
                                <Search placeholder="Search" />
                                {/*<Link href="/properties"><a>View All<FontAwesomeIcon icon='arrow-right' style={{marginLeft: 5}} /></a></Link>*/}
                            </div>
                            <PropertyList />
                        </Paper>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Home);

export const CountCard = ({area}) => {
    const {data, isLoading} = getViewData(`properties/${area.code}`);

    return(
        !isLoading && <div className="card">
            <span>{area.text}</span>
            <Title level={3}>{data.length}</Title>
        </div>
    )
}