import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/slices/requestSlice";
import RequestCard from "../components/RequestCard";
import { BASE_URL } from "../utils/constants";

export default function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  return (
    <main className="flex flex-1 flex-col items-center py-4">
      {requests?.length === 0 && (
        <h1 className="text-2xl font-bold">There are no requests</h1>
      )}
      {requests?.length > 0 && (
        <>
          <h1 className="text-center text-2xl font-bold">
            Connections Requests
          </h1>
          <div className="m-8 flex w-full flex-col items-center gap-4">
            {requests?.map((person) => (
              <RequestCard key={person._id} person={person} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
