import { Suspense } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
export default function ContentLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className="flex fixed w-full h-full top-[64px]">
        <Sidebar></Sidebar>
        <div className="p-5 md:pr-5 sm:pr-5 border-t-4 lg:border-4 border-slate-800 w-full h-full lg:rounded-tl-[50px] z-10 sm:-z-0 pr-0">
          {/* <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}> */}
            {children}
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
}
