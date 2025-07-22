import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

function ShopLayout() {
  return (
    <>
      <div className="flex flex-col flex-1 overflow-hidden bg-black text-white">
        <ShoppingHeader />
        <main className="flex flex-col w-full pt-16">
          {/* Common Main */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
export default ShopLayout;
