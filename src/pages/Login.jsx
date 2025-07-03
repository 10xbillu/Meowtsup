import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

function Login() {
  const { setUser } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (id) => {
      setUser(id);
      navigate("/chat", {
        replace: true,
      });
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  useEffect(() => {
    setValue("email", "gaurav@gaurav.com");
    setValue("password", "gaurav");
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-sm bg-[#1e293b] p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 bg-[#334155] text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-2 bg-[#334155] text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don’t have an ccount?
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
