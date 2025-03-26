import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/slices/userSlice";
import { removeConnection } from "../redux/slices/connectionSlice";
import { removeFeed } from "../redux/slices/feedSlice";
import { removeRequests } from "../redux/slices/requestSlice";
import logoImg from "../../public/assets/dev-meet-logo.png";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function NavBar() {
  const { user } = useSelector((store) => store.user);
  const [showDrawer, setShowDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeConnection());
      dispatch(removeFeed());
      dispatch(removeUser());
      dispatch(removeRequests());
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={logoImg} alt="logo-img" className="h-6" />
          DevMeet
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end mr-4">
            <div className="flex items-center gap-4">
              <span className="text-lg">Welcome, {user.firstName}</span>
              <div
                onClick={() => setShowDrawer(!showDrawer)}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.imageUrl}
                  />
                </div>
              </div>
            </div>
            {showDrawer && (
              <ul className="menu menu-sm absolute z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow">
                <li onClick={() => setShowDrawer(false)}>
                  <Link to="/profile/view">Profile</Link>
                </li>
                <li onClick={() => setShowDrawer(false)}>
                  <Link to="/connections">Connections</Link>
                </li>
                <li onClick={() => setShowDrawer(false)}>
                  <Link to="/requests">Requests</Link>
                </li>
                <li onClick={() => setShowDrawer(false)}>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
