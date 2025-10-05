import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/components/loginModal.css";
import { useTranslation } from "react-i18next"; 

export default function Login() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let errs = {};
    if (!form.email) errs.email = t("login.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = t("login.emailInvalid");
    if (!form.password) errs.password = t("login.passwordRequired");
    return errs;
  };

  const handleLogin = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      const hashedPassword = CryptoJS.SHA256(form.password).toString();

      const foundUser = storedUsers.find(
        (u) => u.email === form.email && u.password === hashedPassword
      );

      if (!foundUser) {
        toast.error(t("login.wrongCredentials"));
        setLoading(false);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));

      toast.success(t("login.welcome", { name: foundUser.name }));

      setForm({ email: "", password: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      <h2>{t("login.title")}</h2>

      <div className="mb-4">
        <input
          type="email"
          placeholder={t("login.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("login.password")}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="eye"
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
        {errors.password && <p className="text-sm">{errors.password}</p>}
      </div>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? t("login.loggingIn") : t("login.loginButton")}
      </button>

      <p>
        {t("login.noAccount")} <Link to="/register">{t("login.register")}</Link>
      </p>

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
}
