import React, {useState} from 'react';
import { Select, Typography } from 'antd';
import { useRouter } from 'next/router';

import MainLayout from '../../../layouts';
import '../../../styles/newprops.scss';
import { Paper } from '@material-ui/core';
import { PropertyForm } from '../../../components/form/property';
import { ProtectRoute, AdminProtectRoute } from '../../../route';


export function New({}){
    
    return (
        <MainLayout title='Admin properties'>
            <div id="main">
                <Paper id="formContainer">
                    <PropertyForm />
                </Paper> 
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(New))