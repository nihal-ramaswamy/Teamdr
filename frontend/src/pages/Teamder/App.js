import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import "./App.css";
import TeamderCards from "./TeamderCards";
import SwipeButtons from "./SwipeButtons";
import ReactTags from 'react-tag-autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";

const MAX_TAGS = 12;

function App() {
	const userList = useSelector((state) => state.users.listOfUsers);
	const [cardUsers, setCards] = useState([]);
	useEffect(() => {
		setCards(userList);
		console.log(userList);
	}, [userList]);
	const [Interests, updateInterests] = useState([]);
	const [isInterestsFormDisabled, toggleInterestsFormDisabled] = useState(false);
	let interestsRef = useRef(null);

	const onDelete = (id) => {
		let copyOfInterests = Interests.slice();
		_.remove(copyOfInterests, (interest) => {
			return interest.id == id;
		});
		copyOfInterests.forEach((interest, id) => interest.id = id);
		updateInterests([...copyOfInterests]);
	}

	const onAddition = (tagName) => {
		const interest = {
			id: Interests.length,
			name: tagName.name,
		}
		updateInterests([...Interests, interest]);
	}

	const toggleInterestsForm = (shouldInterestsFormBeDisabled) => {
	interestsRef.current.input.current.input.current.disabled = shouldInterestsFormBeDisabled;
	toggleInterestsFormDisabled(shouldInterestsFormBeDisabled);
	}

	useEffect(() => {
	if (Interests.length == MAX_TAGS) {
		toggleInterestsForm(true);
	}
	else if (Interests.length == MAX_TAGS -1) {
		toggleInterestsForm(false);
	}
	}, [Interests])

	const submitSearch = async () => {
		const filteredUsers = await axios.post(`${BASE_URL}/api/teamder/interests`, {
				Interests: Interests,
			},
			getConfig()
		)
		console.log(filteredUsers);
		setCards(filteredUsers.data.data);
	}

	return (
		<>
		<div>
		<ReactTags
			ref={interestsRef}
			tags={Interests}
			onDelete={(id) => onDelete(id)}
			onAddition={(tagName) => onAddition(tagName)}
			allowNew
			autoresize
			placeholderText={isInterestsFormDisabled? null:'Add an interest'} />
		</div>
		<SearchIcon onClick={()=> submitSearch()}/>
		{cardUsers.length && <div className="app">
			<TeamderCards userList={cardUsers}/>
			<SwipeButtons />
		</div>}
		</>
	);
}

export default App;
