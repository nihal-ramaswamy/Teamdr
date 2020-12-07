import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TeamderCard from "react-tinder-card";
import InfoModal from '../../components/Modal/InfoModal';
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";
import "./TeamderCards.css";

function TeamderCards(props) {
  const userList = props.userList;
  const currentUser = useSelector((state) => state.user);
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    try {
      setCurrentId(currentUser.data._id)
    }
    catch {}
    }, [currentUser.data])
  const [showInfoModal, setShowInfoModal] = useState(false);
  const dispatch = useDispatch();
  const swiped = async (direction, id) => {
    const response = await axios.post(`${BASE_URL}/api/teamder/swipe`, {
        id: id,
        swipe: direction,
      },
      getConfig()
    )
    
  }
  const [userInFocus, setUserInFocus] = useState(null);

  const outOfFrame = (name) => {
    console.log(name + " left the screen! ");
  }

  return !currentUser.isLoading && (<div className="teamderCards">
      <div className="teamderCards__cardContainer">
        {userList.filter((user) => user._id != currentId).filter((user) => !currentUser.data.swipedLeftOn.includes(user._id))
                  .filter((user) => !currentUser.data.swipedRightOn.includes(user._id))
                  .filter((user) => !currentUser.data.matched.includes(user._id))
                  .map(user => {
                    let location = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                    if (user.profileImage) {
                      location = user.profileImage.location
                    }
                    return (
                      <React.Fragment key = {user._id}>
                      <InfoModal key = {"INFO" + user._id + user.email} isModalOpen={showInfoModal} toggleModal={()=>setShowInfoModal(!showInfoModal)} user={userInFocus}/>
                      <TeamderCard className="swipe" key={"Teamder" + user._id + user.email} preventSwipe={["up","down"]} onSwipe={(dir) => swiped(dir, user._id)} onCardLeftScreen={() => outOfFrame(user.name)}>
                        
                        <div key = {"DIV" + user._id+ user.email} style={{ backgroundImage: `url(${location})`}} className="card">
                            <InfoIcon onClick={()=>{
                              setUserInFocus(user);
                              setShowInfoModal(true)}}
                              style={{cursor:'pointer', color: '#183d70'}}/>
                            <h3>{user.name}</h3>
                        </div>
                      </TeamderCard>

                    </React.Fragment>
                )})}
      </div>
  </div>); 

}

export default TeamderCards;


