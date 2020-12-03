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
                <Input 
                    style={{borderRadius:'10vmin 10vmin'}} 
                    className='navbar-desktop-search-bar'
                    type='search' 
                    placeholder='Look around for your true teammate'
                    size='sm'/>   
                {user.isAuthenticated ? (
                    <div className="navbar-desktop-right">
                        <Link to="/find">
                            <SearchOutlined className="navbar-desktop-link" />
                        </Link>
                        <Link to="/feed">
                            <HomeTwoTone className="navbar-desktop-link" />
                        </Link>
                        <Link to="/profile">
                            <ProfileTwoTone className="navbar-desktop-link" />
                        </Link>
                        {/* <Link to="/work">
                            <DollarCircleTwoTone className="navbar-desktop-link" />
                        </Link>
                        <Link to="/chats">
                            <WechatOutlined  className="navbar-desktop-link" />
                        </Link> */}
                        <Link to="/settings">
                            <SettingTwoTone className="navbar-desktop-link" />
                        </Link>
                        <Link to='/'>
                            <LogoutOutlined
                                className="navbar-desktop-link"
                                onClick={()=>{
                                    dispatch(logoutUser());
                                    if (window.location.pathname == '/' || window.location.pathname == '/feed') {
                                        window.location.reload();
                                    } // This is a somewhat dirty method of doing this
                                    return <Redirect to='/'/>;
    
                                }
                            }/>
                        </Link>
                        <div className='navbar-desktop-profile-picture-container'>
                            <Link to='/profile'>
                                <img width='22' height='20' className='navbar-desktop-profile-picture' src={profileImageURL}/>
                                <span className='navbar-desktop-user-firstname'><a>{firstName}</a></span>
                            </Link>
                        </div>
                    </div>
                ) : (
                        <div className="navbar-desktop-right">
                            <LoginOutlined
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
        //return () => window.removeEventListener('scroll', handleScroll);
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
                        )}
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
                                        to="/feed"
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
                                {/* <List.Item>
                                    <Link
                                        to="/work"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <DollarCircleTwoTone className="navbar-mobile-drawer-link-icon" />{" "}
                                        Work
                                    </Link>
                                </List.Item>
                                <List.Item>
                                    <Link
                                        to="/chats"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <WechatOutlined className="navbar-mobile-drawer-link-icon" />{" "}
                                        Chats
                                    </Link>
                                </List.Item> */}
                                
                                <List.Item>
                                    <Link
                                        to="/settings"
                                        className="navbar-mobile-drawer-link"
                                        onClick={toggleNav}
                                    >
                                        <SettingTwoTone className="navbar-mobile-drawer-link-icon" />{" "}
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

/*<Link to='/'>
    <LogoutOutlined
        className="navbar-desktop-link"
        onClick={()=>{
            dispatch(logoutUser());
            if (window.location.pathname == '/' || window.location.pathname == '/feed') {
                window.location.reload();
            } // This is a somewhat dirty method of doing this
            return <Redirect to='/'/>;
        }
    }/>
    </Link>
*/ // Logout button