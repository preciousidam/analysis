import React, {useState} from 'react';
import { Select, Typography } from 'antd';
import { useRouter } from 'next/router';

import MainLayout from '../../../layouts';
import '../../../styles/newprops.scss';
import CustomScroll from 'react-custom-scroll';
import { Paper } from '@material-ui/core';
import { UploadComponent } from '../../../components/form/upload';
import { ProtectRoute, AdminProtectRoute } from '../../../route';


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
                        <UploadComponent />
                    </Paper> 
                </div>
            </CustomScroll>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(New))