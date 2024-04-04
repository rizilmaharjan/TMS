import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import TaskLayout from "./layout/TaskLayout";
import PasswordReset from "./pages/PasswordReset";
import Error from "./pages/Error";
import { mainLayoutRoutes } from "./routes";
import { taskLayoutRoutes } from "./routes";
import Private from "./layout/Private";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            {mainLayoutRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            <Route element={<TaskLayout />}>
              {taskLayoutRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>

          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
