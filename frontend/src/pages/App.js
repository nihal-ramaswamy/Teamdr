import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../redux/store";
import BaseComponent from './Base';

const store = configureStore();

const App = () => {


    return (
      <div>
        <Provider store={store}>
          <BaseComponent />
        </Provider>
      </div>
    );

}
export default App;
