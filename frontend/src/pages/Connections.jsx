import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slices/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";
import { BASE_URL } from "../utils/constants";

export default function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(connections);
  useEffect(() => {
    getConnections();
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center py-4">
      {connections?.length === 0 && (
        <h1 className="text-2xl font-bold">There are no connections</h1>
      )}
      {connections?.length > 0 && (
        <>
          <h1 className="text-center text-2xl font-bold">Connections</h1>
          <div className="m-8 flex w-full flex-col items-center gap-4">
            {connections?.map((person) => (
              <ConnectionCard key={person._id} person={person} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
