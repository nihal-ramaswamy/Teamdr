import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import "./Teams.css";
import InfoModal from './InfoModal';
import InfoIcon from '@material-ui/icons/Info';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";
import axios from "axios";
import { Row, Col } from "antd";

function Teams() {
    let [value, setValue] = useState("");
    const userList = useSelector((state) => state.users.listOfUsers);
    // console.log(userList);
    const currentUser = useSelector((state) => state.user);
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
      try {
        setCurrentId(currentUser.data._id)
        setCurSection('teammates');
      }
      catch {}
      }, [currentUser.data])


	const [cardUsers, setCards] = useState([]);
	useEffect(() => {
		setCards(userList);
		// console.log(userList);
	}, [userList]);

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [userInFocus, setUserInFocus] = useState(null);

    const teammatesRef = useRef(null);
    const requestsRef = useRef(null);

    const [curSection, changeCurSection] = useState("teammates");

    const setCurSection = (sectionName) => {
		if (curSection === "teammates") {
			teammatesRef.current.className = "user-profile-nav-btn";
        }
        else if (curSection === "requests") {
			requestsRef.current.className = "user-profile-nav-btn";
        }

		changeCurSection(sectionName);

		if (sectionName === "teammates") {
			teammatesRef.current.className = "user-profile-nav-btn user-profile-nav-active";
        }
        else if (sectionName === "requests") {
			requestsRef.current.className = "user-profile-nav-btn user-profile-nav-active";
        }
	};

    const ReactToRequest = async (reaction, reactee) => {
        const response = await axios.post(`${BASE_URL}/api/teamder/reaction`, {
            id: reactee,
            reaction: reaction,
          },
          getConfig()
        )
        window.location.reload();
    }

    const debugFunc = () => {
        console.log(cardUsers);
    }

	return currentUser.data && (
		<div className="user-profile-container">
            <div className="user-profile-nav-container">
                <button
                    ref={teammatesRef}
                    onClick={() => setCurSection("teammates")}
                    className="user-profile-nav-btn"
                    style={{cursor:'pointer'}}
                >
                    <div className="show-for-web"> Previous and current Teammates </div>
                </button>
                <button
                    ref={requestsRef}
                    onClick={() => setCurSection("requests")}
                    className="user-profile-nav-btn"
                    style={{cursor:'pointer'}}
                >
                    <div className="show-for-web"> Team Requests </div>
                </button>
            </div>
        <InfoModal isModalOpen={showInfoModal} toggleModal={()=>setShowInfoModal(!showInfoModal)} user={userInFocus} />
        {curSection === "requests" && currentUser.data.teamRequests.map((requester, index) => {
            const shownUser = userList.find(user => user._id === requester);
            return (
                <React.Fragment key = {"requests " + index}>
                    <Row>
                        <Col span={1}>
                            <InfoIcon 
                                onClick={()=>{
                                setUserInFocus(userList.find(user => user._id === requester));
                                setShowInfoModal(true)}}
                                style={{cursor:'pointer'}}
                            />
                        </Col>
                        <Col span={3}>
                            <a href={`/profile/${shownUser.username}`}>{shownUser.name}</a>
                        </Col>
                        <Col span={1}>
                            <CheckBoxIcon style={{cursor:'pointer'}} onClick={()=>ReactToRequest('yes', requester)}/>
                        </Col>
                        <Col span={1}>
                            <CancelIcon style={{cursor:'pointer'}} onClick={()=>ReactToRequest('no', requester)}/>
                        </Col>
                    </Row>
                    </React.Fragment>
            )
        })}
        {curSection === "teammates" && currentUser.data.matched.map((matchedUser, index) => {
            const shownUser = userList.find(user => user._id === matchedUser)
            return (
                <div key = {"teammates " + index}>
                <Row>
                    <Col span={1}>
                        <InfoIcon 
                        onClick={()=>{
                        setUserInFocus(userList.find(user => user._id === matchedUser));
                        setShowInfoModal(true)}}
                        style={{cursor:'pointer'}}
                        />
                    </Col>
                    <Col>
                        <a href={`/profile/${shownUser.username}`} className = "people">{shownUser.name}</a>
                    </Col>
                    <hr />
                </Row>
                </div>
            )
        })}
		</div>
	);
}

export default Teams;
