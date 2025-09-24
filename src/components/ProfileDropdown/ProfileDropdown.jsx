import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaSignOutAlt, FaTrash } from "react-icons/fa";
import "../../css/components/profileDropdown.css";

export default function ProfileModal({ onClose }) {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("view"); // view | edit | delete | logout
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setMode("view");
    onClose();
  };

  const handleDelete = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setMode("view");
    onClose();
  };

  // وقتی کاربر عکس انتخاب می‌کنه
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // پیش‌نمایش
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
      avatar: preview || user.avatar,
    };
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMode("view");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="profile-dropdown relative"
          initial={{ scale: 0.9, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: -30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!user ? (
            <div className="text-center">
              <p className="text-lg mb-4">🚪 شما وارد نشدید</p>
              <button onClick={() => setMode("login")} className="btn-primary">
                ورود 🔑
              </button>
            </div>
          ) : (
            <>
              {mode === "view" && (
                <>
                  {/* Header */}
                  <div className="profile-header">
                    <img
                      src={
                        user.avatar ||
                        "https://api.dicebear.com/9.x/avataaars/svg?seed=default"
                      }
                      alt="avatar"
                      className="avatar"
                    />
                    <div>
                      <p className="font-bold">{user.name} ✨</p>
                      <p className="email">{user.email}</p>
                      {user.role && (
                        <p className="text-xs text-yellow-500">
                          👑 نقش: {user.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${user.progress || 40}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Dates */}
                  {user.joinDate && (
                    <p className="text-sm mb-1">
                      📅 تاریخ عضویت:{" "}
                      {new Date(user.joinDate).toLocaleDateString("fa-IR")}
                    </p>
                  )}
                  {user.lastLogin && (
                    <p className="last-login">
                      ⏰ آخرین ورود:{" "}
                      {new Date(user.lastLogin).toLocaleString("fa-IR")}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="profile-actions">
                    <button
                      onClick={() => setMode("edit")}
                      className="btn-primary"
                    >
                      <FaEdit /> ویرایش پروفایل
                    </button>
                    <button
                      onClick={() => setMode("logout")}
                      className="btn-secondary"
                    >
                      <FaSignOutAlt /> خروج از حساب
                    </button>
                    <button
                      onClick={() => setMode("delete")}
                      className="btn-danger"
                    >
                      <FaTrash /> حذف حساب
                    </button>
                  </div>
                </>
              )}

              {mode === "edit" && (
                <div className="text-center">
                  <p className="mb-3">📝 ویرایش پروفایل</p>

                  {/* انتخاب عکس */}
                  <div className="mb-3">
                    <img
                      src={
                        preview ||
                        user.avatar ||
                        "https://api.dicebear.com/9.x/avataaars/svg?seed=default"
                      }
                      alt="preview"
                      className="avatar mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>

                  <input
                    id="editName"
                    type="text"
                    defaultValue={user.name}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                  />
                  <input
                    id="editEmail"
                    type="email"
                    defaultValue={user.email}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("view")}
                      className="btn-secondary flex-1"
                    >
                      ❌ لغو
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex-1"
                    >
                      💾 ذخیره
                    </button>
                  </div>
                </div>
              )}

              {mode === "logout" && (
                <div className="text-center">
                  <p className="mb-3">⚠️ می‌خواهید خارج شوید؟</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("view")}
                      className="btn-secondary flex-1"
                    >
                      ❌ خیر
                    </button>
                    <button
                      onClick={handleLogout}
                      className="btn-primary flex-1"
                    >
                      ✅ بله
                    </button>
                  </div>
                </div>
              )}

              {mode === "delete" && (
                <div className="text-center">
                  <p className="mb-3">🔥 مطمئنید می‌خواهید حساب خود را حذف کنید؟</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("view")}
                      className="btn-secondary flex-1"
                    >
                      ❌ لغو
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn-danger flex-1"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
