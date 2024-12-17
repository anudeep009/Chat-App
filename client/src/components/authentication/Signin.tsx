import axios from "axios";
import React, { useState, useCallback, useMemo, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();

  const validateForm = useCallback((): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    setFormError("");
    return true;
  }, [formData.email]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/profile");
        }
      } catch (error: any) {
        console.error("Signin error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during sign-in. Please try again.";
        setFormError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  const buttonClasses = useMemo(
    () =>
      `w-full py-2 px-4 font-medium text-white rounded ${
        isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
      }`,
    [isLoading]
  );

  return (
    <div className="bg-[#0b0c14] mt-[80px] min-h-[670px]">
      <div className="mx-auto max-w-[350px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl text-white font-bold">Sign In</h1>
          <p className="text-white">
            Not a User?{" "}
            <Link to="/auth/signup" className="text-white underline">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded"
              />
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-white block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              className={buttonClasses}
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin mr-2 h-4 w-4 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0115.925 2.105A6 6 0 0012 22a6 6 0 000-12c-1.21 0-2.34.391-3.236 1.05A8 8 0 014 12z"
                  />
                </svg>
              ) : null}
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
