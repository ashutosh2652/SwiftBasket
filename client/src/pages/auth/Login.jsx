import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CommonForm from "../../components/common/form";
import { loginFormControl } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("LoggedIn Successfully!");
      } else {
        toast.error(data.payload.message);
      }
      console.log("Data", data);
    });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 border border-gray-700 backdrop-blur-xl shadow-2xl rounded-2xl p-8"
      >
        <div className="text-center mb-10">
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="data:image/png;base64,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"
              alt="Logo"
              className="mx-auto h-16 w-16 rounded-full"
            />
          </Link>
          <h2 className="text-3xl font-bold mt-4 tracking-wide">
            Login To Account
          </h2>
        </div>
        <CommonForm
          formControls={loginFormControl}
          onSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          buttonText={"SignIn"}
        />
        <motion.p
          className="text-center text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
