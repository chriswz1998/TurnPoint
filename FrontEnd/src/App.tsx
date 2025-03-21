import { useState } from "react";
import { AuthenticationPage } from "./components/AuthenticationPage";
import { fileNames } from "./components/upload-file"; // Importar fileName from UploadFile
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadFile from "@/components/upload-file.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import Reports from "./components/reports.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "false"
  );

  if (!isAuthenticated) {
    return <AuthenticationPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <SidebarProvider>
      <div className="relative h-screen w-full">
        {/* Sidebar */}
        <AppSidebar fileName={fileNames[fileNames.length - 1]} />

        {/* Main content */}
        <main className="absolute inset-0 flex items-center justify-center p-4 bg-gray-100">
          {/* Tabs Section */}
          <Tabs
            defaultValue="upload"
            className="w-full max-w-screen-lg mx-auto flex flex-col items-center"
          >
            {/* Cuadro para los botones de los tabs */}
            <div className="bg-white py-2 px-4 rounded-lg shadow-md w-full flex justify-center">
              <TabsList className="flex gap-[5%] sm:gap-[8%] md:gap-[30%] justify-center w-full">
                <TabsTrigger
                  value="upload"
                  className="px-4 sm:px-6 py-1 sm:py-2 w-[30%] sm:w-[80%] hover:bg-[#4f6bcd] hover:text-white transition-colors rounded-md"
                >
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="px-4 sm:px-6 py-1 sm:py-2 w-[30%] sm:w-[80%] hover:bg-[#4f6bcd] hover:text-white transition-colors rounded-md"
                >
                  Reports
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Cuadro para el contenido de los tabs */}
            <TabsContent value="upload" className="w-full flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg flex flex-col items-center">
                <UploadFile />
              </div>
            </TabsContent>
            <TabsContent
              value="reports"
              className="w-full flex justify-center overflow-auto max-h-[calc(100vh-150px)]"
            >
              {/* Ajusta la altura máxima de la sección de reports */}
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg flex flex-col items-center">
                <Reports />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;