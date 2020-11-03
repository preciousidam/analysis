import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Button, Select, Typography } from 'antd';
import {PlusOutlined, FilePdfFilled, CloseSquareOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import CustomScroll from 'react-custom-scroll';
import { IconButton, Paper } from '@material-ui/core';

import MainLayout from '../../../layouts';
import { Search } from '../../../components/input';
import '../../styles/createuser.scss';
import { properties } from '../../../libs/data';
import { PropertyList } from '../../../components/table/index';
import Link from 'next/link';
import { PriceChart } from '../../../components/charts';
import { AdminProtectRoute, ProtectRoute } from '../../../route';
import NewUserForm from '../../../components/form/adduser';
import useAuth from '../../../provider';


const {Title} = Typography;

export function Adduser({}){

    const router = useRouter();
    
    return (
        <MainLayout title='Create user'>
            <div>
                
            </div>
            <CustomScroll heightRelativeToParent="calc(100% - 70px)">
                <div id="home">
                    <Paper id="formContainer">
                        <header>
                            <h2>Enter User Details</h2>
                        </header>
                        <NewUserForm />
                    </Paper>
                </div>
            </CustomScroll>
        </MainLayout>
    )
}

export default ProtectRoute(AdminProtectRoute(Adduser));