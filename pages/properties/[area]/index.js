import React, {useState} from 'react';
import { Button, Select, Typography } from 'antd';
import { FilePdfFilled} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import {ApartmentOutlined} from '@material-ui/icons';

import MainLayout from '../../../layouts';
import '../../../styles/properties.scss';
import { List } from '../../../components/table/index';
import {  Paper } from '@material-ui/core';
import { ProtectRoute } from '../../../route';
import useAuth from '../../../provider';


const {Option} =  Select;
const {Title} = Typography;

export function Properties({}){

    const router = useRouter();
    const {isAdmin} = useAuth();
    const {area} = router.query;
    const onClick = name => router.push(`/properties/${area}/${name.replace(' ','-')}`);
    
    return (
        <MainLayout title={`Properties ${area}`} 
            BreadIcon={<ApartmentOutlined fontSize="large" />} 
            links={['Properties', 'Properties/'+area]}
        >
            
            <div id="mainContProp">
                <div id="tableContainer">
                    <Paper>
                        <div id="filterContainer">
                            <div id="left">
                                
                                <Select defaultValue='*' className="filterItem">
                                    <Option value='*'>Sort By</Option>
                                    <Option value='price'>Rent</Option>
                                </Select>
                                <Select defaultValue='all' className="filterItem">
                                    <Option value='all'>By year Built</Option>
                                    <Option value={2016}>2016</Option>
                                    <Option value={2017}>2017</Option>
                                    <Option value={2018}>2018</Option>
                                    <Option value={2019}>2019</Option>
                                    <Option value={2020}>2020</Option>
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
                        <List onClick={onClick} area={area} />
                    </Paper>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Properties);