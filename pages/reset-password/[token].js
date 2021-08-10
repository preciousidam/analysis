import React, {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {SignInForm} from '../../components/form/auth';
import '../../styles/auth.scss';

import Loader from '../../components/loader';
import { ResetPasswordForm, NewPasswordForm } from '../../components/form/reset';

export default function Auth() {
  const router = useRouter();
  
  return (
    <div id='authContainer'>
      <Head>
        <title>Analysis | Reset Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="formContainer">
            <NewPasswordForm />
      </div>
      <div><p style={{color: 'white'}}>&copy; copyright 2021 Cortts Limited</p></div>
    </div>
  )
}
