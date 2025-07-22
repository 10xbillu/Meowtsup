import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";
import { useFormValidation } from "@/hooks/useFormValidation";
import { LoginSchema } from "@/types/auth";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const { login } = useAuth();
  const { errors, validate } = useFormValidation(LoginSchema);
  const [formData, setFormData] = useState({
    email: "gaurav@gaurav.com",
    password: "gaurav",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = validate(formData);
    if (data) login(formData);
  };
  useEffect(() => {
    {
      errors.length > 0 && toast(errors[0].error);
    }
  }, [errors]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-neutral-800 rounded-3xl px-5 pt-5 pb-3">
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <div>
            <Input
              name="email"
              label={<Mail size={16} />}
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <Input
            name="password"
            label={<Lock size={16} />}
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" className="mt-2" value="Login" />
        </form>
        <p className="text-center mt-3 text-base">
          Don't have an account?{" "}
          <Link className="text-fuchsia-400" to={"/auth/register"}>
            Signup
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginForm;
