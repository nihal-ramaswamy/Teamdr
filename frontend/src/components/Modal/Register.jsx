import { Col, Row, Steps } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, TertiaryButton } from '../../containers/Button';

import {
    DesktopContainer, MobileContainer
} from "../../containers/Responsive.jsx";

import * as userActions from '../../redux/actions/user';
import "./Modal.css";

const { Step } = Steps;

const RegisterModal = (props) => {

    const [name, updateName] = useState("");
    const nameField = useRef(null);
    const [email, updateEmail] = useState("");
    const emailField = useRef(null);

    const [username, updateUsername] = useState("");
    const usernameField = useRef(null);
    const [password, updatePassword] = useState("");
    const passwordField = useRef(null);
    const [confirmpassword, updateConfirmpassword] = useState("");
    const confirmField = useRef(null);

    const [err, updateErr] = useState("");
    const [step, updateStep] = useState(0);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const enterHandler = (e) => {
        if (e.target == nameField.current && (e.key == 'Enter' || e.key == 'Tab')) emailField.current.focus();
        else if (e.target == usernameField.current && (e.key == 'Enter' || e.key == 'Tab')) passwordField.current.focus();
        else if (e.target == passwordField.current && (e.key == 'Enter' || e.key == 'Tab')) confirmField.current.focus();
        else if (e.key == 'Enter') {
            step === 2 ? handleSubmit() : updateStep(step + 1);
        }
    }

    const handleSubmit = async () => {

        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name.length < 6) {
            updateErr("Name should be atleast 6 characters long");
            updateStep(0);
        }
        else if (username.length < 4) {
            updateErr("username should be atleast 4 characters long");
            updateStep(1);
        }
        else if (password !== confirmpassword){
            updateErr("Passwords do not match");
            updateStep(1);
        }
        else if (password.length < 8) {
            updateErr("Password must be atleast 8 characters long");
            updateStep(1);
        }
        else if (!re.test(String(email).toLowerCase())) {
            updateErr("Enter a Valid Email ID");
            updateStep(0);
        }
        // else if (!selectedPrefs.length) {
        //     updateErr("Select atleast one preference");
        //     updateStep(2);
        // }
        else {

            dispatch(userActions.registerUser({username: username, password: password, name: name, isClient: props.modalMode === 3, email: email}));
            props.toggleModal();

            if (!user.isAuthenticated) {
                updateErr("There was an error while registering the account. Please try again");
            }

            else {
                window.location.reload(); // Find alternative
            }
        }
    }


    return (
        <>
            <DesktopContainer className="auth-modal-auth">
                <Row justify="left" >
                    <Col>
                        <p className="auth-modal-auth-title">
                            SIGN UP
                        </p>
                        <p className="auth-modal-auth-sub">
                            {
                                step === 0 ? "ENTER YOUR NAME AND EMAIL" : "ENTER USERNAME AND PASSWORD"
                            }
                        </p>
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                <Row justify="space-around">

                    {step !== 2 ? <Col span={10}>
                        <img src="assets/signup-client.webp" className="auth-modal-auth-image" alt="AUTH" />
                    </Col> : ''}

                    <Col span={step === 2 ? 20 : 12}>

                        <form className="auth-form">
                            {step === 0 ? <>
                                <input ref={nameField} type="text" value={name} onKeyPress={enterHandler} onChange={(e) => updateName(e.target.value)} placeholder="ENTER YOUR NAME" />
                                <input ref={emailField} type="text" value={email} onKeyPress={enterHandler} onChange={(e) => updateEmail(e.target.value)} placeholder="ENTER YOUR EMAIL" />
                            </> : step === 1 ? <>
                                <input ref={usernameField} type="text" value={username} onKeyPress={enterHandler} onChange={(e) => updateUsername(e.target.value)} placeholder="ENTER USERNAME" />
                                <input ref={passwordField} type="password" value={password} onKeyPress={enterHandler} onChange={(e) => updatePassword(e.target.value)} placeholder="PASSWORD" />
                                <input ref={confirmField} type="password" value={confirmpassword} onKeyPress={enterHandler} onChange={(e) => updateConfirmpassword(e.target.value)} placeholder="CONFIRM PASSWORD" />
                            </> : <div />}

                        </form>
                        <div className="auth-modal-auth-err" >{err}</div>

                        <div className="auth-modal-auth-buttons">

                            <TertiaryButton className="auth-modal-auth-button-left" onClick={step === 0 ? () => props.switchModal(0) : () => updateStep(step - 1)}>
                                BACK
                            </TertiaryButton>
                            <PrimaryButton className="auth-modal-auth-button-right" onClick={step === 2 ? handleSubmit : () => updateStep(step + 1)}>
                                {step === 2 ? 'SIGN UP' : 'NEXT'}
                            </PrimaryButton>

                        </div>

                    </Col>
                </Row>

                <Row justify="space-around">
                    <Steps size="small" current={step} onChange={(step) => updateStep(step)} className="auth-modal-auth-steps" >
                        {[1, 2, 3].map((num) => (
                            <Step key={num} />
                        ))}
                    </Steps>
                </Row>

            </DesktopContainer>
            <MobileContainer>

                <Row justify="left" >
                    <Col>
                        <p className="auth-modal-auth-title">
                            SIGN UP
                        </p>
                        <p className="auth-modal-auth-sub">
                            {
                                step === 0 ? "ENTER YOUR NAME AND EMAIL" :
                                    "ENTER USERNAME AND PASSWORD" 
                            }
                        </p>
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                <Row justify="space-around">
                    {step !== 2 ? <Col>
                        <img src="assets/signup-client.webp" className="auth-modal-auth-image" alt="AUTH" />
                    </Col> : ''}
                </Row>

                <div style={{ height: "10px" }} />

                <Row justify="space-around">

                    <Col offset={2}>

       
                            <form className="auth-form">
                                {step === 0 ? <>
                                    <input type="text" value={name} onChange={(e) => updateName(e.target.value)} placeholder="ENTER YOUR NAME" />
                                    <input type="text" value={email} onChange={(e) => updateEmail(e.target.value)} placeholder="ENTER YOUR EMAIL" />
                                </> : step === 1 ? <>
                                    <input type="text" value={username} onChange={(e) => updateUsername(e.target.value)} placeholder="ENTER USERNAME" />
                                    <input type="password" value={password} onChange={(e) => updatePassword(e.target.value)} placeholder="PASSWORD" />
                                    <input type="password" value={confirmpassword} onChange={(e) => updateConfirmpassword(e.target.value)} placeholder="CONFIRM PASSWORD" />
                                </> : <div />}

                            </form>

                        <div className="auth-modal-auth-err" >{err}</div>

                        <div className="auth-modal-auth-buttons">

                            <TertiaryButton className="auth-modal-auth-button-left" onClick={step === 0 ? () => props.switchModal(0) : () => updateStep(step - 1)}>
                                BACK
                            </TertiaryButton>
                            <PrimaryButton className="auth-modal-auth-button-right" onClick={step === 2 ? handleSubmit : () => updateStep(step + 1)}>
                                NEXT
                            </PrimaryButton>

                        </div>

                    </Col>
                </Row>

            </MobileContainer>
        </>
    );
}

export default RegisterModal;