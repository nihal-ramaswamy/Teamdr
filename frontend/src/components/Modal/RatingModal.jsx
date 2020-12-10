import { Modal, Row } from "antd";
import React, { useState } from "react";
import "../../components/Modal/Modal.css";
import {
    DesktopContainer
} from "../../containers/Responsive.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from "axios";
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";
import Card from '../../pages/Teamder/Card';

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
	const [value, setValue] = React.useState(-1);
  	const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    
    

	return (
        <div>
		<div className={classes.root}>
        <Row>
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
        </Row>
		</div>
        <Row>
            <button onClick={() => {
                if (value != -1) {
                    props.rate(value, props.user._id);
                    props.TeammateStatus('complete', props.user._id)
                }
                else {
                    console.log(value);
                }
                }} style={{cursor: "pointer"}}>Submit</button>
        </Row>
        </div>
        
	);
}

const MainModal = (props) => {
    return (
        <>
            <DesktopContainer>
                <div className = "show-for-web">Give Rating:</div>
                <div className = "show-for-web"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><GiveRating rate={props.rate} TeammateStatus={props.TeammateStatus} user={props.user}/></div> <br />
                <div style={{ height: "40px" }} />
            </DesktopContainer>
           
        </>
    );
};

const RatingModal = (props) => {
    const [modalMode, switchModal] = useState(0);
    const rate = async (value, id) => {
        const response = await axios.post(`${BASE_URL}/api/teamder/rate`, {
            value: value,
            id: id,
          },
          getConfig()
        )
        console.log(response);
    }

    const TeammateStatus = async (reaction, reactee) => {
        const response = await axios.post(`${BASE_URL}/api/teamder/teammate`, {
            id: reactee,
            reaction: reaction,
          },
          getConfig()
        )
        window.location.reload();
    }
    return (
        <Modal
            wrapClassName="auth-modal"
            visible={props.isModalOpen}
            onCancel={props.toggleModal}
            closable={false}
            footer={<div />}
            width={window.innerWidth >= 850 ? "50vw" : "100vw"}
            centered={true}
        >
        <MainModal switchModal={(mode) => switchModal(mode)} toggleModal={props.toggleModal} user={props.user} rate={rate} TeammateStatus={TeammateStatus}/>

        </Modal>
    );
};

export default RatingModal;
