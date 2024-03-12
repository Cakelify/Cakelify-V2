import React from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import MetaData from "../layout/MetaData";
import MenuBar from "../layout/MenuBar";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <MetaData title={"Profile"} />
      <UserLayout>
        <div className="row justify-content-around mt-5 ">
          <div className="col-12 col-md-3">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-circle img-fluid"
                src={
                  user?.avatar
                    ? user?.avatar?.url
                    : "/images/default_avatar.jpg"
                }
                alt={user?.name}
              />
            </figure>
          </div>
          <div className="mr-6">
            <MenuBar />
          </div>
          <div className="col-12 col-md-5">
            <h4>Full Name</h4>
            <p>{user?.name}</p>

            <h4>Email Address</h4>
            <p>{user?.email}</p>

            <h4>Joined On</h4>
            <p>{user?.createdAt?.substring(0, 10)}</p>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Profile;
