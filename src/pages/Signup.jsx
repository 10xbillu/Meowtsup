import { useForm } from "react-hook-form";
import { signup } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router";

function Signup() {
  const { register, handleSubmit, setValue } = useForm();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (id) => {
      setUser(id);
      navigate("/chat", {
        replace: true,
      });
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <div className="w-full max-w-sm bg-[#1e293b] p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 border border-gray-600 bg-[#334155] text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          <input
            className="px-4 py-2 border border-gray-600 bg-[#334155] text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <input
            className="px-4 py-2 border border-gray-600 bg-[#334155] text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
