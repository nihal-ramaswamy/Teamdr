import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "../redux/store";
import BaseComponent from './Base';

const store = configureStore();

class App extends Component {

  
  render() {
    return (
      <div>
        <Provider store={store}>
          <BaseComponent />
        </Provider>
      </div>
    );
  }
}

export default App;
