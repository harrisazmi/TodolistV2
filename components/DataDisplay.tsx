"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import deleteData from "@/app/actions/deleteData";

type Task = {
  _id: string;
  info: string;
};

interface DataDisplayProps {
  tasks: Task[];
}

export default function DataDisplayWrapper({ tasks }: DataDisplayProps) {
  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h1 className="text-xl">Tasks</h1>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <DataDisplay key={task._id} taskID={task._id} taskInfo={task.info} />
        ))}
      </div>
    </div>
  );
}

function DataDisplay({
  taskID,
  taskInfo,
}: {
  taskID: string;
  taskInfo: string;
}) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((flip) => !flip);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="h-4 w-4"
      />
      <div className="flex items-center justify-between w-full">
        <p className="p-2 pl-4 break-words max-sm:max-w-[200px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[500px]">
          {taskInfo}
        </p>

        {checked && (
          <div className="h-10 w-20 items-center justify-center flex">
            <Button
              onClick={() => deleteData(taskID)}
              variant="link"
              className="hover:cursor-pointer text-black"
            >
              Delete
            </Button>
          </div>
        )}
        {!checked && <div className="h-10 w-20"></div>}
      </div>
    </div>
  );
}
