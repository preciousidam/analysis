import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Dropdown, Menu} from 'antd';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import useAuth from '../../provider/index';
import { useRouter } from 'next/router';




export const ProfileDropdown = ({links}) =>{

  const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
    }));
    const classes = useStyles();
    const [dropdown, setDropdown] = useState(false);
    const {user, logout} = useAuth();
    const router = useRouter();

    const onClick = _ => {
      logout();
      router.push('/login')
    }


    const menu = _ => (<Menu>
          {links.map((x,i) => <Menu.Item key={i} className="drop-link" key={i} ><a>{x}</a></Menu.Item>)}
          <Menu.Item onClick={onClick} key={10}>logout</Menu.Item>
      </Menu>)

    return(
        <Dropdown id="profileCont" onClick={() => setDropdown(!dropdown)} overlay={menu}>
            <div id="profile">
                <Avatar id="avater" className={classes.purple}>{user?.username[0]}</Avatar>
                <p>{user?.username}</p>
            </div>
        </Dropdown>
    );
}