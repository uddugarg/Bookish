import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import MenuItems from './MenuItems';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../images/logo.jpg';
import './Header.css';
import { useSelector } from 'react-redux';


function Header(props) {

    const user = useSelector(state => state.user);

    const [searchTerm, setSearchTerm] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        axios.get('/api/user/logout')
            .then(response => {
                if (response.status === 200) {
                    props.history.push('/login');
                } else {
                    alert('Failed to logout!');
                }
            })
    }

    if (user.userData && user.userData.isAdmin) {
        return (
            <div className='header'>
                <MenuItems />
                <Link to='/'>
                    <img className='header__logo' src={logo} alt='amazon' />
                </Link>

                <div className='header__search'>
                    <input className='header__searchInput' variant='filled' label='Search' onChange={(e) => setSearchTerm(e.target.value)} />
                    <SearchIcon className='header__searchBtn' type='submit' fontSize='large' />
                </div>

                <div className='header__navOpt1'>
                    <span className='header__navText'>Hello, Admin</span>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <p className='header__navTextP'>Account & Lists</p>
                    </Button>
                    {user.userData && user.userData.isAuth &&
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            <MenuItem value='Manage Account'>Manage Account</MenuItem>
                            <Link to='/upload'>
                                <MenuItem value='Upload Product'>Upload Product</MenuItem>
                            </Link>
                            <MenuItem value='Edit Product'>Edit Product</MenuItem>
                            <MenuItem value='Orders Details'>Orders Details</MenuItem>
                            <MenuItem value='Delivered Orders'>Delivered Orders</MenuItem>
                            <MenuItem value='Return Requests'>Return Requests</MenuItem>
                            <MenuItem value='Replacement Requests'>Replacement Requests</MenuItem>
                            <MenuItem value='Order Reviews'>Order Reviews</MenuItem>
                            <MenuItem value='Contact Amazon'>Contact Amazon</MenuItem>
                            <MenuItem value='Logout' onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    }

                </div>
                <div className='header__navOpt'>
                    <span className='header__navText2'>Details</span><br />
                    <p className='header__navTextP'>& Order</p>
                </div>
                <div className='header__navOpt'>
                    <Link to='/upload'>
                        <span className='header__navText2'>Upload</span><br />
                        <p className='header__navTextP'>Products</p>
                    </Link>
                </div>
                <div className='header__navOpt'>
                    <span className='header__navText2'>Report</span><br />
                    <p className='header__navTextP'>Contact</p>
                </div>

            </div >
        )
    } else {
        return (
            <div className='header'>
                <MenuItems />
                <Link to='/'>
                    <img className='header__logo' src={logo} alt='amazon' />
                </Link>

                <div className='header__search'>
                    <input className='header__searchInput' variant='filled' label='Search' onChange={(e) => setSearchTerm(e.target.value)} />
                    <SearchIcon className='header__searchBtn' type='submit' fontSize='large' />
                </div>

                <div className='header__navOpt1'>
                    <span className='header__navText'>Hello, Sign in</span>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <p className='header__navTextP'>Account & Lists</p>
                    </Button>
                    {user.userData && user.userData.isAuth &&
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem value='Your Account'>Your Account</MenuItem>
                            <MenuItem value='Your Orders'>Your Orders</MenuItem>
                            <MenuItem value='Your WishList'>Your WishList</MenuItem>
                            <MenuItem value='Your Recommendations'>Your Recommendations</MenuItem>
                            <MenuItem value='Your Subscribe & Save Items'>Your Subscribe & Save Items</MenuItem>
                            <MenuItem value='Your Amazon Business Account'>Your Bookish Business Account</MenuItem>
                            <MenuItem value='Logout' onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    }
                    {user.userData && !user.userData.isAuth &&
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Link to='/login'>
                                <MenuItem value='Sign In'>Sign In</MenuItem>
                            </Link>
                        </Menu>
                    }

                </div>
                <div className='header__navOpt'>
                    <span className='header__navText2'>Return</span><br />
                    <p className='header__navTextP'>& Order</p>
                </div>
                <div className='header__navOpt'>
                    <span className='header__navText2'>Try</span><br />
                    <p className='header__navTextP'>Prime</p>
                </div>
                <Link to='/cart' className='header__cart'>
                    <ShoppingCartIcon fontSize='large' />
                    <p className='header__navTextP'>0</p>
                </Link>
            </div >
        )
    }

}

export default withRouter(Header)