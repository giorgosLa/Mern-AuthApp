import { Lock, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { isLoading, error, resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== password1) {
      alert("Password is not the same!");
      return;
    }
    await resetPassword(token, password);
    navigate("/login");
    toast.success("Your Password has changed!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50  rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        <form onSubmit={handleReset}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm new Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />

          <div className=" mb-6">
            <p className="text-red-500 text-sm mb-4">{error}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 text-center animate-spin mx-auto " />
            ) : (
              "Reset Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default ResetPasswordPage;
