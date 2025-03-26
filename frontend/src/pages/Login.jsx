import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, loadingUser, errorUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Login() {
  const [email, setEmail] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, isUserLoading, userError } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(data) {
    dispatch(loadingUser());
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(errorUser(error?.response?.data?.message));
    }
  }

  async function handleSignUp(data) {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/profile/view");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
      dispatch(errorUser(error?.response?.data?.message));
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="card mx-auto w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <form onSubmit={handleSubmit(isSignUp ? handleSignUp : handleLogin)}>
            {isSignUp && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors?.firstName && (
                    <p className="-mb-3 mt-1 text-end text-xs text-red-400">
                      {errors.firstName?.message}
                    </p>
                  )}
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors?.lastName && (
                    <p className="-mb-3 mt-1 text-end text-xs text-red-400">
                      {errors.lastName?.message}
                    </p>
                  )}
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors?.email && (
                <p className="-mb-3 mt-1 text-end text-xs text-red-400">
                  {errors.email?.message}
                </p>
              )}
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors?.password && (
                <p className="-mb-3 mt-1 text-end text-xs text-red-400">
                  {errors.password?.message}
                </p>
              )}
            </label>
            <button
              type="button"
              onClick={() => setIsSignUp((val) => !val)}
              className="my-4 cursor-pointer text-center text-sm hover:text-white"
            >
              {isSignUp ? "Already a user? Login" : "New user? Sign Up"}
            </button>
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary w-full">
                {isUserLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
