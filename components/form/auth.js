import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {EmailOutlined, LockOutlined, PersonOutline, PhoneOutlined} from '@material-ui/icons';
import { useRouter } from 'next/router';

import { InputWithIcon } from "../input/index";
import {Checkbox} from 'antd';
import Link from 'next/link';
import { RoundedButton } from '../button';
import '../../styles/form.scss';
import useAuth from '../../provider';
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
        <h3>National Petroleum Investment Management Services</h3>
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
                <Link href="/register"><a>Create Account</a></Link>
                <Link href="/reset-password"><a>Forgot Password?</a></Link>
            </div>
            <RoundedButton 
                text={text} 
                onClick={onClick}
                disabled={loading}
            />
        </div>
    </div>)
}

export function SignUpForm(){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();
    const [text, setText] = useState('Register');
    const router = useRouter();

    const onClick = async _ => {
        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);
        const {status, msg} = await register(name, email, password, phone);
        
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            router.push('/login');
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Register');
        }
    }

    return (<div id='authForm'>
        <img id="logo" src='/logo.jpeg' />
        <h3>National Petroleum Investment Management Services</h3>
        <p>Please note that account created will still have to be confirmed</p>

        <div>
            <InputWithIcon
                icon={<PersonOutline />}
                placeholder='Full Name'
                type="text"
                name="fullname"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <InputWithIcon
                icon={<EmailOutlined />}
                placeholder='Email'
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <InputWithIcon
                icon={<PhoneOutlined />}
                placeholder='Phone'
                type="tel"
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
                <Link href="/login"><a>Login to your account</a></Link>
            </div>
            <RoundedButton 
                text={text} 
                onClick={onClick}
                disabled={loading}
            />
        </div>
    </div>)
}