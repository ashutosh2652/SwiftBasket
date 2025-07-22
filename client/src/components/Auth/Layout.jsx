import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-gradient bg-gradient-to-br from-purple-800 via-indigo-900 to-black ">
      <div className=" bg-black max-w-4xl w-1/2 shadow-xl rounded-lg flex  flex-col md:flex-row overflow-hidden opacity-70">
        <h2 className="flex justify-center items-center  min-h-[300px] bg-black text-gray-400 font-extrabold size-max text-7xl">
          WELCOME TO ECOMMERCE WEBSITE
        </h2>
      </div>
      <div className="w-1/2">
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
