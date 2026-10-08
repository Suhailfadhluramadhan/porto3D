import { HomeContent } from "./HomeContent.jsx";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0e27]  text-slate-200">
      <div className="w-full ">
        <HomeContent />
      </div>
    </div>
  );
}