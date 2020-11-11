import { Modal, notification, Select, Switch } from "antd";
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from '../../helpers/getConfig';
import { uploadFile } from "../../helpers/image";
import { BASE_URL } from '../../shared/config';
import "./Portfolio.css";
import DragItem from "./SubComponents/DragAndDropGrid/DragItem";
import { Grid, GridImage, GridItem } from "./SubComponents/DragAndDropGrid/Grid";
import GridContext, { GridProvider } from "./SubComponents/DragAndDropGrid/GridContext";
import PictureBox from "./SubComponents/PictureBox/PictureBox";

const { Option } = Select;
const ImageContainer = styled.div`
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100%;
  min-height: 60vh;
  border-radius: 10px;
  padding-left: 35%;
  font-weight: 700;
`;

const ImageContainerFull = styled.div`
  background-image: ${(props) => `url(${props.image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100vw;
  min-height: 90vh;
  border-radius: 10px;
  padding-left: 35%;
  font-weight: 700;
`;

const PortfolioPage = (props) => {

  function onChange(value) {} // What is the purpose of these?
  function onBlur() {} //
  function onFocus() {} //
  function onSearch(val) {} //
  const openNotificationWithIcon = (type, titleMsg) => { //
    notification[type]({
      message: titleMsg,
      description:
        '',
    });
  };

  // Fetch user data
  //const user = useSelector((state) => state.user);
  const user = props.user;

  // Refs
  const inputFile = useRef(null);

  
  /* FUNCTIONS */
  const getInitSelectedPics = (user) => {
    let picList = [];
    user.portfolio.forEach((item, index) => {{
      picList.push({
        picid: String(index+1),
        imgurl: item.location,
        id: item._id,
      })
    }})
    return picList;
  }

  
  /* REVERT */
  // Function to handle revert
  const handleRevertPortfolio = () => {
    changeCurSelectedPics(initialSelectedPics);
  };


  /* SAVE */
  // Function to handle save portfolio
  const handleSavePortfolio = async (TYPE, flag) => {
    if (TYPE == 'UPLOAD'){
      if (curSelectedPics) {
        changeInitialSelectedPics(curSelectedPics);
        curSelectedPics.slice().map(async (graphical) => {
        const response = await axios.put(`${BASE_URL}/api/user/portfolio/${graphical.id}`,
                                            {}, getConfig());
                                
        })
      }
    }
    else if (TYPE == 'REORDER') {
      if (curSelectedPics) {
        changeInitialSelectedPics(curSelectedPics);
        const graphicalIds = curSelectedPics.map(picture => picture.id);
        const response = await axios.post(`${BASE_URL}/api/user/${user._id}/portfolio`,
                                          {graphicalIds: graphicalIds}, getConfig());
      }
      if (!flag) openNotificationWithIcon('success', "Changes saved!");
      if (flag) openNotificationWithIcon('success', "Upload Successful");
      setShowSelectedPics(true);
    }
  };

  /* Upload picture for Portfolio */
  let [myFile, changeMyFile] = useState(null);
  const onFileUpdate = (e) => {
    const file = e.target.files[0];
    changeMyFile(file);
  };
  
  const handlePortfolioUpload = async () => {
    if (!myFile) {
      inputFile.current.click();
    } else {
      inputFile.current.click();
      // Send a POST request with the newly given image
      const uploadResponse = await uploadFile(myFile);
      // Extract
      changeCurSelectedPics([...curSelectedPics, {
        picid: curSelectedPics.length+1,
        imgurl: uploadResponse.location,
        id: uploadResponse._id,
      }]);
      changeMyFile(null);
      await handleSavePortfolio('UPLOAD');
    }
  };

  useEffect(() => {
    if (myFile) inputFile.current.click();
  }, [myFile])


  /* Post states */
  let [initialSelectedPics, changeInitialSelectedPics] = useState(getInitSelectedPics(user));
  let [curSelectedPics, changeCurSelectedPics] = useState(getInitSelectedPics(user));
  const [showSelectedPics, setShowSelectedPics] = useState(true);
  

  /* DRAG AND DROP */
  const handleReorder = () => {
    setShowSelectedPics(!showSelectedPics);
  }

  const DragDropGrid = (props) => {
    const { items, moveItem } = useContext(GridContext);
    useEffect(() => {
      if (items.length == props.curSelectedPics.length) changeCurSelectedPics(items);
    }, [items])

    return(
      <Grid>
      {items.map(item => (
        <DragItem key={item.picid} id={item.id} onMoveItem={moveItem}>
          <GridItem>
            <GridImage src={item.imgurl}></GridImage>
          </GridItem>
        </DragItem>
      ))}
    </Grid>)
  }

  
  /* PRESENT */
  let [isOpen, toggleOpen] = useState(false);
  const [files, updateFiles] = useState([]);
  const [description, updateDescription] = useState("");

  const toggleModal = () => {
    toggleOpen(!isOpen);
  };

  const closeModal = () => {
    updateFiles([]);
    updateDescription("");
    toggleModal();
  };
 
  
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <GridProvider curSelectedPics={curSelectedPics} changeCurSelectedPics={changeCurSelectedPics} currentUser={user}>
        <>
      <div>
        <div className="protfolio-modal-fix-class">
          <Modal
            visible={isOpen}
            onCancel={closeModal}
            closable={true}
            footer={null}
            width="100%"
            height="100%"
            centered={true}
            bodyStyle={{ padding: 0 }}
            className="fullscreen-modal"
          >
            <Swiper navigation scrollbar={{ draggable: true }} autoHeight={true}> 
              {initialSelectedPics.slice().map((graphical) => (
                    <SwiperSlide className="fullscreen-modal-slide" key={graphical.id}>
                      <ImageContainerFull 
                        image={graphical.imgurl} 
                        id={graphical.id} />
                    </SwiperSlide>
                ))}
            </Swiper>
          </Modal>
        </div>

        

        <div className="portfolio-carousel-container">
            <Swiper navigation scrollbar={{ draggable: true }} autoHeight={true}>
              {curSelectedPics.slice().map((graphical) => (
                    <SwiperSlide className="fullscreen-modal-slide" key={graphical.id}>
                      <ImageContainer
                        image={graphical.imgurl}
                        id={graphical.id}
                      />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <div className="portfolio-col-container">
          {props.isOwnProfile && <div className="portfolio-left-col">
            <div id="portfolio-cur-pics">
              <div className="portfolio-selector-area-header">
                <h3 className="portfolio-area-headeings">Sort</h3>
              </div>
              {showSelectedPics ? (
                    <div
                      className="portfolio-pic-container"
                    >
                      {curSelectedPics.slice().map((img, index) => (
                              <PictureBox
                                image={img.imgurl}
                                id={img.id}
                                curSelectedPics={curSelectedPics}
                                changeCurSelectedPics={changeCurSelectedPics}
                                isSelected
                              />
                      ))}
                    </div>
                  ) : <DragDropGrid curSelectedPics={curSelectedPics}/>}

              <div className="portfolio-usr-btn-container">

                <button id="portfolio-upload-btn" onClick={handlePortfolioUpload} style={{cursor:'pointer'}}>
                <input
                    className="profile-pic-img-input"
                    id="my-alt-uploaded-profile-img"
                    type="file"
                    name="myProfilePicture"
                    accept="image/x-png,image/jpeg"
                    onChange={onFileUpdate}
                    required
                    hidden
                    ref={inputFile}
                  />UPLOAD</button>
                <button id="portfolio-save-btn" onClick={() => handleSavePortfolio('REORDER')} style={{cursor:'pointer'}}>SAVE CHANGES</button>
                <button id="portfolio-save-btn" onClick={handleReorder} style={{cursor:'pointer'}}>RE-ORDER</button>
                <button id="portfolio-revert-btn" onClick={handleRevertPortfolio} style={{cursor:'pointer'}}>REVERT</button>
              </div>
            </div>

            

          </div>}

          <div className="portfolio-right-col">
            <button onClick={toggleModal} className="portfolio-btns" style={{cursor:'pointer'}}>
              PRESENT
            </button>

            <button className="portfolio-btns" style={{cursor:'pointer'}}>SHARE</button>

            {props.isOwnProfile && <div className="portfolio-switch-container">
              <h3>STATUS</h3>
              <Switch
                id="visible-toggle"
                checkedChildren={"PUBLIC"}
                unCheckedChildren={"DRAFT"}
                defaultChecked
              />
            </div>}
          </div>
        </div>
      </div>
    </>
    </GridProvider>
    </DndProvider>
    </>
  );
};
export default PortfolioPage;