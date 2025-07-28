import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Link, useNavigate } from "react-router";
import { LoginSchema } from "@/types/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data) => {
    login(data);
    toast.success("Welcome back!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    navigate("/app/chat");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-neutral-800 rounded-3xl px-5 pt-5 pb-3">
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label={<Mail size={16} />}
            placeholder="Email"
            {...register("email")}
            type="email"
            required
            error={errors.email?.message}
          />
          <Input
            id="password"
            label={<Lock size={16} />}
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            error={errors.password?.message}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-2"
            value="Login"
          />
        </form>
        <p className="text-center mt-3 text-base">
          Don't have an account?{" "}
          <Link className="text-fuchsia-400" to={"/auth/register"}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
