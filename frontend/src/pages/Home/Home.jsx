import { Spin, Dropdown, Menu, Button } from 'antd';
import React, { useEffect, useState } from "react";
import handleViewport from 'react-in-viewport';
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../../components/Modal/Modal.jsx";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './Home.css';
//import { getFilteredPostIDs } from '../../redux/actions/filters.js';

const HomePage = () => {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    
    const [isModalOpen, toggleModalOpen] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);



    const [categoryFilters, setCategoryFilters] = useState([]);
    const [tagFilters, setTagFilters] = useState([]);

    const [initialViewportBlock, setInitialViewportBlock] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
 

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user.isLoading == false) {
            setLoaded(true);
        }
        else if (!user.data) {
            setLoaded(false);
        }
        else if (user.data) {
            setLoaded(true);
        }
    }, [user]);

        
    const toggleModal = () => {
        toggleModalOpen(!isModalOpen);
    }
    const closeModal = () => {
        toggleModalOpen(false);
    }





    return (
        <div>
            {hasLoaded && <div className="home-page-container">
                <Row>
                </Row>
                <AuthModal toggleModal={closeModal} isModalOpen={isModalOpen} />
            </div>}
            {isFetching &&
                <>
                    <Spin size="large" className="my-spinner" />
                        <p style={{ textAlign: "center" }}>
                            Loading, please wait.
                        </p>
                </>
            }
        </div>
    );
}

export default HomePage;