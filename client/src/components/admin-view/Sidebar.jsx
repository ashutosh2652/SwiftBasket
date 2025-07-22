import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icons: <BadgeCheck />,
  },
];
function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuitems) => (
        <NavLink
          key={menuitems.id}
          to={menuitems.path}
          className={({ isActive }) =>
            `flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-pink-500 hover:text-foreground ${
              isActive ? "bg-muted text-background" : ""
            }`
          }
          onClick={() => {
            navigate(menuitems.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {menuitems.icons}
          {menuitems.label}
        </NavLink>
      ))}
    </nav>
  );
}
function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 text-white">
          <div className="flex flex-col h-full bg-black text-white">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 text-white mb-5">
                <ChartNoAxesCombined size={30} />
                <h1
                  className="font-extrabold text-2xl cursor-pointer"
                  onClick={() => {
                    navigate("/admin/dashboard");
                    setOpen(false);
                  }}
                >
                  Admin Panel
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-black p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="font-extrabold text-2xl">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}
export default AdminSidebar;
