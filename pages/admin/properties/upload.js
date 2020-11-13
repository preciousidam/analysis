import React, {useState} from 'react';

import MainLayout from '../../../layouts';
import '../../../styles/newprops.scss';
import { Paper } from '@material-ui/core';
import { UploadComponent } from '../../../components/form/upload';
import { ProtectRoute, AdminProtectRoute } from '../../../route';


export function New({}){
    
    return (
        <MainLayout title='Admin properties'>
            <div id="main">
                <Paper id="formContainer">
                    <UploadComponent />
                </Paper> 
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(New))