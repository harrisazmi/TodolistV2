import DataDisplayWrapper from "@/components/DataDisplay";
import SubmitForm from "@/components/FormSubmission";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import getAllData from "./actions/getData";

export default async function Home() {
  const data = await getAllData();
  const tasks: { _id: string; info: string }[] = await data.json();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-[350px] w-fit">
        <CardHeader>
          <CardTitle className="text-3xl">To Do List</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <SubmitForm></SubmitForm>
          <DataDisplayWrapper tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
