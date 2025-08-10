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
      <div className="animate-pulse bg-gray-600 min-h-screen">
        <header className="bg-white/60 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="h-8 w-32 bg-gray-400 rounded-md"></div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="h-5 w-20 bg-gray-400 rounded-md"></div>
              <div className="h-5 w-20 bg-gray-400 rounded-md"></div>
              <div className="h-5 w-20 bg-gray-400 rounded-md"></div>
              <div className="h-5 w-20 bg-gray-400 rounded-md"></div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-9 w-9 bg-gray-400 rounded-full"></div>
              <div className="h-9 w-9 bg-gray-400 rounded-full"></div>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 mt-8">
          <div className="h-[400px] w-full bg-gray-400 rounded-xl shadow-md"></div>

          <section className="py-16">
            <div className="h-10 w-64 bg-gray-400 rounded-md mx-auto mb-10 shadow-sm"></div>

            <div className="flex justify-center items-center gap-6 flex-wrap">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-50 h-36 bg-gradient-to-br from-gray-400 to-gray-300 rounded-2xl shadow-md"
                ></div>
              ))}
            </div>
          </section>
        </main>
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
