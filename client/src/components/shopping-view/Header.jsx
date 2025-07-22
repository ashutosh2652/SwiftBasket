import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderShoppingItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { AvatarFallback } from "../ui/avatar";
import { logoutUser } from "../../store/auth-slice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CartWrapper from "./cart-wrapper";
import { fetchCartItems } from "../../store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchparams, setsearchparams] = useSearchParams();
  function handlenavigate(navigateitem) {
    sessionStorage.removeItem("filter");
    const filterItem = {
      Category: [],
      Brand: [],
    };
    if (
      navigateitem.id !== "home" &&
      navigateitem.id !== "product" &&
      navigateitem.id !== "search"
    ) {
      filterItem["Category"] = [navigateitem.id];
    }
    sessionStorage.setItem("filter", JSON.stringify(filterItem));
    location.pathname.includes("list") && filterItem["Category"].length > 0
      ? setsearchparams(new URLSearchParams(`?Category=${navigateitem.id}`))
      : navigate(navigateitem.path);
    // window.location.reload();
  }
  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-4 lg:mb-0">
      {shoppingViewHeaderShoppingItems.map((item) => (
        <Label
          key={item.id}
          onClick={() => handlenavigate(item)}
          className="relative inline-block text-lg lg:text-sm font-medium text-gray-300
             hover:text-white transition-colors cursor-pointer px-4 lg:px-1 py-1
             rounded-md lg:rounded-none lg:hover:bg-gradient-to-r lg:hover:from-purple-900/30 lg:hover:to-pink-900/30 lg:py-0

             after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
             after:w-full after:bg-gradient-to-r after:from-purple-400 after:to-pink-500
             after:transform after:scale-x-0 hover:after:scale-x-100
             after:transition-transform after:duration-500 after:ease-in-out
             after:origin-left after:mx-3 after:lg:mx-0"
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function RightHeaderContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [opencardsheet, setopencardsheet] = useState(false);
  const { cartItems } = useSelector((state) => state.ShoppingCart);

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  useEffect(() => {
    if (location.pathname === "/shop/payment-success") {
      dispatch(fetchCartItems(user?.id));
    }
  }, [location.pathname]);
  function handleLogout() {
    dispatch(logoutUser())
      .then(() => {
        toast.success("Logged Out Successfully!", {
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #4c1d95",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message, {
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #dc2626",
          },
        });
      });
  }

  return (
    <div className="flex flex-row lg:flex-row lg:items-center gap-4 h-full">
      <Sheet open={opencardsheet} onOpenChange={() => setopencardsheet(false)}>
        <Button
          variant="ghost"
          size="lg:icon"
          className="relative group lg:bg-black bg-white text-black lg:text-white hover:bg-gray-300 lg:hover:bg-purple-900/30 cursor-pointer h-10 w-30 lg:h-8 lg:w-15 rounded-lg overflow-hidden"
          onClick={() => {
            setopencardsheet(true);
          }}
        >
          <ShoppingCart className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span className="sr-only">User Cart</span>
          <span className="absolute -right-1 -top-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems && cartItems.items && cartItems.items.length}
          </span>
        </Button>
        <CartWrapper
          cartItems={cartItems}
          setopencardsheet={setopencardsheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="hover:bg-gray-300 hover:lg:bg-purple-900/30 cursor-pointer flex items-center justify-center w-full bg-white lg:bg-black text-black lg:text-white h-10 max-w-35 lg:h-8 lg:w-15 rounded-lg lg:rounded-lg py-1 lg:py-0 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <AvatarFallback className="h-8 w-8 cursor-pointer rounded-full border-2 lg:border-purple-400 border-pink-500 bg-transparent lg:text-white text-black flex items-center justify-center text-sm font-extrabold bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-56 bg-gray-900 mr-5 text-white mt-3 flex flex-col rounded-lg mx-2 border border-gray-700 shadow-xl shadow-purple-900/20 overflow-hidden"
        >
          <DropdownMenuLabel className="px-4 py-3 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
            <span className="text-sm font-normal text-gray-300">
              Logged in as
            </span>
            <div className="text-white font-medium">{user?.userName}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-purple-500 to-pink-500 h-[1px] border-0" />
          <DropdownMenuItem
            className="cursor-pointer text-white focus:bg-gray-800 hover:bg-gray-800/50 h-full px-4 py-3 transition-colors"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog className="h-5 w-5 mr-3 text-purple-400" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gradient-to-r from-purple-500 to-pink-500 h-[1px] border-0" />
          <DropdownMenuItem
            className="cursor-pointer text-white focus:bg-gray-800 hover:bg-gray-800/50 h-full px-4 py-3 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3 text-pink-400" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-gray-800 bg-black/95 backdrop-blur-sm mx-auto">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/shop/home" className="flex items-center gap-2 group">
          <HousePlug className="h-6 w-6 text-purple-400 group-hover:text-pink-400 transition-colors" />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Ecommerce
          </span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden bg-black hover:bg-purple-900/30 text-white cursor-pointer rounded-lg"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu Bar</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="max-w-xs w-full px-6 py-15 bg-gray-900 border-r border-gray-800"
          >
            <div className="h-full flex flex-col justify-between">
              <MenuItems />
              <div className="mt-auto pb-8">
                <RightHeaderContent />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <RightHeaderContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
