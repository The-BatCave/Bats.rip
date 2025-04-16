"use client"
import DraggableWindow from "@/components/windows/draggable-window"

interface DirectoryWindowProps {
  onClose: () => void
  onOpenSubDirectory: (directory: string) => void
}

export default function DirectoryWindow({ onClose, onOpenSubDirectory }: DirectoryWindowProps) {
  const mainDirectories = [
    { name: "Photos", icon: "📸", key: "photos" },
    { name: "Music", icon: "🎵", key: "music" },
    { name: "Profiles", icon: "👤", key: "profiles" },
  ]

  return (
    <DraggableWindow
      title="Main Directory"
      onClose={onClose}
      className="window bg-[rgba(51,51,51,0.95)] rounded-lg shadow-lg min-w-[400px] min-h-[300px] backdrop-blur-[10px] text-white z-100"
      defaultPosition={{ x: 300, y: 100 }}
    >
      <div className="window-content p-4 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 max-h-[400px] overflow-y-auto">
        {mainDirectories.map((dir) => (
          <div
            key={dir.key}
            className="directory-icon flex flex-col items-center cursor-pointer p-2 rounded transition-colors hover:bg-white/10"
            onClick={() => onOpenSubDirectory(dir.key)}
          >
            <div className="directory-icon-image w-16 h-16 mb-2 flex items-center justify-center text-4xl">
              {dir.icon}
            </div>
            <div className="directory-icon-text text-sm text-center font-medium">{dir.name}</div>
          </div>
        ))}
      </div>
    </DraggableWindow>
  )
}
