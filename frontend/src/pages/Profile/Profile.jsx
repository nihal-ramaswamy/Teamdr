import { Dropdown, Menu, Spin, Switch } from "antd";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { AiFillTrophy } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
import { IoMdImage } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiFilePaper2Fill } from 'react-icons/ri';
import handleViewport from 'react-in-viewport';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";



import FooterComponent from "../../components/Footer/Footer";
import AuthModal from "../../components/Modal/Modal.jsx";
import PortfolioPage from "../../components/Portfolio/Portfolio";

import getConfig from "../../helpers/getConfig";
import By from "../../helpers/sort";

import { AUTH, BASE_URL,
	DEFAULT_PROFILE_PIC_URL,
} from "../../shared/config";
import "./Profile.css";


const CoverImageContainer = styled.div`
	position: relative;
	font-size: 1vw;
	background-image: ${(props) => `url(${props.image})`};
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 300px;
	@media screen and (max-width: 800px) {
		height: 130px;
		font-size: 2vw;
	}
`;

const ProfileImageContainer = styled.div`
	background-image: ${(props) => `url(${props.image})`};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	width: 180px;
	height: 180px;
	border-radius: 50%;
	margin: 0px auto;
	position: relative;
	top: -90px;
	border: 3px solid #fafafa;
	@media screen and (max-width: 800px) {
		height: 100px;
		width: 100px;
		top: -50px;
		border: 2px solid #fafafa;
	}
`;





const UserProfileComponent = ({ match }) => {
	const dispatch = useDispatch();
	
	// States for user data
	const users = useSelector((state) => state.users.listOfUsers);
	const currentUser = useSelector((state) => state.user.data);
	const [user, modifyUser] = useState(null);
	const [imageURL, setImageURL] = useState(DEFAULT_PROFILE_PIC_URL);
	const [isOwnProfile, modifyIsOwnProfile] = useState(false);

	// Load user data
	useEffect(() => {
		const username = match.params.username;

		if (!users.length) return;

		if (username) {
			const userData = _.find(users, (user) => user.username === username); // Future: No need to load all users, maybe?
			axios
				.get(`${BASE_URL}/api/user/${userData._id}`, getConfig())
				.then((res) => {
					console.log(res);
					if (user == null || res.data.data._id != user._id)
						modifyUser(res.data.data);
				});
			return;
		}

		if (currentUser && currentUser.username === username) {
			modifyUser(currentUser);
			modifyIsOwnProfile(true);
			return;
		} else {
			if (!currentUser) return;
			modifyUser(currentUser); // What do these two lines do?
			modifyIsOwnProfile(true); //
		}
	}, [match, currentUser, isOwnProfile, users, user]);

	useEffect(() => {
		if (user) {
			const image = user.profileImage;
			if (image) setImageURL(image.location);
		} else {
		}
	}, [user]);


	// Modal Open States
	let defaultToggleStatesObject = {
		AUTH: false,
	};

	const [isOpen, toggleOpen] = useState(defaultToggleStatesObject);
	const toggleModal = (modal) => {
		toggleOpen((previousState) => ({
			...previousState,
			[modal]: !previousState[modal],
		}));
	};
	
	const closeModal = (modal) => {
		toggleModal(modal);
	};

	let today = new Date();
	let hrs = today.getHours();

	// Handling the sub sections of profile
	const [curSection, changeCurSection] = useState("portfolio");

	const portfolioButtonRef = useRef(null);

	const setCurSection = (sectionName) => {
		if (curSection === "portfolio") {
			portfolioButtonRef.current.className = "user-profile-nav-btn";
		}

		changeCurSection(sectionName);

		if (sectionName === "portfolio") {
			portfolioButtonRef.current.className = "user-profile-nav-btn user-profile-nav-active";
		}
	};

	let history = useHistory();
	const redirectToSettings = () => {
		history.push("/settings");
	};
	
	console.log(user);

	return (
		<div >
			{!user ? (
				<>
					<Spin size="large" className="my-spinner" />
					<p style={{ textAlign: "center" }}>
						You need to be signed in to view this profile.
					</p>
				</>
			) : (
				<div className="user-profile-container">
					<CoverImageContainer image="/assets/MORNING.jpg" />
					<ProfileImageContainer image={imageURL} />

					{/* This div contains the datacard for the profile	*/}
					{/* Make this a separate component */}
					<div className="user-profile-datacard-container">
						<div className="user-profile-name-ctnr user-profile-center-data">
							{user.name.split('_')[0]}{user.name.split('_')[1]}
						</div>

						<div className="user-profile-usernamename-ctnr user-profile-center-data">
							@{user.username}
						</div>

					</div>

					{/* This div contains the 3 buttons for profile */}

					{user == currentUser && (
						<div className="user-profile-buttons-container">
							<button className="user-profile-btn" style={{cursor:'pointer'}}>Manage</button>
							<button
								className="user-profile-btn"
								onClick={() => redirectToSettings()}
								style={{cursor:'pointer'}}
							>
								Edit Profile
							</button>
						</div>
					)}

					{/* This div contains the navigation for profile */}
					<div className="user-profile-nav-container">

						<button
							ref={portfolioButtonRef}
							onClick={() => setCurSection("portfolio")}
							className="user-profile-nav-btn"
							style={{cursor:'pointer'}}
						>
							 <div className="show-for-web"> PORTFOLIO </div>
							<div className="show-for-mob"> <RiFilePaper2Fill/> </div>
						</button>

					</div>

					{curSection === "portfolio" && 
						<div className="user-profile-portfolio-ctnr">
								<PortfolioPage user={user} isOwnProfile={isOwnProfile} key={user._id}/>
						</div>
					}

				</div> // Profile container ends
			)}
		</div>
	);
};

export default UserProfileComponent;
