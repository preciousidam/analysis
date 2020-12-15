import React, {useEffect, useState} from 'react';

import {InputWithLabel} from '../input';
import {RoundedButton} from '../button';
import '../../styles/form.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileForm = ({}) => {

    return (
        <div id="profileForm">
            <InputWithLabel 
                label={<span><FontAwesomeIcon />Current Password</span>}
                id="password"
                name="password"
                type="password"
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />New Password</span>}
                id="email"
                type="email"
                type="password"
                name="new-password"
            />

            <InputWithLabel 
                label={<span><FontAwesomeIcon />Confirm New Password</span>}
                id="Password"
                type="password"
                name="con-new-password"
            />

            <RoundedButton
                text="Submit"
                id="submit"
                onClick={_ => console.log('submit')}
            />
        </div>
    )
}