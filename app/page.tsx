import DataDisplayWrapper from "@/components/DataDisplay";
import SubmitForm from "@/components/FormSubmission";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "./actions/supabase";

export default async function TodosPage() {
  const supabase = await createClient();
  const { data: todos, error } = await supabase.from("Todos").select();
  // const channel = supabase
  //   .channel("table-db-changes")
  //   .on(
  //     "postgres_changes",
  //     { event: "*", schema: "public", table: "Todos" },
  //     (payload) => {}
  //   ).subscribe;
  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-[350px] w-fit">
        <CardHeader>
          <CardTitle className="text-3xl">To Do List</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <SubmitForm></SubmitForm>
          <DataDisplayWrapper tasks={todos} />
        </CardContent>
      </Card>
    </div>
  );
}
