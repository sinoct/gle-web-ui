import HistoryPicker from "@/components/HistoryPicker";

export default async function History() {
  return (
    <div>
      <div className="p-4 text-2xl md:text-4xl flex flex-col items-center justify-center relative">
        History
        <HistoryPicker />
      </div>
    </div>
  );
}
