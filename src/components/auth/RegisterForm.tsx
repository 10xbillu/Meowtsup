import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Link, useNavigate } from "react-router";
import { RegisterSchema } from "@/types/auth";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (data) => {
    registerUser(data);
    toast.success("Welcome!");
    navigate("/app/chat");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-neutral-800 rounded-3xl px-5 pt-5 pb-3">
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="username"
            label={<User size={16} />}
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <Input
            id="email"
            label={<Mail size={16} />}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Input
            id="password"
            label={<Lock size={16} />}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Button type="submit" className="mt-2" value="Login" />
        </form>
        <p className="text-center mt-3 text-base">
          Have an account?{" "}
          <Link className="text-fuchsia-400" to={"/auth/login"}>
            Login
          </Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
}

export default RegisterForm;
