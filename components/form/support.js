import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InputWithLabel } from "../input"
import '../../styles/form.scss';

import {RoundedButton} from '../button';
import { setData } from '../../utility/fetcher';
import useAuth from '../../provider';
import {openNotification} from '../notification';


export const SupportForm = ({}) => {
    const [message, setMessage] = useState({})
    const [text, setText] = useState('Submit');
    const [loading, setLoading] = useState(false);
    const {token, user:{email}} = useAuth();

    const onClick = async e => {
        e.preventDefault();
        if (message?.name == '' || message?.email == '' || message?.subject == '' || message?.message== ''){
            message.error("All details must be provided");
            return;
        }

        setLoading(true);
        setText(<FontAwesomeIcon icon='spinner' color="#ffffff" spin />);

        const {status, msg} = await setData('support/contact-us',message, token);
        setLoading(false)
        if (status == 'success'){
            openNotification(status, msg);
            setText(<FontAwesomeIcon icon='check' color="#ffffff" />);
            setMessage({});
        }
        else if(status == 'error'){
            openNotification(status, msg);
            setText('Submit');
        }
    }

    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setMessage(prev => ({...prev, [name]: value}));
    }


    return (
        <div>
            <form id="supportForm" onSubmit={onClick}>
                <div className="row">
                    <div className="col-md-6">
                        <InputWithLabel
                            label={<span><FontAwesomeIcon />Fullname</span>}
                            id="fullname"
                            type="text"
                            name="name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputWithLabel 
                            label={<span><FontAwesomeIcon />Email</span>}
                            id="fullname"
                            type="email"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <InputWithLabel 
                            label={<span><FontAwesomeIcon />Subject</span>}
                            id="subject"
                            type="text"
                            name="subject"
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="message"><span><FontAwesomeIcon />Message</span></label>
                        <textarea name="message" id="message" rows={7} onChange={onChange} />
                    </div>
                </div>

                <RoundedButton 
                    text={text} 
                    disabled={loading}
                    id="submit"
                />
            </form>
        </div>
    )
}
