import React, { useState } from "react";

import { Modal, Row, Col } from "antd";
import { PrimaryButton, SecondaryButton } from '../../containers/Button';

import {
    MobileContainer,
    DesktopContainer,
} from "../../containers/Responsive.jsx";


import "../../components/Modal/Modal.css";

const MainModal = (props) => {
    return (
        <>
            <DesktopContainer>

                <div className="auth-modal-main-header">Information</div>
                <div className="auth-modal-main-sub">
                </div>
                <Row className="auth-modal-main-cols">
                    Name: {props.user.name} 
                </Row>
                <Row className="auth-modal-main-cols">
                    Github: {props.user.github}
                </Row>
                <Row className="auth-modal-main-cols">
                    LinkedIn: {props.user.linkedin}
                </Row>
                <Row className="auth-modal-main-cols">
                    Rating: {props.user.rating}
                </Row>
                <Row className="auth-modal-main-cols">
                    Bio: {props.user.linkedin}
                </Row>
                <Row className="auth-modal-main-cols">
                    Interests: {props.user.linkedin}
                </Row>
                <Row className="auth-modal-main-cols">
                    Resume: {props.user.linkedin}
                </Row>
                <div style={{ height: "40px" }} />
            </DesktopContainer>
            <MobileContainer>
                <div className="auth-modal-main-header">SIGN UP TO CONTINUE</div>
                <div className="auth-modal-main-sub">
                    THREE STEPS, BARELY TAKES A MINUTE!
                </div>
                <Row className="auth-modal-main-cols">
                    <Col span={6} offset={1}>
                        <img src="/assets/member-signup.png" className="auth-modal-main-image" style={{ width: "30vw" }} alt="AUTH" />
                    </Col>
                    <Col span={6} offset={6}>
                        <img src="/assets/signup-client.webp" className="auth-modal-main-image" style={{ width: "35vw", transform: "translateY(-2vw)" }} alt="AUTH" />
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={1}>
                        <SecondaryButton onClick={() => props.switchModal(2)}>
                            SIGN UP
                    </SecondaryButton>
                    </Col>
                </Row>

                <div style={{ height: "40px" }} />

                <Row justify="center" align="bottom">
                    <Col className="auth-modal-main-sub">
                        ALREADY A USER? &nbsp;
                </Col>
                    <Col offset={0}>
                        <PrimaryButton onClick={() => props.switchModal(1)}>
                            LOG IN
                    </PrimaryButton>
                    </Col>
                </Row>
            </MobileContainer>
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
