import React, {useState} from 'react';
import moment from 'moment';
import { Button, Select, Typography } from 'antd';
import {PlusOutlined, FilePdfFilled, CloseSquareOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import CustomScroll from 'react-custom-scroll';
import { IconButton, Paper } from '@material-ui/core';

import MainLayout from '../layouts';
import { Search } from '../components/input';
import '../styles/index.scss';
import { properties } from '../libs/data';
import { PropertyList } from '../components/table/table';
import Link from 'next/link';
import { PriceChart } from '../components/charts';
import { ProtectRoute } from '../route';


const {Title} = Typography;

export function Home({}){

    const router = useRouter();
    
    return (
        <MainLayout title='Properties'>
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
                            <div>
                                <h3>Average rent for 3Bedroom</h3>
                                
                            </div>
                            <PriceChart />
                        </Paper>
                        <Paper id="float-right">
                            <div style={{padding: 20, display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
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