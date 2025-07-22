import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { useState } from "react";

function AdminLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="h-screen w-full flex  ">
      {/* Admin Sidebar */}
      <div className="h-full ">
        <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      </div>
      <div className="flex flex-col flex-1 h-full">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AdminLayout;
