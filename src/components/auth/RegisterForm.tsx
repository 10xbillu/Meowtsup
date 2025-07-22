import { useEffect, useState } from "react";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";
import { useFormValidation } from "@/hooks/useFormValidation";
import { RegisterSchema } from "@/types/auth";
import toast, { Toaster } from "react-hot-toast";

function RegisterForm() {
  const { register } = useAuth();
  const { errors, validate } = useFormValidation(RegisterSchema);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = validate(formData);
    if (data) register(formData);

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    {
      errors.length > 0 && toast(errors[0]?.error);
    }
  }, [errors]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-neutral-800 rounded-3xl px-5 pt-5 pb-3">
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <Input
            name="username"
            label={<User size={16} />}
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <Input
            type="email"
            name="email"
            label={<Mail size={16} />}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="password"
            label={<Lock size={16} />}
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" className="mt-2" value="Sign up" />
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
