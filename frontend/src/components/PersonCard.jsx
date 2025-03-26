import axios from "axios";
import { useDispatch } from "react-redux";
import { removeOneFromFeed } from "../redux/slices/feedSlice";
import { BASE_URL } from "../utils/constants";

export default function PersonCard({ personData }) {
  const { _id, firstName, lastName, imageUrl, about, age, gender } = personData;
  const dispatch = useDispatch();

  const handleRequestSend = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeOneFromFeed(id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card card-compact w-96 bg-base-300 shadow-xl">
      <figure className="h-96">
        <img src={imageUrl} alt="Shoes" className="bg-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <div className="card-actions justify-end">
          <button
            onClick={() => handleRequestSend("ignored", _id)}
            className="btn btn-outline"
          >
            Ignore
          </button>
          <button
            onClick={() => handleRequestSend("interested", _id)}
            className="btn btn-primary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
