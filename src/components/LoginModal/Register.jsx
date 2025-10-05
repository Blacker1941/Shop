import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next"; 

export default function Register() {
  const { t } = useTranslation(); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let errs = {};

    if (!form.name.trim()) errs.name = t("register.nameRequired");

    if (!form.email) {
      errs.email = t("register.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = t("register.emailInvalid");
    }

    if (!form.password) {
      errs.password = t("register.passwordRequired");
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        form.password
      )
    ) {
      errs.password = t("register.passwordWeak");
    }

    if (!form.confirmPassword) {
      errs.confirmPassword = t("register.confirmPasswordRequired");
    } else if (form.confirmPassword !== form.password) {
      errs.confirmPassword = t("register.passwordMismatch");
    }

    return errs;
  };

  const handleRegister = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (storedUsers.some((u) => u.email === form.email)) {
        toast.error(t("register.emailExists"));
        setLoading(false);
        return;
      }

      const hashedPassword = CryptoJS.SHA256(form.password).toString();

      const newUser = {
        name: form.name,
        email: form.email,
        password: hashedPassword
      };

      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      toast.success(t("register.success"));

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="register-page">
      <h2>{t("register.title")}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t("register.name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <input
          type="email"
          placeholder={t("register.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("register.password")}
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

      <div className="mb-4">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder={t("register.confirmPassword")}
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="eye"
        >
          {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
        {errors.confirmPassword && <p className="text-sm">{errors.confirmPassword}</p>}
      </div>

      <button onClick={handleRegister} disabled={loading}>
        {loading ? t("register.registering") : t("register.registerButton")}
      </button>

      <p>
        {t("register.alreadyRegistered")}{" "}
        <Link to="/login">{t("register.login")}</Link>
      </p>

      <ToastContainer position="top-center" />
    </div>
  );
}
