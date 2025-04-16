"use client"

import { useUser } from "@/context/user-context"

export default function SocialButtons() {
  const { currentUser } = useUser()

  return (
    <div className="social-buttons-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5 z-10">
      {currentUser.twitterUrl && (
        <a
          href={currentUser.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button w-[60px] h-[60px] rounded-full bg-[rgba(40,40,40,0.8)] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg backdrop-blur border border-white/10 relative hover:translate-y-[-5px] hover:shadow-xl hover:bg-[rgba(60,60,60,0.8)]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            className="social-icon w-[30px] h-[30px] object-contain"
            alt="Twitter"
          />
          <div className="social-tooltip absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white py-1 px-2.5 rounded text-xs opacity-0 transition-[opacity,bottom] duration-200 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:bottom-[-35px]">
            Twitter
          </div>
        </a>
      )}

      {currentUser.twitchUrl && (
        <a
          href={currentUser.twitchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button w-[60px] h-[60px] rounded-full bg-[rgba(40,40,40,0.8)] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg backdrop-blur border border-white/10 relative hover:translate-y-[-5px] hover:shadow-xl hover:bg-[rgba(60,60,60,0.8)]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968819.png"
            className="social-icon w-[30px] h-[30px] object-contain"
            alt="Twitch"
          />
          <div className="social-tooltip absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white py-1 px-2.5 rounded text-xs opacity-0 transition-[opacity,bottom] duration-200 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:bottom-[-35px]">
            Twitch
          </div>
        </a>
      )}

      {currentUser.githubUrl && (
        <a
          href={currentUser.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button w-[60px] h-[60px] rounded-full bg-[rgba(40,40,40,0.8)] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg backdrop-blur border border-white/10 relative hover:translate-y-[-5px] hover:shadow-xl hover:bg-[rgba(60,60,60,0.8)]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
            className="social-icon w-[30px] h-[30px] object-contain"
            alt="GitHub"
          />
          <div className="social-tooltip absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white py-1 px-2.5 rounded text-xs opacity-0 transition-[opacity,bottom] duration-200 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:bottom-[-35px]">
            GitHub
          </div>
        </a>
      )}

      {currentUser.steamUrl && (
        <a
          href={currentUser.steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-button w-[60px] h-[60px] rounded-full bg-[rgba(40,40,40,0.8)] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg backdrop-blur border border-white/10 relative hover:translate-y-[-5px] hover:shadow-xl hover:bg-[rgba(60,60,60,0.8)]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670382.png"
            className="social-icon w-[30px] h-[30px] object-contain"
            alt="Steam"
          />
          <div className="social-tooltip absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white py-1 px-2.5 rounded text-xs opacity-0 transition-[opacity,bottom] duration-200 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:bottom-[-35px]">
            Steam
          </div>
        </a>
      )}
    </div>
  )
}
