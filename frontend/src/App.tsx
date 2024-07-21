import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/:authType" element={<Authentication />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
