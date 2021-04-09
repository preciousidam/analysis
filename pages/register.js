import React, {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {SignUpForm} from '../components/form/auth';
import '../styles/auth.scss';


export default function Register() {
  const router = useRouter();

  
  return (
    <div id='authContainer'>
      <Head>
        <title>Analysis | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="formContainer">
        <div id="aside_register"></div>
        <SignUpForm />
      </div>
      <div><p style={{color: 'white'}}>&copy; copyright 2020 Cortts Limited</p></div>
    </div>
  )
}
