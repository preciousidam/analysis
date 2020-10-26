import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import { EmailOutlined, PersonOutline, PhoneOutlined } from '@material-ui/icons';
import { LockOutlined } from '@ant-design/icons';

import '../../styles/form.scss';
import { InputWithIcon, SelectInput } from '../input/index';
import { RoundedButton } from '../button';
import { createUser } from '../../utility/fetcher';
import {openNotification} from '../notification';


export default function NewUserForm({}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState('Add User');

    const onClick = async _ => {
        if (name == '' || email == '' || phone == '' || password == '' || role == '')
            message.error("All details must be provided");

        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);

        const {status, msg} = await createUser({name, email, phone, password, role});
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            clearFields()
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Add User');
        }
    }

    const clearFields = _ => {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setRole('');
        setText('Add User');
    }

    return (
        <div id="form">
            <InputWithIcon
                icon={<PersonOutline />}
                placeholder='Full name'
                type="text"
                name="fullname"
                value={name}
                onChange={e => setName(e.target.value)}
                id="name"
            />
            
            <InputWithIcon
                icon={<EmailOutlined />}
                placeholder='Email'
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
            />
            <InputWithIcon
                icon={<PhoneOutlined />}
                placeholder='Phone Number'
                type="tel"
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                id="phone"
            />
            
            <InputWithIcon
                icon={<LockOutlined />}
                placeholder='password'
                type="password"
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
            />
            <SelectInput 
                options={[{value: 1, text: 'Admin'}, {value: 2, text: 'User'}]} 
                value={role}
                onChange={e => setRole(e.target.value)}
                id="role"
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