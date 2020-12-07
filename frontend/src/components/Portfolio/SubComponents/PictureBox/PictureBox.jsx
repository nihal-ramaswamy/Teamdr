import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import './PictureBox.css';



const PictureBox = (props) => {
    

    const PortfolioPicContainer = styled.div`
    
    height:170px;
    width:170px;
    border: 1px solid black;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin:5px;
    position:relative;
    background-color:white;
    background-image: ${(props) => `url(${props.image})`};

    @media screen and (max-width:1024px) {
        height: 90px;
        width: 90px;
    }
    
    `;
    

    //let [isSelected, changeSelectionState] = useState(false);
    let selectionButtonRef = useRef(null);
    useEffect(() => {
        if (props.isSelected) selectionButtonRef.current.style.backgroundColor = "chartreuse";
    }, [selectionButtonRef, props.curSelectedPics])
    
    /*useEffect(() => {

        if(isSelected){
            selectionButtonRef.current.style.backgroundColor = "chartreuse";
        }
        else{
            selectionButtonRef.current.style.backgroundColor = "white";
        }

    }, [isSelected])*/

    const handleSelection = () => {

        if (!props.isSelected) {
            props.changeCurSelectedPics([...props.curSelectedPics, {
                picid: props.curSelectedPics.length+1,
                imgurl: props.image,
                id: props.id
            }])
        }
        else {
            props.changeCurSelectedPics(props.curSelectedPics.filter(picture => picture.id !== props.id))
        }
       // changeSelectionState(!isSelected);
    }
    

    return ( 
        <>
                <PortfolioPicContainer image={props.image}>

                    <button className="btn-selector" ref={selectionButtonRef} onClick={handleSelection}> </button>

                </PortfolioPicContainer>

            
        </>
     );
}
 
export default PictureBox;
