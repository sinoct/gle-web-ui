import HistoryPicker from "@/components/HistoryPicker";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

const getDirectories = async () => {
  const res = await fetch("http://localhost:3000/api/get-directories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const directories = await res.text();
  return JSON.parse(directories);
};

export default async function History() {
  const directories = await getDirectories();

  return (
    <div>
      <div className="p-4 text-2xl md:text-4xl flex flex-col items-center justify-center relative">
        History
        <HistoryPicker directories={directories} />
      </div>
    </div>
  );
}
