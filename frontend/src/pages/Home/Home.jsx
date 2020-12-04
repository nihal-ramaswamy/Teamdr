import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import "./Home.css";
import InfoModal from './InfoModal';
import InfoIcon from '@material-ui/icons/Info';


function App() {
    let [value, setValue] = useState("");
	const userList = useSelector((state) => state.users.listOfUsers);
	const [cardUsers, setCards] = useState([]);
	useEffect(() => {
		setCards(userList);
		console.log(userList);
	}, [userList]);

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [userInFocus, setUserInFocus] = useState(null);

    const debugFunc = () => {
        console.log(cardUsers);
    }

    const showUserInfo = () => {
        var userListArray = [];
        for (let i = 0; i < cardUsers.length; ++i) {
            if (cardUsers[i].name.indexOf(value) == 0)
            {userListArray.push(
                <div>
                    <h3>
                        Name: {cardUsers[i].name}
                    </h3>
                    <InfoIcon 
                        onClick={()=>{
                        setUserInFocus(cardUsers[i]);
                        setShowInfoModal(true)}}
                    />
                </div>
            )}
        }
        return userListArray;
    }

    const handleValue = (event) => {
        setValue(event.target.value);
    }

	return (
		<>
        <InfoModal isModalOpen={showInfoModal} toggleModal={()=>setShowInfoModal(!showInfoModal)} user={userInFocus} />
        <input type = "text" className = "input" placeholder = "Search User" onChange = {(e) => handleValue(e)}/>
        <h1>Other users</h1>
		{cardUsers.length && <div className="app">
            {showUserInfo()}
        </div>}
		</>
	);
}

export default App;
