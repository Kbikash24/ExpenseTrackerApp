import React, { useState } from "react";
import "./Profile.css";
import { BsFillPersonFill, BsGlobe } from "react-icons/bs";

const Profile = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    props.onSubmit(formData);
    setFormData({ name: "", url: "" });
  };

  return (
    <>
      <div className="head">Winner never quit, quitter never wins.</div>
      <div className="info">
        <div className="displ-cncl">
          <div>Contact Details</div>
          <button className="cncl">Cancel</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              <BsFillPersonFill className="icon" />
              <label>Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <BsGlobe className="icon"/>
              <label>Profile photo Url</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
