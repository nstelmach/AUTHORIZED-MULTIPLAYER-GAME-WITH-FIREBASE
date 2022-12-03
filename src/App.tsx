import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import LoginSignup from "./routes/LoginSignup";
import History from "./routes/History";
import NewGame from "./routes/NewGame";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/r/:roomId"
          element={
            <PrivateRoute>
              <NewGame isPlayerGame={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="computergame"
          element={
            <PrivateRoute>
              <NewGame isPlayerGame={false} />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
