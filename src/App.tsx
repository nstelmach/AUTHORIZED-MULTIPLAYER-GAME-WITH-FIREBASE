import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import LoginSignup from "./routes/LoginSignup";
import History from "./routes/History";
import NewGame from "./routes/NewGame";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="login"
          element={
            <LoginSignup
              name="Login"
              isCheckbox={true}
              isLogin={true}
              question="Need an account?"
              path="/signup"
              link="SIGN UP"
            />
          }
        />

        <Route
          path="signup"
          element={
            <LoginSignup
              name="Sign Up"
              isCheckbox={false}
              isLogin={false}
              question="Already a user?"
              path="/login"
              link="LOGIN"
            />
          }
        />

        <Route
          path="history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="/r/:roomId" element={<NewGame isPlayerGame={true} />} />
        <Route
          path="computergame"
          element={
            <PrivateRoute>
              <NewGame isPlayerGame={false} />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
