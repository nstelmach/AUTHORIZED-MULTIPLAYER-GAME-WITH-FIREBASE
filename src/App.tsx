import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Home from "./routes/home/Home";
import LoginSignup from "./routes/login-signup/LoginSignup";
import History from "./routes/history/History";
import NewGame from "./routes/game/PlayerGame";
import ComputerGame from "./routes/game/ComputerGame";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
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
            path="computer"
            element={
              <PrivateRoute>
                <ComputerGame />
              </PrivateRoute>
            }
          />
          <Route
            path="/r/:roomId"
            element={
              <PrivateRoute>
                <NewGame />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <LoginSignup
              name="Login"
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
              isLogin={false}
              question="Already a user?"
              path="/login"
              link="LOGIN"
            />
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate to="/" />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
