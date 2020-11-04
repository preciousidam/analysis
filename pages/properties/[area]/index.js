import React, {useState} from 'react';
import { Button, Select, Typography } from 'antd';
import { FilePdfFilled} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import {ApartmentOutlined} from '@material-ui/icons';

import MainLayout from '../../../layouts';
import { Search } from '../../../components/input';
import '../../../styles/properties.scss';
import { List } from '../../../components/table/index';
import CustomScroll from 'react-custom-scroll';
import {  Paper } from '@material-ui/core';
import { ProtectRoute } from '../../../route';
import useAuth from '../../../provider';


const {Option} =  Select;
const {Title} = Typography;

export function Properties({}){

    const router = useRouter();
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPropForm, setShowPropForm] = useState(false);
    const {isAdmin} = useAuth();
    const {area} = router.query;
    const onClick = id => router.push(`${area}/${id}`);
    
    return (
        <MainLayout title={`Properties ${area}`} BreadIcon={<ApartmentOutlined fontSize="large" />}>
            
            <CustomScroll heightRelativeToParent="calc(100% - 135px)">
                <div id="main">
                    <div id="tableContainer">
                        <Paper>
                            <div id="filterContainer">
                                <div id="left">
                                    <Search />
                                    <Select defaultValue='*' className="filterItem">
                                        <Option value='*'>Sort By</Option>
                                        <Option value='price'>Price</Option>
                                        <Option value='area'>Area</Option>
                                    </Select>
                                    <Select defaultValue='all' className="filterItem">
                                        <Option value='all'>All Locales</Option>
                                        <Option value='lekki'>Lekki</Option>
                                        <Option value='victoria island'>Victoria Island</Option>
                                        <Option value='ikoyi'>Ikoyi</Option>
                                        <Option value='lekki phase ii'>Lekki phase II</Option>
                                    </Select>
                                </div>
                                <div id="right">
                                    {isAdmin && <Button 
                                        type='primary'
                                    > 
                                        <FontAwesomeIcon icon='file-csv' color="#fff" style={{marginRight: 10}} />
                                        Export CSV
                                    </Button>}

                                    <Button 
                                        type='primary' 
                                        danger
                                    >
                                        <FilePdfFilled />
                                        Export PDF
                                    </Button>
                                </div>
                            </div>
                            <List onClick={onClick} />
                        </Paper>
                    </div>
                </div>
            </CustomScroll>
        </MainLayout>
    )
}

export default ProtectRoute(Properties);