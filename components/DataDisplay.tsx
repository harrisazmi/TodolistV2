"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { createBrowserClient } from "@supabase/ssr";

type Task = {
  id: number;
  info: string;
};

interface DataDisplayProps {
  tasks: Task[];
  tableFrom: string;
  deleteData: (id: number) => Promise<boolean>;
}

export default function DataDisplayWrapper({
  tasks,
  tableFrom,
  deleteData,
}: DataDisplayProps) {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = supabase
      .channel(`realtime-${tableFrom}`) // unique per table
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableFrom },
        (payload) => {
          const { eventType, new: newRow, old: oldRow } = payload;

          setLocalTasks((prev) => {
            if (eventType === "INSERT") {
              return [...prev, newRow as Task];
            }
            if (eventType === "UPDATE") {
              return prev.map((task) =>
                task.id === (newRow as Task).id ? (newRow as Task) : task
              );
            }
            if (eventType === "DELETE") {
              return prev.filter((task) => task.id !== (oldRow as Task).id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <h1 className="text-xl">Tasks</h1>
      <div className="flex flex-col gap-2">
        {localTasks.map((task) => (
          <DataDisplay
            key={task.id.toString()}
            taskID={task.id}
            taskInfo={task.info}
            deleteData={deleteData}
          />
        ))}
      </div>
    </div>
  );
}

function DataDisplay({
  taskID,
  taskInfo,
  deleteData,
}: {
  taskID: number;
  taskInfo: string;
  deleteData: (id: number) => Promise<boolean>;
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
