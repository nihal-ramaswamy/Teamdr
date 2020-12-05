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

function Teams() {
    let [value, setValue] = useState("");
    const userList = useSelector((state) => state.users.listOfUsers);
    console.log(userList);
    const currentUser = useSelector((state) => state.user);
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
      try {
        setCurrentId(currentUser.data._id)
      }
      catch {}
      }, [currentUser.data])


	const [cardUsers, setCards] = useState([]);
	useEffect(() => {
		setCards(userList);
		console.log(userList);
	}, [userList]);

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [userInFocus, setUserInFocus] = useState(null);

    const ReactToRequest = async (reaction, reactee) => {
        const response = await axios.post(`${BASE_URL}/api/teamder/react`, {
            id: reactee,
            reaction: reaction,
          },
          getConfig()
        )
    }

    const debugFunc = () => {
        console.log(cardUsers);
    }

	return currentUser.data && (
		<>
        <InfoModal isModalOpen={showInfoModal} toggleModal={()=>setShowInfoModal(!showInfoModal)} user={userInFocus} />
        <h1>Team Requests</h1>
        {currentUser.data.teamRequests.map((requester) => {
            return (<>
                    <h3>{userList.find(user => user._id == requester).name}</h3>
                    <InfoIcon 
                        onClick={()=>{
                        setUserInFocus(userList.find(user => user._id == requester));
                        setShowInfoModal(true)}}
                    />
                    <CheckBoxIcon onClick={()=>ReactToRequest('yes', requester)}/>
                    <CancelIcon onClick={()=>ReactToRequest('no', requester)}/>
            </>
            )
        })}
        <h1>Previous and current Teammates</h1>
        {currentUser.data.matched.map((matchedUser) => {
            return (
                <>
                    <h3>{userList.find(user => user._id == matchedUser).name}</h3>
                    <InfoIcon 
                    onClick={()=>{
                    setUserInFocus(userList.find(user => user._id == matchedUser));
                    setShowInfoModal(true)}}
                    />
                </>
            )
        })}
		</>
	);
}

export default Teams;
