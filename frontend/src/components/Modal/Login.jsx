import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, TertiaryButton } from '../../containers/Button';
import {
    DesktopContainer
} from "../../containers/Responsive.jsx";
import * as userActions from '../../redux/actions/user';
import "./Modal.css";

const LoginModal = (props) => {

    const user = useSelector(state => state.user);
    const usernameField = useRef(null);
    const [username, updateUsername] = useState("");

    useEffect(() => {
        if (user.isAuthenticated) {
            props.toggleModal();
        }
        else if (username !== "") {
            updateErr(user.err);
        }
    }, [user, props]);

    const passwordField = useRef(null);
    const [password, updatePassword] = useState("");
    const [err, updateErr] = useState("");

    const dispatch = useDispatch();

    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            if (e.target === usernameField.current) passwordField.current.focus();
            else if (e.target === passwordField.current) handleSubmit();
        }
        else if (e.key === 'Tab' && e.target === usernameField.current) passwordField.current.focus();
    }
    const handleSubmit = async () => {
        if (password.length < 4) {
            updateErr("The password should be atleast 4 characters long");
        }
        else if (username.length < 4) {
            updateErr("The username should be atleast 4 characters long");
        }
        else {
            dispatch(userActions.loginUser({ username, password }));
        }
    }

    return (
        <>
            <DesktopContainer className="auth-modal-auth">
                <Row justify="left" >
                    <Col>
                        <p className="auth-modal-auth-title">
                            LOGIN
                        </p>
                        <p className="auth-modal-main-sub">
                            ENTER YOUR USERNAME AND PASSWORD
                        </p>
                    </Col>
                </Row>

                <div style={{ height: "50px" }} />

                <Row>
                    <Col span={10}>
                        <img src="assets/member-signup.png" className="auth-modal-auth-image" alt="AUTH" />
                    </Col>

                    <Col span={12}>
                        <form className="auth-form">
                            <input ref={usernameField} type="text" value={username} onKeyPress={enterHandler} onChange={(e) => updateUsername(e.target.value)} placeholder="ENTER USERNAME" />
                            <input ref={passwordField} type="password" value={password} onKeyPress={enterHandler} onChange={(e) => updatePassword(e.target.value)} placeholder="PASSWORD" />
                        </form>

                        <div className="auth-modal-auth-err" >{err}</div>

                        <div className="auth-modal-auth-buttons">

                            <TertiaryButton className="auth-modal-auth-button-left" onClick={handleSubmit}>
                                LOG IN
                            </TertiaryButton>
                            <PrimaryButton className="auth-modal-auth-button-right" onClick={() => props.switchModal(0)}>
                                BACK
                            </PrimaryButton>

                        </div>
                    </Col>
                </Row>

            </DesktopContainer>
        </>
    );
}

export default LoginModal;