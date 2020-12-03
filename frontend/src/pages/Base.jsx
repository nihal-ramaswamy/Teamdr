import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchUsers } from "../redux/actions/users";
import * as userActions from "../redux/actions/user";
import Tinder from './Tinder/App';

import { Spin } from "antd";



import Navbar from "../components/Navbar/Navbar";
import PortfolioPage from "../components/Portfolio/Portfolio";


import HomePage from "./Home/Home";
import UserProfileComponent from "./Profile/Profile";
import SettingsPage from "./Settings/Settings";


const BaseComponent = () => {   
  const user = useSelector((state) => state.user);
  const userList = useSelector((state) => state.users.listOfUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.authenticateUser());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={UserProfileComponent} />
          <Route path="/profile/:username" component={UserProfileComponent} />
          <Route exact path="/feed" component={HomePage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/profile/portfolio" component={PortfolioPage} />
          <Route exact path="/find" component={Tinder} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default BaseComponent;
