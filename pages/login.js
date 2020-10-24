import React, {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {SignInForm} from '../components/form/auth';
import '../styles/auth.scss';
import report from '../public/report.svg';
import useAuth from '../provider';
import Loader from '../components/loader';

export default function Auth() {
  const router = useRouter();

  const {isAuthenticated} = useAuth();

  useEffect(
      () => {
          if( isAuthenticated){
              router.push('/');
          }
          //router.prefetch('/');
      },[isAuthenticated]
  );
  //const action = _ => push('index');
  return (
    <div id='authContainer'>
      <Head>
        <title>Analysis | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="formContainer">
        <div id="aside"></div>
        <SignInForm />
      </div>
      <div><p style={{color: 'white'}}>&copy; copyright 2020 Cortts Limited</p></div>
    </div>
  )
}
