import React from "react";
import SettingsBar from "../../components/SettingsBar";
import "./settings.css";

const Settings = () => {
  return (
    <div className="settings_app">
      <SettingsBar />
      <div className="settings_content"></div>
    </div>
  );
};

export default Settings;
