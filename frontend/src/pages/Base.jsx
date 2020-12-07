import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterComponent from '../components/Footer/Footer';
import Navbar from "../components/Navbar/Navbar";
import PortfolioPage from "../components/Portfolio/Portfolio";
import * as userActions from "../redux/actions/user";
import { fetchUsers } from "../redux/actions/users";
import About from './About/About';
import UserProfileComponent from "./Profile/Profile";
import SettingsPage from "./Settings/Settings";
import Teamder from './Teamder/App';
import TeamsPage from "./Teams/Teams";
import ErrorBoundary from '../components/Error/Error';

const BaseComponent = () => {   
  const user = useSelector((state) => state.user);
  const userList = useSelector((state) => state.users.listOfUsers);
  // console.log(userList);

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
