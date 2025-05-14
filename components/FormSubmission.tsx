"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postData } from "@/app/actions/supabase";

export default function SubmitForm() {
  const [data, setData] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.trim()) return;

    startTransition(async () => {
      try {
        await postData(data);
        setData("");
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add New Task"
        value={data}
        onChange={(e) => setData(e.target.value)}
        disabled={isPending}
      />
      <Button
        type="submit"
        className="w-fit"
        variant="outline"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
