import React, {useState} from 'react';
import moment from 'moment';
import { Button, Select, Typography } from 'antd';
import {PlusOutlined, FilePdfFilled, CloseSquareOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import CustomScroll from 'react-custom-scroll';
import { IconButton, Paper } from '@material-ui/core';
import {HomeOutlined} from '@material-ui/icons';

import MainLayout from '../layouts';
import { SelectInput, Search } from '../components/input';
import '../styles/index.scss';
import { properties } from '../libs/data';
import { PropertyList } from '../components/table/table';
import Link from 'next/link';
import { PriceChart } from '../components/charts';
import { ProtectRoute } from '../route';


const {Title} = Typography;

export function Home({}){

    const router = useRouter();
    const [bed, setBed] = useState(3);

    
    return (
        <MainLayout title='Dashboard' BreadIcon={<HomeOutlined fontSize='large' />}>
            <CustomScroll heightRelativeToParent="calc(100% - 67px)">
                <div id="home">
                    <div id="top">
                        <div className="card">
                            <span>PROPERTIES</span>
                            <Title level={3}>{properties.length}</Title>
                        </div>
                        <div className="card">
                            <span>LEKKI</span>
                            <Title level={3}>{properties.length}</Title>
                        </div>
                        <div className="card">
                            <span>VICTORIA ISLAND</span>
                            <Title level={3}>{properties.length}</Title>
                        </div>
                        <div className="card">
                            <span>IKOYI</span>
                            <Title level={3}>{properties.length}</Title>
                        </div>
                    </div>
                    <div id="table-chart">
                        <Paper id="float-left">
                            <header>
                                <h3>Average rent</h3>
                                <SelectInput 
                                    id="sBedroom" 
                                    value={bed}
                                    onChange={e => setBed(e.target.value)}
                                    label=""
                                    options={[
                                        {text: '1 Bedroom', value:1},
                                        {text: '2 Bedroom', value:2},
                                        {text: '3 Bedroom', value:3},
                                        {text: '4 Bedroom', value:4},
                                    ]} 
                                />
                            </header>
                            <PriceChart />
                        </Paper>
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
                                <Link href="/properties"><a>View All<FontAwesomeIcon icon='arrow-right' style={{marginLeft: 5}} /></a></Link>
                            </div>
                            <PropertyList />
                        </Paper>
                    </div>
                    <Paper id="bedPriceCont">
                        
                    </Paper>
                </div>
            </CustomScroll>
        </MainLayout>
    )
}

export default ProtectRoute(Home);