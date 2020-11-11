import React, { useState } from "react";

import { Modal, Row, Col } from "antd";
import { PrimaryButton, SecondaryButton } from '../../containers/Button';

import {
    MobileContainer,
    DesktopContainer,
} from "../../containers/Responsive.jsx";

import LoginModal from './Login';
import RegisterModal from './Register';

import "./Modal.css";

const MainModal = (props) => {
    return (
        <>
            <DesktopContainer>

                <div className="auth-modal-main-header">SIGN UP TO CONTINUE</div>
                <div className="auth-modal-main-sub">
                    THREE STEPS, BARELY TAKES A MINUTE!
                </div>
                <Row className="auth-modal-main-cols">
                    <Col span={6} offset={4}>
                        <img src="assets/member-signup.png" className="auth-modal-main-image" alt="AUTH" />
                    </Col>
                    <Col span={6} offset={5}>
                        <img src="assets/signup-client.webp" className="auth-modal-main-image" alt="AUTH" />
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={3}>
                        <SecondaryButton onClick={() => props.switchModal(2)}>
                            SIGN UP AS A MEMBER
                    </SecondaryButton>
                    </Col>
                    <Col span={8} offset={3}>
                        <SecondaryButton onClick={() => props.switchModal(3)}>
                            SIGN UP AS A CLIENT
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
                    <Col span={10} offset={1}>
                        <SecondaryButton onClick={() => props.switchModal(2)}>
                            SIGN UP AS A MEMBER
                    </SecondaryButton>
                    </Col>
                    <Col span={10} offset={3}>
                        <SecondaryButton onClick={() => props.switchModal(3)}>
                            SIGN UP AS A CLIENT
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

const AuthModal = (props) => {
    const [modalMode, switchModal] = useState(0);

    return (
        <Modal
            wrapClassName="auth-modal"
            visible={props.isModalOpen}
            onCancel={props.toggleModal}
            //closable={false}
            footer={<div />}
            width={window.innerWidth >= 850 ? "50vw" : "100vw"}
            centered={true}
        >
            {modalMode === 0 ? (
                <MainModal switchModal={(mode) => switchModal(mode)} toggleModal={props.toggleModal} />
            ) : (
                    modalMode === 1 ?
                        <LoginModal switchModal={(mode) => switchModal(mode)} toggleModal={props.toggleModal} />
                        :
                        <RegisterModal switchModal={(mode) => switchModal(mode)} toggleModal={props.toggleModal} modalMode={modalMode} />
                )}
        </Modal>
    );
};

export default AuthModal;
