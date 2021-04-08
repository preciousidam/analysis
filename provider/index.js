import React, {createContext, useState, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';

import {backend} from '../url';
import {refreshToken} from '../utility/fetcher';
import Loader from '../components/loader';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null)

    const loadUserFromCookies = async () => {
        const refresh_token = Cookies.get('refresh_token');
        const newToken =  await refreshToken(refresh_token);
    
        
        Cookies.set('token', newToken);
        
        if (newToken) {
            setToken(newToken);
            const {user_claims, identity, exp} = await JwtDecode(newToken);
           
            if (user_claims) {
                setUser(identity);
                setRole(user_claims);
            }
            
        }
        setLoading(false);
        
    }

    useEffect(() => {
        if (token != null) return
        loadUserFromCookies();
    }, [token]);

    const login = async (email, password) => {
        
        const res = await fetch(`${backend}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password}),
        });

        const json = await res.json();

        const {token, refreshToken, status, msg} = await json;
        
        if (token && refreshToken) {
            
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('refresh_token', refreshToken);

            setToken(token);

            const {user_claims, exp, identity } = await JwtDecode(token);

            if(user_claims) {
                setUser(identity);
                setRole(user_claims);
            }
        }
        
        return {status, msg};
    }

    const register = async (name, email, password, phone) => {
        
        const res = await fetch(`${backend}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email,password, phone, username: name.split(' ')[0]}),
        });

        const json = await res.json();

        const {status, msg} = await json;
        
        return {status, msg};
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('refresh_token')
        setUser(null);
        setToken(null);
        return true;
    }


    return (
        <AuthContext.Provider value={{ 
                isAuthenticated: !!user, 
                user, token,
                isAdmin: role?.role === 'admin' && role?.permissions === 'read,write',
                role, login, register,
                loading, logout }}
        >
            {!loading ? children: <Loader />}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};
