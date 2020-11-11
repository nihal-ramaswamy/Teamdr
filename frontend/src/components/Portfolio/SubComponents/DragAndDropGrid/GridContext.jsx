import React, { createContext, useState } from "react";

// Context

const GridContext = createContext();

export const GridProvider = (props) => {
  
  const currentUser = props.currentUser;
  const getInitSelectedPics = (user) => {
    let picList = [];
    user.portfolio.forEach((item, index) => {{
      picList.push({
        picid: String(index+1),
        imgurl: item.location,
        id: item._id,
      })
    }})
    return [...picList];
  }

  const [contextValue, changeContextValue] = useState({
    items: getInitSelectedPics(currentUser),
  })


  const move = (array, oldIndex, newIndex) => {
    if (newIndex >= array.length) {
      newIndex = array.length - 1;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return [...array];
  }
  
  const moveElement = (array, index, offset) => {
    const newIndex = index + offset;
    return move(array, index, newIndex);
  }



  const setItems = items => changeContextValue(previousContextValue => (
    {...previousContextValue, items: items}));

  const moveItem = (sourceId, destinationId) => {
    const sourceIndex = contextValue.items.findIndex(
      item => item.id === sourceId
    );
    const destinationIndex = contextValue.items.findIndex(
      item => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    changeContextValue(previousContextValue => (
      {...previousContextValue, items:  moveElement(previousContextValue.items, sourceIndex, offset)}));
    
  };

  return (
    <GridContext.Provider value={{items: contextValue.items,
                                  moveItem: moveItem,
                                  setItems: setItems}}>
      {props.children}
    </GridContext.Provider>
  );


}

export default GridContext;
