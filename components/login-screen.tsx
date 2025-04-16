"use client"

import type React from "react"

import { useState } from "react"

interface LoginScreenProps {
  onLogin: (password: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="login-container relative text-white h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="sticky-note absolute top-5 bg-[#ffc] text-black p-4 w-[200px] transform rotate-[-2deg] font-['Comic_Sans_MS',cursive]">
        Password: Batcave
      </div>

      <div className="login-form bg-[#111] p-8 rounded-lg w-[300px] border border-black/20">
        <div className="form-group mb-5">
          <label htmlFor="username" className="block mb-1 text-[#ccc]">
            Username
          </label>
          <input
            type="text"
            id="username"
            value="Bruce Wayne"
            readOnly
            className="w-[92%] p-2.5 bg-[#222] border border-[#444] text-white rounded"
          />
        </div>

        <div className="form-group mb-5">
          <label htmlFor="password" className="block mb-1 text-[#ccc]">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[92%] p-2.5 bg-[#222] border border-[#444] text-white rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-[#333] text-white border-none rounded cursor-pointer transition-colors hover:bg-[#444]"
        >
          Login
        </button>
      </div>

      <style jsx>{`
        .login-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 110%;
          height: 110%;
          background: url('/Photos/Default-Batman.jpg') center/cover;
          filter: blur(15px);
          transform: scale(1.1);
          z-index: -1;
        }
      `}</style>
    </div>
  )
}
