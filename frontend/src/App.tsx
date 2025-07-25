import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";

import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CreatePage from "@/pages/CreatePage";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("colorPalette.100", "colorPalette.900")}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
