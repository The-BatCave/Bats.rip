"use client"

import { useUser } from "@/context/user-context"
import { useAudio } from "@/context/audio-context"

interface AppIconsProps {
  onBackgroundChange: (background: string) => void
}

export default function AppIcons({ onBackgroundChange }: AppIconsProps) {
  const { userProfiles } = useUser()
  const { showNotification } = useAudio()

  const handleIconClick = (bgUrl: string, appName: string) => {
    onBackgroundChange(bgUrl)
    showNotification("Background Changed", `Background changed to ${appName}`, "🖼️")
  }

  const appIcons = [
    { id: "batman", bg: "/Photos/Default-Batman.jpg", image: "/Photos/app1.jpg", text: "Batman" },
    { id: "joker", bg: "/Photos/badbih.png", image: "/Photos/app2.jpg", text: "Joker" },
    { id: "forest", bg: "/Photos/Forest.png", image: "/Photos/app3.jpg", text: "Forest" },
    { id: "gotham", bg: "/Photos/batman4.jpg", image: "/Photos/app4.jpg", text: "Gotham" },
    { id: "randal", bg: "/Photos/randal.jpg", image: "/Photos/app5.jpg", text: "Randal" },
    { id: "batmobile", bg: "/Photos/fynshi.jpg", image: "/Photos/app6.jpg", text: "Batmobile" },
    { id: "tripout", bg: "/Photos/n333mo-tripout.gif", image: "/Photos/app7.jpg", text: "Tripout" },
    { id: "zebra", bg: "/Photos/zebra.png", image: "/Photos/app8.jpg", text: "Zebra" },
    { id: "n333mo", bg: "/Photos/N333MO.jpg", image: "/Photos/app9.jpg", text: "N333MO" },
    { id: "losSave", bg: "/Photos/LOSSAVEUS.png", image: "/Photos/app10.jpg", text: "Los Save" },
    { id: "blatt", bg: "/Photos/Blattt.jpg", image: "/Photos/app11.jpg", text: "Blatt" },
  ]

  return (
    <div className="app-icons-container flex flex-wrap justify-start p-5 gap-4">
      {appIcons.map((icon) => (
        <div
          key={icon.id}
          className="app-icon w-[70px] flex flex-col items-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 relative"
          data-bg={icon.bg}
          onClick={() => handleIconClick(icon.bg, icon.text)}
        >
          <div
            className="app-icon-image w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white/50 shadow-lg mb-2 bg-cover bg-center transition-all duration-300 ease-in-out hover:border-white/80 hover:shadow-xl relative"
            style={{ backgroundImage: `url(${icon.image})` }}
          />
          <div className="app-icon-text text-white text-xs text-center text-shadow-md max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap">
            {icon.text}
          </div>
        </div>
      ))}
    </div>
  )
}
