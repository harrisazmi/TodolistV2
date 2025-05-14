import DataDisplayWrapper from "@/components/DataDisplay";
import SubmitForm from "@/components/FormSubmission";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  createClient,
  deleteData,
  deleteDataBuy,
  postData,
  postDataBuy,
} from "./actions/supabase";

export const runtime = "edge";

export default async function HomePage() {
  const supabase = await createClient();

  const [todosResult, todosBuyResult] = await Promise.all([
    supabase.from("Todos").select(),
    supabase.from("todobuy").select(),
  ]);

  const { data: todos, error: errorTodo } = todosResult;
  const { data: todosBuy, error: errorBuy } = todosBuyResult;

  if (errorTodo) {
    return <pre>Error: {errorTodo.message}</pre>;
  }
  if (errorBuy) {
    return <pre>Error: {errorBuy.message}</pre>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-6">
      <Card className="min-w-[350px] w-fit">
        <CardHeader>
          <CardTitle className="text-3xl">To Do List</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <SubmitForm postData={postData}></SubmitForm>
          <DataDisplayWrapper
            tasks={todos}
            tableFrom="Todos"
            deleteData={deleteData}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[350px] w-fit">
        <CardHeader>
          <CardTitle className="text-3xl">To Buy</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <SubmitForm postData={postDataBuy}></SubmitForm>
          <DataDisplayWrapper
            tasks={todosBuy}
            tableFrom="todobuy"
            deleteData={deleteDataBuy}
          />
        </CardContent>
      </Card>
    </div>
  );
}
