import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import TutorEditProfile from "./pages/tutoredit";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tutoredit" element={<TutorEditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
