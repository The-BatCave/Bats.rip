"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useAudio } from "@/context/audio-context"

interface TaskbarProps {
  onStartButtonClick: () => void
  onMusicPlayerClick: () => void
}

export default function Taskbar({ onStartButtonClick, onMusicPlayerClick }: TaskbarProps) {
  const { currentUser, setCurrentUser, userProfiles } = useUser()
  const { currentSong } = useAudio()
  const [time, setTime] = useState("00:00:00")

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(e.target.value)
  }

  return (
    <div className="taskbar opacity-75 absolute bottom-0 w-full h-10 bg-[rgba(34,34,34,0.9)] flex items-center px-4 backdrop-blur-[10px] z-[1000] justify-between">
      <div className="taskbar-left flex items-center">
        <div
          className="start-button bg-[#333] text-white py-1 px-4 rounded mr-4 cursor-pointer transition-colors hover:bg-[#444]"
          id="startButton"
          onClick={onStartButtonClick}
        >
          Start
        </div>

        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1tdXNpYyI+PHBhdGggZD0iTTkgMThWNWwxMi0ydjEzIj48L3BhdGg+PGNpcmNsZSBjeD0iNiIgY3k9IjE4IiByPSIzIj48L3BhdGg+PGNpcmNsZSBjeD0iNiIgY3k9IjE4IiByPSIzIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIxOCIgY3k9IjE2IiByPSIzIj48L2NpcmNsZT48L3N2Zz4="
          alt="Music Player"
          className="w-6 h-6 mr-2.5 cursor-pointer"
          onClick={onMusicPlayerClick}
        />

        <div className="now-playing-text text-white text-sm ml-2.5">
          {currentSong ? `Playing: ${currentSong.title}` : "Playing: None"}
        </div>
      </div>

      <div className="taskbar-right flex items-center gap-4">
        <div className="user-selector">
          <select
            id="taskbarUserSelect"
            className="user-selector-dropdown bg-[rgba(60,60,60,0.8)] text-white border border-white/20 rounded py-1 px-2.5 cursor-pointer"
            value={currentUser.id}
            onChange={handleUserChange}
            style={{
              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              animation: "pulse 2s infinite alternate",
            }}
          >
            {Object.keys(userProfiles).map((userId) => (
              <option key={userId} value={userId}>
                {userProfiles[userId].username}
              </option>
            ))}
          </select>
        </div>

        <div className="desktop-clock text-white text-sm mr-4">{time}</div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 5px rgba(255,255,255,0.3);
          }
          100% {
            box-shadow: 0 0 12px rgba(255,255,255,0.7);
          }
        }
      `}</style>
    </div>
  )
}
