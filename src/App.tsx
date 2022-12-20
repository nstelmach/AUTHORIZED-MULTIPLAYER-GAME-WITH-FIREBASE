import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./routes/Home";
import LoginSignup from "./routes/LoginSignup";
import History from "./routes/History";
import NewGame from "./routes/NewGame";
import ComputerGame from "./routes/ComputerGame";
import Layout from "./components/layouts/Layout";

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
          <Route path="/r/:roomId" element={<NewGame />} />
        </Route>
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
