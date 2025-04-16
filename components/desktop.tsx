"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useAudio } from "@/context/audio-context"
import Taskbar from "@/components/taskbar"
import AppIcons from "@/components/app-icons"
import SocialButtons from "@/components/social-buttons"
import DesktopIcons from "@/components/desktop-icons"
import StartMenu from "@/components/start-menu"
import NotificationCenter from "@/components/notification-center"
import SettingsWindow from "@/components/windows/settings-window"
import DocumentsWindow from "@/components/windows/documents-window"
import PicturesWindow from "@/components/windows/pictures-window"
import MusicPlayer from "@/components/windows/music-player"
import ImageViewer from "@/components/viewers/image-viewer"
import VideoViewer from "@/components/viewers/video-viewer"
import TextEditor from "@/components/editors/text-editor"
import WelcomeOverlay from "@/components/welcome-overlay"
import DirectoryWindow from "@/components/windows/directory-window"
import ProfilesWindow from "@/components/windows/profiles-window"
import PhotosDirectoryWindow from "@/components/windows/photos-directory-window"
import MusicDirectoryWindow from "@/components/windows/music-directory-window"
import UserProfileWindow from "@/components/windows/user-profile-window"
import UserPreferencesWindow from "@/components/windows/user-preferences-window"
import UserFilesWindow from "@/components/windows/user-files-window"

interface DesktopProps {
  onLogout: () => void
}

