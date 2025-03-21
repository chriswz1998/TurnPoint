import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react"; // Import useState
import { fileNames } from "./upload-file.tsx";

interface AppSidebarProps {
  fileName: string | null;
}

export function AppSidebar({ fileName }: AppSidebarProps) {
  const [showFiles, setShowFiles] = useState(false); // COntrol state for sshowing the history files

  // Files visibility function
  const toggleFiles = () => {
    setShowFiles(!showFiles); // changes sowfile value
  };

  // Logout function
  const handleLogout = () => {
    // Restart the app - Logout
    window.location.reload();
  };

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <header className="flex items-center justify-between px-4 py-2 mt-14">
          <div className="text-lg font-semibold">Turning Points</div>
        </header>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <div className="pt-10">
          <SidebarGroup>
            <div className="px-4 py-2">
              <div className="mt-2 space-y-6">
                <div className="cursor-pointer hover:text-blue-600">Account</div>
                <div
                  className="cursor-pointer hover:text-blue-600"
                  onClick={toggleFiles} // toggleFiles call on click
                >
                  Files Uploaded
                </div>

                {/* Show liost of files if true */}
                {showFiles && (
                  <ol className="px-4 py-0.2 text-sm text-gray-500">
                    {fileNames.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ol>
                )}
                <div>
                  <a
                    href="https://turningpoints.sharevision.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    ShareVision
                  </a>
                </div>
                <div>
                  <a
                    href="https://turningpoints.ngo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Turningpoints Web
                  </a>
                </div>
                <div
                  className="cursor-pointer hover:text-blue-600"
                  onClick={handleLogout} // handlelogout call on click
                >
                  Log Out
                </div>
              </div>
            </div>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-500">
          &copy; 2025 COSC-224 Project
        </div>
      </SidebarFooter>

      {/* Top left corner circular button */}
      <div className="fixed top-4 left-4 w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full shadow-md z-50">
        <SidebarTrigger className="w-full h-full flex items-center justify-center text-xl">
          ☰
        </SidebarTrigger>
      </div>
    </Sidebar>
  );
}