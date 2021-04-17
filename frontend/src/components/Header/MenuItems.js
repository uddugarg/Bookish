import React from 'react';
import axios from 'axios';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Header.css';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});



function MenuItems(props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* {["Men's Fashion", "Women's Fashion", 'Home, Kitchen', 'Electronics'].map((text, index) => ( */}
                <List>
                    <ListItem button>
                        <ListItemText>Category</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>Genre</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>Comics</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>Previews</ListItemText>
                    </ListItem>
                </List>
            </List>
            <Divider />
            <List>
                {['Prime', 'Kindle e-Books'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemText>Accounts</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Orders</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Wishlist</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <MenuIcon className='header__menu' onClick={toggleDrawer(anchor, true)} />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

export default MenuItems
