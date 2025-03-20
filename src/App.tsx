import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "@/auth/login.tsx";
import UploadFile from "@/file/upload-file.tsx";

function App() {
    return (
        <Router>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/upload" element={<UploadFile />} />
                </Routes>
                <Toaster />
            </div>
        </Router>
    );
}

export default App;
