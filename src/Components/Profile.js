import React, { useState, useEffect } from "react";
import "./Profile.css";
import { BsFillPersonFill, BsGlobe } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = () => {
    // Handle cancel action here.
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: name,
            photoUrl: profilePhoto,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        console.log(data);
        console.log("Profile data submitted successfully");
        // You can navigate to another page here.
        navigate("/");
        // Clear input fields after successful update
        setName("");
        setProfilePhoto("");
      } else {
        setLoading(false);
        const data = await res.json();
        if (data && data.error.message) {
          setError("Profile not updated successfully- " + data.error.message);
        } else {
          setError("Some error occurred!! Please try again..");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in Profile Updation :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDz0pafMT_oDg5zZ7kpQLMb5kEhGfW0ZmA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setName(data.users[0].displayName);
          setProfilePhoto(data.users[0].photoUrl);
          console.log("Data fetch Success");
        } else {
          const data = await res.json();
          if (data && data.error.message) {
            setError("Profile not updated successfully- " + data.error.message);
          } else {
            setError("Some error occurred!! Please try again..");
          }
        }
      } catch (error) {
        console.error("Error in Profile Updation :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="head">Winner never quit, quitter never wins.</div>
      <div className="info">
        <div className="displ-cncl">
          <div>Contact Details</div>
          <button className="cncl" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div className="inpts">
          <div>
            <BsFillPersonFill className="icons" />
            <label>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <BsGlobe className="icons" />
            <label>Profile photo Url</label>
            <input
              type="text"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <button type="submit" className="btn" onClick={handleSubmit}>
            Update
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default Profile;
