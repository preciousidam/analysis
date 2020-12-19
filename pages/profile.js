import { Paper } from "@material-ui/core";
import { Button, Descriptions } from "antd";
import {PersonOutlineOutlined} from '@material-ui/icons';

import MainLayout from "../layouts";
import useAuth from "../provider";
import { ProtectRoute } from "../route";
import '../styles/profile.scss';
import { ProfileForm } from "../components/form/profile";


export function Profile({}){
    const {user} = useAuth();
    return (
        <MainLayout title="Profile" BreadIcon={<PersonOutlineOutlined fontSize="large" />} >
            
            <div id="main" className="container">
                <div id="overlay"></div>
                <Paper id="formContainer">
                    <header>Profile Details</header>
                    <Descriptions style={{padding: 20}} className="profile" layout="vertical">
                        <Descriptions.Item label="Full Name">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{user.phone}</Descriptions.Item>
                    </Descriptions>
                    <h4 style={{padding: 20}}>Change Password</h4>
                    <div style={{padding: 20}} id="passwordChange">
                        <ProfileForm />
                    </div>                                                                                                 
                </Paper>
                    
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Profile);