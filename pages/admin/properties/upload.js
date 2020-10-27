import React, {useState} from 'react';
import moment from 'moment';
import { Button, Select, Typography } from 'antd';
import {PlusOutlined, FilePdfFilled, CloseSquareOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import MainLayout from '../../../layouts/mainLayout';
import { Search } from '../../../components/input/index';
import '../../styles/properties.scss';
import { List } from '../../../components/table/index';
import CustomScroll from 'react-custom-scroll';
import { IconButton, Paper } from '@material-ui/core';
import { UploadComponent } from '../../../components/form/upload';
import { PropertyForm } from '../../../components/form/property';
import { ProtectRoute } from '../../../route/index';


const {Option} =  Select;
const {Title} = Typography;

export function Upload({}){

    const router = useRouter();
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPropForm, setShowPropForm] = useState(false);
    
    return (
        <MainLayout title='Admin properties'>
            
            <CustomScroll heightRelativeToParent="calc(100%)">
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
                                    <Button 
                                        type='primary'
                                    > 
                                        <FontAwesomeIcon icon='file-csv' color="#fff" style={{marginRight: 10}} />
                                        Export CSV
                                    </Button>

                                    <Button 
                                        type='primary' 
                                        danger
                                    >
                                        <FilePdfFilled />
                                        Export PDF
                                    </Button>
                                </div>
                            </div>
                            <List />
                        </Paper>
                    </div>
                </div>
            </CustomScroll>
            {showUploadForm && <div className="overlay" >
                <div id="uploadContainer">
                    <IconButton className="close" onClick={_ => setShowUploadForm(false)}>
                        <CloseSquareOutlined />
                    </IconButton>
                    <UploadComponent />
                </div>
            </div>}
            {showPropForm && <div className="overlay" >
                <div id="formContainer">
                    <div id="header">
                        <IconButton className="close" onClick={_ => setShowPropForm(false)}>
                            <CloseSquareOutlined />
                        </IconButton>
                        <Title level={3}>New Property</Title>
                    </div>
                    <CustomScroll heightRelativeToParent='calc(100%)'>
                        <PropertyForm />
                    </CustomScroll>
                </div>
            </div>}
        </MainLayout>
    )
}

export default ProtectRoute(Upload);