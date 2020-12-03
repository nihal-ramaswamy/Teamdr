import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/actions/users";
import * as userActions from "../../redux/actions/user";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import InfoIcon from '@material-ui/icons/Info';
import axios from './axios';
import InfoModal from './InfoModal'


function TinderCards(props) {
  const userList = props.userList;
  const currentUser = useSelector((state) => state.user.data);
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    try {
      setCurrentId(currentUser._id)
    }
    catch {}
    }, [currentUser])
  const [showInfoModal, setShowInfoModal] = useState(false);
  const dispatch = useDispatch();
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  }
  const [userInFocus, setUserInFocus] = useState(null);

  const outOfFrame = (name) => {
    console.log(name + " left the screen! ");
  }

  return (<div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {userList.filter((user) => user._id != currentId).map(user => {
            let location = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
            if (user.profileImage) {
              location = user.profileImage.location
            }
            return (
              <>
              <InfoModal isModalOpen={showInfoModal} toggleModal={()=>setShowInfoModal(!showInfoModal)} user={userInFocus}/>
              <TinderCard className="swipe" key={user.name} preventSwipe={["up","down"]} onSwipe={(dir) => swiped(dir, user.name)} onCardLeftScreen={() => outOfFrame(user.name)}>
                
                <div style={{ backgroundImage: `url(${location})`}} className="card">
                    <InfoIcon onClick={()=>{
                      setUserInFocus(user);
                      setShowInfoModal(true)}}/>
                    <h3>{user.name}</h3>
                </div>
              </TinderCard>
            </>
        )})}
      </div>

      
  </div>); 

}

export default TinderCards;


