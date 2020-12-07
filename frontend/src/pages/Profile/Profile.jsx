import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { Spin } from "antd";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PortfolioPage from "../../components/Portfolio/Portfolio";
import getConfig from "../../helpers/getConfig";
import {
	BASE_URL,
	DEFAULT_PROFILE_PIC_URL
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



const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
  };
  const useStyles = makeStyles({
	root: {
	  width: 200,
	  display: 'flex',
	  alignItems: 'center',
	},
  });

  
  const GiveRating = (props) => {
	const [value, setValue] = React.useState(2);
  	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();

	return (
		<div className={classes.root}>
		<Rating
			name="hover-feedback"
			value={props.value}
			precision={0.5}
			onChange={(event, newValue) => {
			setValue(newValue);
			}}
			onChangeActive={(event, newHover) => {
			setHover(newHover);
			}}
		/>
		{props.value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : props.value]}</Box>}
		</div>
	);
}

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
					// console.log(res);
					if (user === null || res.data.data._id != user._id)
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
			setCurSection("information");
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
	const [curSection, changeCurSection] = useState("information");

	const portfolioButtonRef = useRef(null);
	const AboutMeButtonRef = useRef(null);

	const setCurSection = (sectionName) => {
		if (curSection === "portfolio") {
			portfolioButtonRef.current.className = "user-profile-nav-btn";
		}
		else if (curSection === "information") {
			AboutMeButtonRef.current.className = "user-profile-nav-btn";
		}

		changeCurSection(sectionName);

		if (sectionName === "portfolio") {
			portfolioButtonRef.current.className = "user-profile-nav-btn user-profile-nav-active";
		}
		else if (sectionName === "information") {
			AboutMeButtonRef.current.className = "user-profile-nav-btn user-profile-nav-active";
		}
	};

	let history = useHistory();
	const redirectToSettings = () => {
		history.push("/settings");
	};
	
	// console.log(user);

	return (
		<div >
			{!user ? (
				<>
					<Spin size="large" className="my-spinner" />
					<p style={{ textAlign: "center" }}>
						Loading.. please wait.
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

					{user === currentUser && (
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
							ref={AboutMeButtonRef}
							onClick={() => setCurSection("information")}
							className="user-profile-nav-btn"
							style={{cursor:'pointer'}}
						>
							 <div className="show-for-web"> About Me </div>
							<div className="show-for-mob"> <RiFilePaper2Fill/> </div>
						</button>

						<button
							ref={portfolioButtonRef}
							onClick={() => setCurSection("portfolio")}
							className="user-profile-nav-btn"
							style={{cursor:'pointer'}}
						>
							 <div className="show-for-web"> Portfolio </div>
							<div className="show-for-mob"> <RiFilePaper2Fill/> </div>
						</button>

					</div>

					{(curSection === "information") ? 
	
						<div style = {{
							fontSize: '20px'
						}}>
							<div className = "show-for-web">Name: </div>

							<div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{user.name}</div><br />

							<div className = "show-for-web"><FaGithub /> GitHub:</div>
							<div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{user.github ? user.github : "N/A"}</div> <br />

							<div className = "show-for-web"><FaLinkedin /> LinkedIn:</div>
							<div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{user.linkedin ? user.linkedin : "N/A"}</div> <br />

							<div className = "show-for-web">Rating:</div>
							<div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Rating name="read-only" value={user.rating} readOnly /></div> <br />
							
							<div className = "show-for-web">Bio</div>
							<div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{user.bio ? user.bio : "N/A"}</div> <br />
						</div>
						

						:
						<div className="user-profile-portfolio-ctnr">
							<PortfolioPage user={user} isOwnProfile={isOwnProfile} key={user._id}/>
						</div>

					}

					{/* <FooterComponent /> */}
				</div> // Profile container ends
			)}
		</div>
	);
};

export default UserProfileComponent;