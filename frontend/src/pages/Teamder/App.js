import SearchIcon from '@material-ui/icons/Search';
import { Row } from "antd";
import axios from "axios";
import _ from 'lodash';
import 'materialize-css';
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactTags from 'react-tag-autocomplete';
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";
import "./App.css";
import TeamderCards from "./TeamderCards";
const MAX_TAGS = 12;

function App() {
	const userList = useSelector((state) => state.users.listOfUsers);
	const [cardUsers, setCards] = useState([]);
	useEffect(() => {
		setCards(userList);
		// console.log(userList);
	}, [userList]);
	const [Interests, updateInterests] = useState([]);
	const [isInterestsFormDisabled, toggleInterestsFormDisabled] = useState(false);
	let interestsRef = useRef(null);

	const onDelete = (id) => {
		let copyOfInterests = Interests.slice();
		_.remove(copyOfInterests, (interest) => {
			return interest.id === id;
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
	if (Interests.length === MAX_TAGS) {
		toggleInterestsForm(true);
	}
	else if (Interests.length === MAX_TAGS -1) {
		toggleInterestsForm(false);
	}
	}, [Interests])

	const submitSearch = async () => {
		const filteredUsers = await axios.post(`${BASE_URL}/api/teamder/interests`, {
				Interests: Interests,
			},
			getConfig()
		)
		// console.log(filteredUsers);
		setCards(filteredUsers.data.data);
	}

	return (
		<Row >
			<div className="filters">
				<ReactTags
					inline
					ref={interestsRef}
					tags={Interests}
					onDelete={(id) => onDelete(id)}
					onAddition={(tagName) => onAddition(tagName)}
					allowNew
					placeholderText={isInterestsFormDisabled? null:'Filter by interest(s)'}
					style = {{
						color: '#183d70'
					}}/>
				<SearchIcon style={{display: "inline-block", position:"relative", top:"3.3%", cursor:"pointer"}} onClick={()=> submitSearch()}/>
			</div>

			
		<div style={{margin: "2.5% 33%"}}>
			{cardUsers.length > 0 && 
				<TeamderCards userList={cardUsers}/>
			}
		</div>
		</Row>
	);
}

export default App;
