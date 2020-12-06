import {
    HomeTwoTone,
    LoginOutlined,
    LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProfileTwoTone, SearchOutlined,
    SettingTwoTone
} from "@ant-design/icons";
import { Button, Drawer, Input, Layout, List } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import { Link, Redirect } from "react-router-dom";
import {
    DesktopContainer, MobileContainer
} from "../../containers/Responsive.jsx";
import { logoutUser } from "../../redux/actions/user";
import { DEFAULT_PROFILE_PIC_URL } from "../../shared/config";
import AuthModal from "../Modal/Modal.jsx";
import "./Navbar.css";
import 'materialize-css';
import Dropdown from './Dropdown';

const { Header } = Layout;

const DesktopNav = (props) => {

    const [profileImageURL, setProfileImageURL] = useState(DEFAULT_PROFILE_PIC_URL);
    const [firstName, setFirstName] = useState('');
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    /* For fancy navbar */
    const [sticky, setSticky] = useState(true);

    const getScrollPosition = () => {
        const position = document.body.getBoundingClientRect();
        return {
          x: position.left, 
          y: position.top
        }
    }
    let position = getScrollPosition();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = getScrollPosition();
            setSticky(currentScrollPosition.y > position.y);
            position = currentScrollPosition;
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [sticky]);


    /* Profile Image and Name */
    useEffect(() => {
        if (user.data) {
          const image = user.data.profileImage;
          if (image) setProfileImageURL(image.location);
          setFirstName(user.data.name.split(' ')[0]);
        } else {
        }
      }, [user]);


    return (
        <DesktopContainer className='desktop-container' style={
            {transform: sticky ? "translateY(0%)" : "translateY(-100%)",
            transition: 'transform 0.3s ease-in'}
            }>
            <nav className="navbar navbar-desktop-mdb">
                <Link className="navbar-desktop-left" to="/">
                    <img src='assets/logo.png'></img>
                </Link>
                {/* <h1 
                    style={{borderRadius:'10vmin 10vmin', fontWeight: 'bolder', color: '#183d70'
                }} 
                    className='navbar-desktop-search-bar'
                    size='sm'>   Look around for your teammate </h1> */}
                <Input 
                    style={{borderRadius:'10vmin 10vmin'}} 
                    className='navbar-desktop-search-bar'
                    type='search' 
                    placeholder='Look around for your true teammate'
                    size='sm'/>  
                {user.isAuthenticated ? (
                    <div className="navbar-desktop-right">
                        <div className='navbar-desktop-profile-picture-container'>
                        <Dropdown profileImageURL = {profileImageURL} />

                        </div>
                        <Link to='/'>
                            <LogoutOutlined
                                twoToneColor = '#183d70'
                                className="navbar-desktop-link"
                                onClick={()=>{
                                    dispatch(logoutUser());
                                    if (window.location.pathname === '/' || window.location.pathname === '/teams') {
                                        window.location.reload();
                                    }
                                    return <Redirect to='/'/>;
    
                                }
                            }/>
                        </Link>
                    </div>
                ) : (
                        <div className="navbar-desktop-right">
                            <LoginOutlined
                                twoToneColor = '#183d70'
                                className="navbar-desktop-link"
                                onClick={props.toggleModal}
                            />
                        </div>
                    )}
            </nav>
        </DesktopContainer>
    );
};

const MobileNav = (props) => {
    const [isOpen, toggle] = useState(false);
    const user = useSelector((state) => state.user);

    const toggleNav = () => {
        toggle(!isOpen);
    };

    /* For fancy navbar */
    const [sticky, setSticky] = useState(true);

    const getScrollPosition = () => {
        const position = document.body.getBoundingClientRect();
        return {
          x: position.left, 
          y: position.top
        }
    }
    let position = getScrollPosition();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = getScrollPosition();
            setSticky(currentScrollPosition.y > position.y);
            position = currentScrollPosition;
        }
        window.addEventListener('scroll', handleScroll);
      }, [sticky]);

    return (
        <MobileContainer style={
            {transform: sticky ? "translateY(0%)" : "translateY(-100%)",
            transition: 'transform 0.3s ease-in'}
            }> 
            <Header className="navbar-mobile-header">
                <div className="navbar-mobile-menu">
                    <Button
                        className="navbar-mobile-button"
                        onClick={toggleNav}
                    >
                        {React.createElement(
                            isOpen ? MenuFoldOutlined : MenuUnfoldOutlined  
                        , {color: '#183d70'})}
                    </Button>

                    <Drawer
                        className="navbar-mobile-drawer"
                        placement="left"
                        closable={true}
                        onClose={toggleNav}
                        visible={isOpen}
                        key="left"
                        width='50%'
                        drawerStyle={{
                            backgroundColor: 'white',
                        }}
                    >
                        <div className="navbar-mobile-drawer-header">
                            <Link className="navbar-mobile-title-drawer" to="/">
                                <div className="navbar-mobile-title-text">
                                    teamder
                                </div>
                            </Link>
                        </div>

                        {user.isAuthenticated ? (
                            <List>
                                <List.Item>
                                    <Link
                                        to="/teams"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <HomeTwoTone className="navbar-mobile-drawer-link-icon" />{" "}
                                        <span className='navbar-mobile-drawer-link-text'>Home</span>
                                    </Link>
                                </List.Item>
                                <List.Item>
                                    <Link
                                        to="/profile"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <ProfileTwoTone className="navbar-mobile-drawer-link-icon" />{" "}
                                        <span className='navbar-mobile-drawer-link-text'>Profile</span>
                                    </Link>
                                </List.Item>
                                
                                <List.Item>
                                    <Link
                                        to="/settings"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <SettingTwoTone className="navbar-mobile-drawer-link-icon" twoToneColor = '#183d70' />{" "}
                                        <span className='navbar-mobile-drawer-link-text'>Settings</span>
                                    </Link>
                                </List.Item>
                            </List>
                        ) : (
                                <List>
                                    <List.Item>
                                        <LoginOutlined
                                            className="navbar-mobile-drawer-link-icon"
                                            onClick={() => { toggleNav(); props.toggleModal(); }}
                                            twoToneColor = '#183d70'
                                        />
                                    <span className='navbar-mobile-drawer-link-text'>Join Us</span>
                                </List.Item>
                                </List>
                            )}
                    </Drawer>
                    <Link className="navbar-mobile-title" to="/">
                        <div className="navbar-mobile-title-text">teamder</div>
                    </Link>
                </div>
            </Header>
        </MobileContainer>
    );
};

const Navbar = () => {
    const [isModalOpen, toggleModalOpen] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 850px)'
      })
    const toggleModal = () => {
        toggleModalOpen(!isModalOpen);
    }

    const closeModal = () => {
        toggleModalOpen(false);
    }

    return (
        <>
            {isDesktopOrLaptop && <DesktopNav toggleModal={toggleModal} />}
            <MobileNav toggleModal={toggleModal} />
            <AuthModal toggleModal={closeModal} isModalOpen={isModalOpen} />
        </>
    );
};

export default Navbar;