import "@/styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/layout/Header.tsx";
import Footer from "../src/components/layout/Footer.tsx";
import Home from "./pages/Home.tsx";
import SessionPage from "./pages/SessionPage.tsx";

function App() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
				<Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<SessionPage />} />
          </Routes>
        </BrowserRouter>
      </div>
			<Footer />
    </>
  );
}

export default App;
