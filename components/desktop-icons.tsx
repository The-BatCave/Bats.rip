"use client"

export default function DesktopIcons({
  onFolderOpen,
  onSettingsOpen,
  onDirectoryOpen,
}: {
  onFolderOpen: (folder: string) => void
  onSettingsOpen: () => void
  onDirectoryOpen: () => void
}) {
  return (
    <div className="desktop-icons p-5 grid grid-cols-[repeat(auto-fill,80px)] gap-5">
      <div
        className="icon flex flex-col items-center text-white text-center cursor-pointer text-shadow-md"
        data-folder="documents"
        onClick={() => onFolderOpen("documents")}
      >
        <div className="icon-image w-[50px] h-[50px] bg-[rgba(68,68,68,0.7)] rounded mb-1 flex items-center justify-center backdrop-blur">
          📁
        </div>
        <div className="icon-text text-xs text-shadow-md">Documents</div>
      </div>

      <div
        className="icon flex flex-col items-center text-white text-center cursor-pointer text-shadow-md"
        data-folder="pictures"
        onClick={() => onFolderOpen("pictures")}
      >
        <div className="icon-image w-[50px] h-[50px] bg-[rgba(68,68,68,0.7)] rounded mb-1 flex items-center justify-center backdrop-blur">
          📁
        </div>
        <div className="icon-text text-xs text-shadow-md">Pictures</div>
      </div>

      <div
        className="icon flex flex-col items-center text-white text-center cursor-pointer text-shadow-md"
        id="directoryIcon"
        onClick={onDirectoryOpen}
      >
        <div className="icon-image w-[50px] h-[50px] bg-[rgba(68,68,68,0.7)] rounded mb-1 flex items-center justify-center backdrop-blur">
          🗂️
        </div>
        <div className="icon-text text-xs text-shadow-md">Directory</div>
      </div>

      <div
        className="icon flex flex-col items-center text-white text-center cursor-pointer text-shadow-md"
        id="settingsIcon"
        onClick={onSettingsOpen}
      >
        <div className="icon-image w-[50px] h-[50px] bg-[rgba(68,68,68,0.7)] rounded mb-1 flex items-center justify-center backdrop-blur">
          ⚙️
        </div>
        <div className="icon-text text-xs text-shadow-md">Settings</div>
      </div>
    </div>
  )
}
