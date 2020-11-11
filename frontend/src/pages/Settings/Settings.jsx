import { notification, Spin } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import getConfig from "../../helpers/getConfig";
import { deleteImage, uploadFile } from "../../helpers/image";
import { updateUserSettings } from "../../redux/actions/user";
import { BASE_URL, DEFAULT_PROFILE_PIC_URL } from "../../shared/config";
import "./Settings.css";

const SettingsPage = () => {
  // Getting user data
  const user = useSelector((state) => state.user);

  let imageURL = DEFAULT_PROFILE_PIC_URL;

  if (user.data) {
    const image = user.data.profileImage;
    if (image) imageURL = image.location;
  }

  const dispatch = useDispatch();

  if (user.data) {
    const image = user.data.profileImage;
    if (image) imageURL = image.location;
  }

  // STATES
  let [showPassword, changeShowPassword] = useState(false);
  let [myFile, changeMyFile] = useState(null);
  let [oldPassword, changeOldPswd] = useState("");
  let [newPassword, changeNewPswd] = useState("");
  let [confirmNewPassword, changeConfirmPswd] = useState("");


    let firstNameHTMLele = useRef(null);
    let lastNameHTMLele = useRef(null);
    let userNameHTMLele = useRef(null);
    let userDesignationHTMLele = useRef(null);
    let emailHTMLele = useRef(null);

  const onOldPswdChange = (e) => {
    changeOldPswd(e.target.value);
  };

  const onNewPswdChange = (e) => {
    changeNewPswd(e.target.value);
  };

  const onconfirmPswdChange = (e) => {
    changeConfirmPswd(e.target.value);
  };

  const onFileUpdate = (e) => {
    const file = e.target.files[0];

    changeMyFile(file);
  };

  // change password on click
  const handlePasswordChangeClick = async () => {
    if (newPassword !== confirmNewPassword) {
      openNotificationWithIcon('error', "New Password doesn't match Confirm Password");
    } else {
      if (newPassword === "") {
        openNotificationWithIcon('error', "Password is empty");
      } else {
        try {
          const response = await axios.put(
            `${BASE_URL}/api/user/password`,
            { oldPassword, newPassword },
            getConfig()
          );
        } catch (error) {
          openNotificationWithIcon('error', error.message);
        }
      }
    }
  };

  // Funtion to change the profile picture
  const handleChangeProfilePicture = async () => {

    if (!myFile) {
      openNotificationWithIcon('warning', "No File Selected")
    } else {
      if (user.data.profileImage != null) {
        // Get the current id of the user,s profile image

        // Send a delete request for this id
        await deleteImage(user.data.profileImage);
      }

      // Send a POST request with the newly given image
      const uploadResponse = await uploadFile(myFile);

      // Extract
      const obj = {
        profileImage: uploadResponse._id,
      };

      dispatch(updateUserSettings(obj));
      openNotificationWithIcon('success', "Update Successful")
    }
  };

  // function to remove the profile picture
  const removeProfileImage = async () => {
    if (user.data.profileImage != null) {
      // Send a delete request for this id
      await deleteImage(user.data.profileImage);
    }

    dispatch(updateUserSettings({}));
    openNotificationWithIcon('success', "Removed Successfully")
  };

  const handleAccountSettingsUpdate = () => {

    if(firstNameHTMLele.current.value === "" || userNameHTMLele.current.value === "" || lastNameHTMLele.current.value === "" || userDesignationHTMLele.current.value === "" || emailHTMLele.current.value === "" )
    {
      openNotificationWithIcon('warning', "All fields are required");
      return;
    }

    const obj = {
      "name": firstNameHTMLele.current.value + "_" + lastNameHTMLele.current.value,
      "username": userNameHTMLele.current.value,
      "designation": userDesignationHTMLele.current.value,
      "email": emailHTMLele.current.value
    };

    dispatch(updateUserSettings(obj));

    // Notification
    openNotificationWithIcon('success', "Update Successful")
  };

  const handlePasswordVisibility = () => {
    changeShowPassword((showPassword = !showPassword));

    let myPasswordInputfield = document.getElementById(
      "retyped-user-profile-psswd"
    );

    if (myPasswordInputfield.type === "password") {
      myPasswordInputfield.type = "text";
    } else {
      myPasswordInputfield.type = "password";
    }
  };

  const openNotificationWithIcon = (type, titleMsg) => {
    notification[type]({
      message: titleMsg,
      description:
        '',
    });
  };



  return (
    <div>
      {user.data === null ? (
        <Spin size="large" className="my-spinner" />
      ) : (
        <div className="settings-page-container">
          <div className="settings-right-col">
            <div id="account-settings" className="settings-card-container">
              <h3 className="settings-card-header">Account Settings</h3>

              <div className="account-settings-header">
                <div className="account-settings-header-left-col">
                  <img src={imageURL} alt="" />

                  <input
                    className="profile-pic-img-input"
                    id="my-alt-uploaded-profile-img"
                    type="file"
                    name="myProfilePicture"
                    accept="image/x-png,image/jpeg"
                    onChange={onFileUpdate}
                    required
                  />
                  <button
                    className="profile-pic-btns"
                    id="settings-profile-img-update-btn"
                    onClick={handleChangeProfilePicture}
                  >
                    Update Picture
                  </button>
                  <button
                    className="profile-pic-btns"
                    id="settings-profile-img-update-btn"
                    onClick={removeProfileImage}
                  >
                    Remove Picture
                  </button>
                </div>

                <div className="account-settings-header-right-col">
                  <div className="one-form-field">
                    <label>First Name</label>
                    <input
                      id="user-first-name"
                      className="one-form-field-input"
                      maxLength="15"
                      ref={firstNameHTMLele}
                      defaultValue={user.data.name.split("_")[0]}
                    />
                  </div>

                  <div className="one-form-field">
                    <label>Last Name</label>
                    <input
                      id="user-last-name"
                      className="one-form-field-input"
                      maxLength="15"
                      ref={lastNameHTMLele}
                      defaultValue={user.data.name.split("_")[1]}
                    />
                  </div>

                  <div className="one-form-field">
                    <label>Username</label>
                    <input
                      id="profile-user-name"
                      className="one-form-field-input"
                      maxLength="20"
                      ref={userNameHTMLele}
                      defaultValue={user.data.username}
                    />
                  </div>

                  <div className="one-form-field">
                    <label>E-mail</label>
                    <input
                      className="one-form-field-input"
                      ref={emailHTMLele}
                      defaultValue={user.data.email}
                    />
                  </div>

                  <div className="one-form-field">
                    <label>Designation</label>

                    <input
                      id="user-designation"
                      className="one-form-field-input"
                      maxLength="20"
                      ref={userDesignationHTMLele}
                      defaultValue={user.data.designation}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="settings-card-buttons-container">
                <Link href={'/settings'} className="settings-revert-btn">REVERT</Link>
                <button
                  id="account-settings-update-btn"
                  className="settings-update-btn"
                  onClick={handleAccountSettingsUpdate}
                >
                  UPDATE
                </button>
              </div>
            </div>

            <div id="privacy-and-security" className="settings-card-container">
              <h3 className="settings-card-header">Privacy & Security</h3>

              <div className="one-form-field">
                <label>Old Password</label>
                <input
                  id="user-profile-old-psswd"
                  onChange={onOldPswdChange}
                  className="one-form-field-input"
                  maxLength="20"
                  defaultValue={""}
                  required
                />
              </div>

              <div className="one-form-field">
                <label
                >New Password</label>
                <input
                  id="user-profile-psswd"
                  onChange={onNewPswdChange}
                  className="one-form-field-input"
                  maxLength="20"
                  defaultValue={""}
                  required
                />
              </div>

              <div className="one-form-field">
                <label
                >Confirm New Password</label>

                <div className="one-form-field-with-btn-container">
                  <input
                    id="retyped-user-profile-psswd"
                    onChange={onconfirmPswdChange}
                    type="password"
                    className="one-form-field-input"
                    maxLength="20"
                    defaultValue={""}
                    required
                  ></input>
                  <button
                    className="show-password-btn"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </div>

              <div className="settings-card-buttons-container">
                <Link href={'/settings'} className="settings-revert-btn">REVERT</Link>
                <button
                  className="settings-update-btn"
                  onClick={handlePasswordChangeClick}
                >
                  UPDATE
                </button>
              </div>
            </div>

            <div id="help-and-support" className="settings-card-container">
              <h3 className="settings-card-header">Help & Support</h3>

              {/* <textarea className="suppor-request-textarea" required></textarea> */}
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc3EUXfG8KL1AUH9La3fc4PwpM2fu-DlA_oy1CkLdUsB2hV-w/viewform?embedded=true" width="100%" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

              <div className="settings-card-buttons-container">
                {/* <button className="settings-update-btn">SUBMIT</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
