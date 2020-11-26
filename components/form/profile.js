import React, {useEffect, useState} from 'react';

import {InputWithLabel} from '../input';
import {RoundedButton} from '../button';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileForm = ({}) => {

    return (
        <div id="profileForm">
            <InputWithLabel 
                label={<span><FontAwesomeIcon />Username</span>}
                id="username"
                type="text"
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />Fullname</span>}
                id="fullname"
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />Email</span>}
                id="email"
                type="email"
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />Password</span>}
                id="Password"
                type="password"
            />

            <RoundedButton
                text="Submit"
                id="submit"
                onClick={_ => console.log('submit')}
            />
        </div>
    )
}