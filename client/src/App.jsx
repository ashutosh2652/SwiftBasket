import { lazy, Suspense, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/Layout";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import AdminLayout from "./components/admin-view/Layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import PageNotFound from "./not_found/index.jsx";
import CheckAuth from "./components/common/check-auth.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";
import ShoppingOrderReturn from "./pages/shopping-view/OrderReturn.jsx";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess.jsx";
import SearchProducts from "./pages/shopping-view/search.jsx";
import UnauthPage from "./pages/unauth_page/unauth.jsx";
const AdminOrder = lazy(() => import("./pages/admin-view/orders.jsx"));
const AdminProducts = lazy(() => import("./pages/admin-view/products.jsx"));
const ShopLayout = lazy(() => import("./components/shopping-view/Layout.jsx"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home.jsx"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing.jsx"));
const ShoppingCheckout = lazy(() =>
  import("./pages/shopping-view/checkout.jsx")
);
const UserAccount = lazy(() => import("./pages/shopping-view/account.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));

function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));
  useEffect(() => {
    dispatch(checkAuth(token));
  }, [dispatch]);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  if (isLoading)
    return (
      <div className=" flex flex-col space-y-2 overflow-hidden h-screen p-1">
        <Skeleton className="min-h-16 w-full rounded" />
        <div className="flex-1 min-h-[1500px] overflow-hidden">
          <Skeleton className="w-full h-full rounded" />
        </div>
      </div>
    );
  return (
    <div className="flex flex-col overflow-hidden bg-black text-white">
      <Routes>
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
          errorElement={<ErrorPage />}
        >
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
          errorElement={<ErrorPage />}
        >
          <Route
            path="order"
            element={
              <Suspense fallback={<Loading />}>
                <AdminOrder />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<Loading />}>
                <AdminProducts />
              </Suspense>
            }
          />
          <Route
            index
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="features"
            element={
              <Suspense fallback={<Loading />}>
                <AdminFeatures />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
          errorElement={<ErrorPage />}
        >
          <Route path="" element={<Navigate to="/shop/home" replace />} />
          <Route
            path="home"
            element={
              <Suspense fallback={<Loading />}>
                <ShoppingHome />
              </Suspense>
            }
          />
          <Route
            path="list"
            element={
              <Suspense fallback={<Loading />}>
                <ShoppingListing />
              </Suspense>
            }
          />
          <Route
            path="checkout"
            element={
              <Suspense fallback={<Loading />}>
                <ShoppingCheckout />
              </Suspense>
            }
          />
          <Route
            path="account"
            element={
              <Suspense fallback={<Loading />}>
                <UserAccount />
              </Suspense>
            }
          />
          <Route
            path="paypal-return"
            element={
              <Suspense fallback={<Loading />}>
                <ShoppingOrderReturn />
              </Suspense>
            }
          />
          <Route
            path="payment-success"
            element={
              <Suspense fallback={<Loading />}>
                <PaymentSuccess />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<Loading />}>
                <SearchProducts />
              </Suspense>
            }
          />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App;
