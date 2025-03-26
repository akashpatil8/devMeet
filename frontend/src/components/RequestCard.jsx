import axios from "axios";
import { useDispatch } from "react-redux";
import { remvoveOneRequest } from "../redux/slices/requestSlice";
import { BASE_URL } from "../utils/constants";

export default function RequestCard({ person }) {
  const { firstName, lastName, age, gender, imageUrl, about } =
    person?.fromUserId;
  const dispatch = useDispatch();

  const handleRequestReview = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(remvoveOneRequest(id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex w-1/2 items-center justify-between gap-10 rounded-lg bg-base-300 p-4">
      <div className="flex flex-1 items-center gap-8">
        <figure className="h-32 w-32">
          <img
            src={imageUrl}
            className="h-full w-full rounded-full object-cover"
          />
        </figure>
        <div>
          <h1 className="text-xl font-medium text-slate-100">
            {firstName} {lastName}
          </h1>
          {age && gender && (
            <h2 className="mt-1 text-lg">
              {age}, {gender}
            </h2>
          )}
          <p className="mt-3 text-slate-500">{about}</p>
        </div>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => {
            handleRequestReview("accepted", person._id);
          }}
          className="btn btn-primary block"
        >
          Accept
        </button>
        <button
          onClick={() => {
            handleRequestReview("rejected", person._id);
          }}
          className="btn btn-outline block"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
