import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Loading";
import PropTypes from "prop-types";
function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();
  //loading states
  if (isAuthenticated === undefined || user === undefined) {
    <Loading />;
  }
  if (location.pathname === "/") {
    if (!isAuthenticated) <Navigate to="/auth/login" replace />;
    else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/shop/home" replace />;
      }
    }
  }

  // console.log("Isauthenticated!", isAuthenticated);
  // console.log("User", user);

  if (
    !isAuthenticated &&
    !(
      location?.pathname?.includes("/login") ||
      location?.pathname?.includes("/register")
    )
  ) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{
          from: location.pathname, //stores original path
          reason: "unauthorized",
        }}
      />
    );
    //state->preserve the current state which could be used in login component to navigate
    // to that page which user demands without login
    // this can be accessed with the location.state ->this will return this object
  }
  if (
    isAuthenticated &&
    (location?.pathname?.includes("/login") ||
      location?.pathname?.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />; //replace->it replace the current state of login to new state dashboard
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }
  return <>{children}</>;
}

//this proptypes is used to check the type validation used while development
CheckAuth.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
export default CheckAuth;
