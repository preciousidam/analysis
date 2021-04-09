import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {EmailOutlined, LockOutlined} from '@material-ui/icons';
import { InputWithIcon } from "../input/index";
import '../../styles/form.scss';
import { RoundedButton } from '../button';
import {openNotification} from '../notification';
import { forgotPassword, resetPassword } from "../../utility/fetcher";
import { useRouter } from "next/router";
import { message } from "antd";
import Link from 'next/link';

export const ResetPasswordForm = ({}) => {
    const [email, setEmail] = useState('');
    const [text, setText] = useState('Submit');
    const [loading, setLoading] = useState(false);

    const onClick = async e => {
        e.preventDefault()
        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);
        const {status, msg} = await forgotPassword({email});
        
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Submit');
        }
    }
    
    return(
        <div id="reset-password">
            <header>
                <h4>Forgot Password?</h4>
                <p>Please enter your email address for your account to reset password.</p>
            </header>
            <form onSubmit={onClick}>
                <InputWithIcon
                    icon={<EmailOutlined />}
                    placeholder='Email'
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <RoundedButton 
                    text={text} 
                    onClick={onClick}
                    disabled={loading}
                />
            </form>
        </div>
    )
}

export const NewPasswordForm = ({}) => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [password_conf, setPasswordConf] = useState('');
    const [text, setText] = useState('Reset');
    const [loading, setLoading] = useState(false);
    const {token} = router.query;

    const onClick = async e => {
        e.preventDefault()

        if(password_conf !== password){
            message.error('Passwords do not match');
            return;
        }
        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);
        const {status, msg} = await resetPassword({password, password_conf}, token);
        
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            router.replace('/login');
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Reset');
        }
    }
    
    return(
        <div id="reset-password">
            <header>
                <h4>Reset Password</h4>
                <p>Please enter a new password to use with your account.</p>
            </header>
            <form onSubmit={onClick}>
                <InputWithIcon
                    icon={<LockOutlined />}
                    placeholder='Enter new password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <InputWithIcon
                    icon={<LockOutlined />}
                    placeholder='Confirm new password'
                    type="password"
                    name="password_conf"
                    value={password_conf}
                    onChange={e => setPasswordConf(e.target.value)}
                />
                <RoundedButton 
                    text={text} 
                    onClick={onClick}
                    disabled={loading}
                />
            </form>
            <footer>
                <Link href="/login"><a>Back to Login?</a></Link>
            </footer>
        </div>
    )
}