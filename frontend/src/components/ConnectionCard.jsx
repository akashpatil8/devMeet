import React from "react";

export default function ConnectionCard({ person }) {
  return (
    <div
      key={person?._id}
      className="flex w-1/2 items-center gap-10 rounded-lg bg-base-300 p-4"
    >
      <img
        src={person.imageUrl}
        className="h-32 w-32 rounded-full object-cover"
      />
      <div>
        <h1 className="text-xl font-medium text-slate-100">
          {person.firstName} {person.lastName}
        </h1>
        {person?.age && person?.gender && (
          <h2 className="mt-1 text-lg">
            {person.age}, {person.gender}
          </h2>
        )}
        <p className="mt-3 text-slate-500">{person.about}</p>
      </div>
    </div>
  );
}
