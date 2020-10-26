import React, {useState} from 'react';
import moment from 'moment';
import { Button, Select, Typography } from 'antd';
import {PlusOutlined, FilePdfFilled, CloseSquareOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import MainLayout from '../../../layouts/index';
import { Search } from '../../../components/input/index';
import '../../../styles/newprops.scss';
import { List } from '../../../components/table/index';
import CustomScroll from 'react-custom-scroll';
import { IconButton, Paper } from '@material-ui/core';
import { properties } from '../../../libs/data';
import { UploadComponent } from '../../../components/form/upload';
import { PropertyForm } from '../../../components/form/property';
import { ProtectRoute, AdminProtectRoute } from '../../../route/index';


const {Option} =  Select;
const {Title} = Typography;

export function New({}){

    const router = useRouter();
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPropForm, setShowPropForm] = useState(false);
    
    return (
        <MainLayout title='Admin properties'>
            <CustomScroll heightRelativeToParent="calc(100% - 70px)">
                <div id="main">
                    <Paper id="formContainer">
                        <PropertyForm />
                    </Paper> 
                </div>
            </CustomScroll>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(New))