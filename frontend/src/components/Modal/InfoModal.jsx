import { Modal } from "antd";
import React, { useState } from "react";
import "../../components/Modal/Modal.css";
import {
    DesktopContainer
} from "../../containers/Responsive.jsx";
import Card from '../../pages/Teamder/Card';

const MainModal = (props) => {
    return (
        <>
            <DesktopContainer>
                <Card 
                    name = {props.user.name} 
                    github = {props.user.github} 
                    linkedin = {props.user.linkedin} 
                    bio = {props.user.bio}
                    rating = {props.user.rating}
                    interests = {props.user.interests}
                     />
                <div style={{ height: "40px" }} />
            </DesktopContainer>
           
        </>
    );
};

const InfoModal = (props) => {
    const [modalMode, switchModal] = useState(0);

    return (
        <Modal
            wrapClassName="auth-modal"
            visible={props.isModalOpen}
            onCancel={props.toggleModal}
            closable={false}
            footer={<div />}
            width={window.innerWidth >= 850 ? "50vw" : "100vw"}
            centered={true}
        >
        <MainModal switchModal={(mode) => switchModal(mode)} toggleModal={props.toggleModal} user={props.user}/>

        </Modal>
    );
};

export default InfoModal;
