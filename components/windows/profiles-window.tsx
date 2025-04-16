"use client"

import DraggableWindow from "@/components/windows/draggable-window"
import { useUser } from "@/context/user-context"
import { useAudio } from "@/context/audio-context"

interface ProfilesWindowProps {
  onClose: () => void
  onProfileSelect: (profileId: string) => void
}

export default function ProfilesWindow({ onClose, onProfileSelect }: ProfilesWindowProps) {
  const { userProfiles, currentUser } = useUser()
  const { showNotification } = useAudio()

  const handleProfileClick = (profileId: string) => {
    onProfileSelect(profileId)
    showNotification("Profile Changed", `Switched to ${userProfiles[profileId].username}'s profile`, "👤")
  }

  return (
    <DraggableWindow
      title="User Profiles"
      onClose={onClose}
      className="window bg-[rgba(51,51,51,0.95)] rounded-lg shadow-lg min-w-[500px] min-h-[400px] backdrop-blur-[10px] text-white z-100"
      defaultPosition={{ x: 250, y: 120 }}
    >
      <div className="window-content p-4 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6 max-h-[500px] overflow-y-auto">
        {Object.entries(userProfiles).map(([profileId, profile]) => (
          <div
            key={profileId}
            className={`profile-icon flex flex-col items-center cursor-pointer p-3 rounded-lg transition-all hover:bg-white/10 hover:transform hover:scale-105 ${
              currentUser.id === profileId ? "bg-white/20 ring-2 ring-white/50" : ""
            }`}
            onClick={() => handleProfileClick(profileId)}
          >
            <div
              className={`profile-avatar w-20 h-20 rounded-full mb-3 overflow-hidden border-2 ${
                currentUser.id === profileId
                  ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.7)] animate-pulse"
                  : "border-white/50"
              }`}
            >
              <img
                src={profile.avatarImageUrl || "/placeholder.svg"}
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="profile-name text-base font-medium mb-1">{profile.username}</div>
            <div className="profile-details text-xs text-gray-300 text-center">
              <div className="mb-1">Background: {profileId}</div>
              <div>Song: {profile.customSong.title}</div>
            </div>
          </div>
        ))}
      </div>
    </DraggableWindow>
  )
}
