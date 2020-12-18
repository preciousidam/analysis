import React, {useEffect, useState} from 'react';
import { message } from 'antd';

import {InputWithLabel} from '../input';
import {RoundedButton} from '../button';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changePassword } from '../../utility/fetcher';
import useAuth from '../../provider';
import {openNotification} from '../notification';

export const ProfileForm = ({}) => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conNewPassword, setConNewPassword] = useState('');
    const [text, setText] = useState('Change Password');
    const [loading, setLoading] = useState(false);
    const {token, user:{email}} = useAuth();

    const onClick = async _ => {
        if (newPassword == '' || conNewPassword == '' || password == '' ){
            message.error("All details must be provided");
            return;
        }

        if (newPassword != conNewPassword){
            message.error("Password does not match");
            return;
        }

        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);

        const {status, msg} = await changePassword({email, password, password_new: newPassword}, token);
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            clearFields()
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Change Password');
        }
    }

    const clearFields = _ => {
        setPassword('');
        setNewPassword('');
        setConNewPassword('');
        setText('Change Password');
    }


    return (
        <div id="profileForm">
            <InputWithLabel 
                label={<span><FontAwesomeIcon />Current Password</span>}
                id="password"
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />New Password</span>}
                id="newPassword"
                type="password"
                name="newpassword"
                onChange={e => setNewPassword(e.target.value)}
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />Confirm New Password</span>}
                id="conPassword"
                type="password"
                name="connewpassword"
                onChange={e => setConNewPassword(e.target.value)}
            />

            <RoundedButton 
                text={text} 
                onClick={onClick}
                disabled={loading}
                id="create"
            />
        </div>
    )
}