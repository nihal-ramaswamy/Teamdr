import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from '../../containers/Button';
import {
    DesktopContainer
} from "../../containers/Responsive.jsx";
import LoginModal from './Login';
import "./Modal.css";
import RegisterModal from './Register';

const MainModal = (props) => {
    return (
        <>
            <DesktopContainer>

                <div className="auth-modal-main-header">SIGN UP TO CONTINUE</div>
                <div className="auth-modal-main-sub">
                    THREE STEPS, BARELY TAKES A MINUTE!
                </div>
                <Row className="auth-modal-main-cols">
                    <Col span={12} offset={10}>
                        <img src="assets/member-signup.png" className="auth-modal-main-image" alt="AUTH" />
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
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
            </DesktopContainer>
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
