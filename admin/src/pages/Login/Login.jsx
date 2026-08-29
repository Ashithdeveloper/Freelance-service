import React, { useState } from "react";
import userLogin from "../../../APIs/user";
import useAuthStore from "../../../Zustand/user.store";
import { Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, Code2 } from "lucide-react";
import confetti from "canvas-confetti";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorMsg("");

    try {
      const res = await userLogin(username, password);
      useAuthStore.setState({ user: res.user, token: res.token });
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Invalid username or password. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative cyber-grid">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card Header Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-3">
            <Code2 className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            A4 <span className="text-gradient">TechSentinels</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">
            Administration Control Center
          </p>
        </div>

        {/* Login Glass Panel */}
        <div className="p-8 rounded-3xl glass-panel-glow border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider mb-6">
            <ShieldCheck size={16} />
            <span>Secure Authentication</span>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <span className="font-semibold">Error:</span> {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  required
                  placeholder="Enter administrator username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/30 transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loginLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Access Control Panel</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security badge */}
        <p className="text-center text-[11px] text-gray-500 mt-6 flex items-center justify-center gap-1.5">
          <Lock size={12} />
          <span>Encrypted Session • Authorized Personnel Only</span>
        </p>
      </div>
    </div>
  );
};

export default Login;