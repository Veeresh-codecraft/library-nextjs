
import TopNav from "@/components/ui/dashboard/topNav";
  
export const experimental_ppr = true;
export default  function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-full flex-col max-w-full  md:overflow-hidden">
      <div className=" flex-row ">
              {<TopNav />}
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
