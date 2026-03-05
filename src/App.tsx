import "@/styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/organisms/Header.tsx";
import Footer from "../src/components/organisms/Footer.tsx";
import Home from "./pages/Home.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import SessionPage from "./pages/SessionPage.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/join/:code" element={<JoinPage />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/session/:sessionId" element={<SessionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
