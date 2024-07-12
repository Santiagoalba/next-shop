import { Sidebar } from "../components/ui/Sidebar";
import { TopMenu } from "../components/ui/TopMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className=" p-6 m-4 bg-white rounded-md">{children}</div>
      </div>
    </>
  );
}
