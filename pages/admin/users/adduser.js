import React, {useState, useEffect} from 'react';
import { Typography } from 'antd';
import { Paper } from '@material-ui/core';

import MainLayout from '../../../layouts';
import '../../../styles/createuser.scss';
import { AdminProtectRoute, ProtectRoute } from '../../../route';
import NewUserForm from '../../../components/form/adduser';



const {Title} = Typography;

export function Adduser({}){
    
    return (
        <MainLayout title='Create user'>
            <div id="home">
                <Paper id="formContainer">
                    <header>
                        <Title level={2}>Enter User Details</Title>
                    </header>
                    <NewUserForm />
                </Paper>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(Adduser));