import { Tabs } from "antd";
import React from "react";
import "./Admin.css";
import AdminPageDashboardComponent from "./AdminComponents/AdminPageDashboard";
import RegularDrillsComponent from "./AdminComponents/RegularDrills";

const { TabPane } = Tabs;

const AdminPage = () => {
  return (
    <div className="admin-page-container admin-tabs-heading">
      <Tabs size="large" tabBarGutter={50} defaultActiveKey="1">
       
        <TabPane tab="Dashboard" key="1">
            <AdminPageDashboardComponent />
        </TabPane>
       
        <TabPane tab="Regular Drills" key="2">
          <RegularDrillsComponent />
        </TabPane>
        
        <TabPane tab="Analytics" key="3">
          Content of Tab Pane 3
        </TabPane>

        <TabPane tab="Find Profile" key="4">
          Content of Tab Pane 4
        </TabPane>

        <TabPane tab="Settings" key="5">
          Content of Tab Pane 5
        </TabPane>

      </Tabs>
    </div>
  );
};

export default AdminPage;