export default function Desktop({ onLogout }: DesktopProps) {
  const { currentUser, setCurrentUser } = useUser()
  const { showNotification } = useAudio()
  const [background, setBackground] = useState(currentUser.backgroundImage)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [activeWindows, setActiveWindows] = useState<{
    [key: string]: boolean
  }>({
    settings: false,
    documents: false,
    pictures: false,
    music: false,
    imageViewer: false,
    videoViewer: false,
    textEditor: false,
    directory: false,
    profiles: false,
    photosDirectory: false,
    musicDirectory: false,
    userProfile: false,
    userPreferences: false,
    userFiles: false,
  })

  // Window positions for draggable windows
  const [windowPositions, setWindowPositions] = useState<{
    [key: string]: { x: number; y: number }
  }>({})

  // Current file being viewed/edited
  const [currentFile, setCurrentFile] = useState<{
    name: string
    type: string
    content?: string
    url?: string
  } | null>(null)

  useEffect(() => {
    // Show welcome notification
    showNotification("Welcome", `Welcome to ${currentUser.username}'s Desktop`, "👋")

    // Hide welcome overlay after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update background when user changes
  useEffect(() => {
    if (currentUser) {
      // Set background based on user profile
      setBackground(currentUser.backgroundImage)
    }
  }, [currentUser])

  const toggleWindow = (windowName: string, show?: boolean) => {
    setActiveWindows((prev) => ({
      ...prev,
      [windowName]: show !== undefined ? show : !prev[windowName],
    }))

    // If opening a window, bring it to front
    if (show !== false) {
      // Reset all window z-indices
      const windows = document.querySelectorAll(".window, .settings-window, .music-player")
      windows.forEach((win) => {
        ;(win as HTMLElement).style.zIndex = "100"
      })

      // Set the target window to front
      setTimeout(() => {
        const targetWindow = document.querySelector(
          `.${windowName === "settings" ? "settings-window" : windowName === "music" ? "music-player" : "window"}`,
        )
        if (targetWindow) {
          ;(targetWindow as HTMLElement).style.zIndex = "101"
        }
      }, 10)
    }
  }

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground)
  }

  const handleFileOpen = (fileName: string, fileType: string, content?: string, url?: string) => {
    setCurrentFile({
      name: fileName,
      type: fileType,
      content,
      url,
    })

    if (fileType === "image") {
      toggleWindow("imageViewer", true)
    } else if (fileType === "video") {
      toggleWindow("videoViewer", true)
    } else if (fileType === "text") {
      toggleWindow("textEditor", true)
    }
  }

  const handleStartButtonClick = () => {
    setShowStartMenu(!showStartMenu)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    // Close start menu when clicking outside
    if (
      showStartMenu &&
      !(e.target as HTMLElement).closest("#startMenu") &&
      !(e.target as HTMLElement).closest("#startButton")
    ) {
      setShowStartMenu(false)
    }
  }

  const handleOpenSubDirectory = (directory: string) => {
    if (directory === "profiles") {
      toggleWindow("profiles", true)
    } else if (directory === "photos") {
      toggleWindow("photosDirectory", true)
    } else if (directory === "music") {
      toggleWindow("musicDirectory", true)
    }
  }

  const handleProfileSelect = (profileId: string) => {
    setCurrentUser(profileId)
    toggleWindow("profiles", false)
  }

  const handlePhotoSelect = (photoUrl: string, photoName: string) => {
    setBackground(photoUrl)
    showNotification("Background Changed", `Background changed to ${photoName}`, "🖼️")
  }

  return (
    <div
      className="desktop w-full h-full relative overflow-hidden"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}
      onClick={handleClickOutside}
    >
      {showWelcome && <WelcomeOverlay />}

      <AppIcons onBackgroundChange={handleBackgroundChange} />

      <SocialButtons />

      <DesktopIcons
        onFolderOpen={(folder) => toggleWindow(folder, true)}
        onSettingsOpen={() => toggleWindow("settings", true)}
        onDirectoryOpen={() => toggleWindow("directory", true)}
      />

      {showStartMenu && (
        <StartMenu
          onItemClick={(item) => {
            if (item === "power") {
              if (confirm("Are you sure you want to log out?")) {
                onLogout()
              }
            } else if (item === "settings") {
              toggleWindow("settings", true)
            } else if (item === "music") {
              toggleWindow("music", true)
            } else if (item === "directory") {
              toggleWindow("directory", true)
            } else if (item === "userProfile") {
              toggleWindow("userProfile", true)
            } else if (item === "userPreferences") {
              toggleWindow("userPreferences", true)
            } else if (item === "userFiles") {
              toggleWindow("userFiles", true)
            } else {
              toggleWindow(item, true)
            }
            setShowStartMenu(false)
          }}
        />
      )}

      <NotificationCenter />

      {activeWindows.settings && (
        <SettingsWindow
          onClose={() => toggleWindow("settings", false)}
          onBackgroundChange={handleBackgroundChange}
          currentBackground={background}
        />
      )}

      {activeWindows.documents && (
        <DocumentsWindow onClose={() => toggleWindow("documents", false)} onFileOpen={handleFileOpen} />
      )}

      {activeWindows.pictures && (
        <PicturesWindow onClose={() => toggleWindow("pictures", false)} onFileOpen={handleFileOpen} />
      )}

      {activeWindows.music && <MusicPlayer onClose={() => toggleWindow("music", false)} />}

      {activeWindows.directory && (
        <DirectoryWindow onClose={() => toggleWindow("directory", false)} onOpenSubDirectory={handleOpenSubDirectory} />
      )}

      {activeWindows.profiles && (
        <ProfilesWindow onClose={() => toggleWindow("profiles", false)} onProfileSelect={handleProfileSelect} />
      )}

      {activeWindows.photosDirectory && (
        <PhotosDirectoryWindow
          onClose={() => toggleWindow("photosDirectory", false)}
          onPhotoSelect={handlePhotoSelect}
        />
      )}

      {activeWindows.musicDirectory && <MusicDirectoryWindow onClose={() => toggleWindow("musicDirectory", false)} />}

      {activeWindows.userProfile && <UserProfileWindow onClose={() => toggleWindow("userProfile", false)} />}

      {activeWindows.userPreferences && (
        <UserPreferencesWindow onClose={() => toggleWindow("userPreferences", false)} />
      )}

      {activeWindows.userFiles && (
        <UserFilesWindow onClose={() => toggleWindow("userFiles", false)} onFileOpen={handleFileOpen} />
      )}

      {activeWindows.imageViewer && currentFile && currentFile.type === "image" && (
        <ImageViewer
          fileName={currentFile.name}
          imageUrl={currentFile.url || ""}
          onClose={() => toggleWindow("imageViewer", false)}
        />
      )}

      {activeWindows.videoViewer && currentFile && currentFile.type === "video" && (
        <VideoViewer
          fileName={currentFile.name}
          videoUrl={currentFile.url || ""}
          onClose={() => toggleWindow("videoViewer", false)}
        />
      )}

      {activeWindows.textEditor && currentFile && currentFile.type === "text" && (
        <TextEditor
          fileName={currentFile.name}
          content={currentFile.content || ""}
          onClose={() => toggleWindow("textEditor", false)}
          onSave={(content) => {
            showNotification("File Saved", `${currentFile.name} has been saved`, "💾")
            toggleWindow("textEditor", false)
          }}
        />
      )}

      <Taskbar onStartButtonClick={handleStartButtonClick} onMusicPlayerClick={() => toggleWindow("music", true)} />
    </div>
  )
}
