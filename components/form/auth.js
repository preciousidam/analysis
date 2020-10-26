import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {EmailOutlined, LockOutlined} from '@material-ui/icons';
import { useRouter } from 'next/router';

import { InputWithIcon } from "../input/index";
import {Checkbox} from 'antd';
import Link from 'next/link';
import { RoundedButton } from '../button';
import '../../styles/form.scss';
import useAuth from '../../provider/index';
import {openNotification} from '../notification';



export function SignInForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const [text, setText] = useState('Login');
    const router = useRouter();

    const onClick = async _ => {
        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);
        const {status, msg} = await login(email, password);
        
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            router.push('/');
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Login');
        }
    }

    return (<div id='authForm'>
        <img id="logo" src='/logo.jpeg' />
        <h1>Login To NAPIM App</h1>
        <p>Please enter login details</p>

        <div>
            <InputWithIcon
                icon={<EmailOutlined />}
                placeholder='Email'
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <InputWithIcon
                icon={<LockOutlined />}
                placeholder='password'
                type="password"
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div id="forgot_remember">
                <Checkbox>Remember me</Checkbox>
                <Link href=""><a>Forgot Password?</a></Link>
            </div>
            <RoundedButton 
                text={text} 
                onClick={onClick}
                disabled={loading}
            />
        </div>
    </div>)
}