

import { Routes, Route,  } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm"
import ChatRoom from "./pages/ChatRoom";
import NotFound from "./pages/NotFound";


function App() {

  
  return (
    <>
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
