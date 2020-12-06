import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchUsers } from "../redux/actions/users";
import * as userActions from "../redux/actions/user";
import Teamder from './Teamder/App';

import { Spin } from "antd";
import FooterComponent from '../components/Footer/Footer';


import Navbar from "../components/Navbar/Navbar";
import PortfolioPage from "../components/Portfolio/Portfolio";
import About from '../components/About/About'

import TeamsPage from "./Teams/Teams";
import UserProfileComponent from "./Profile/Profile";
import SettingsPage from "./Settings/Settings";


const BaseComponent = () => {   
  const user = useSelector((state) => state.user);
  const userList = useSelector((state) => state.users.listOfUsers);
  console.log(userList);

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
          <Route exact path="/" component={About} />
          <Route exact path="/profile" component={UserProfileComponent} />
          <Route path="/profile/:username" component={UserProfileComponent} />
          <Route exact path="/teams" component={TeamsPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/profile/portfolio" component={PortfolioPage} />
          <Route exact path="/find" component={Teamder} />
        </Switch>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
};

export default BaseComponent;
