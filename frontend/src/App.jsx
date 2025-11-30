import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { SearchProvider } from "./contexts/SearchProvider";
import LoginPage from "./pages/LoginPage";
import InsertionPage from "./pages/InsertionPage";
import PokemonListPage from "./pages/PokemonListPage";
import EditPokemonPage from "./pages/EditPokemonPage"; // Import the new EditPokemonPage
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <PokemonListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/insert"
              element={
                <PrivateRoute>
                  <InsertionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id" // New route for EditPokemonPage
              element={
                <PrivateRoute>
                  <EditPokemonPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
