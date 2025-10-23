import { createBrowserRouter } from "react-router";
import Home from "../pages/Dashboard";
import EmployeeDirectory from "../components/EmployeeDirectory";
import HomeLayout from "../layouts/HomeLayout";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/employees",
        element: <EmployeeDirectory></EmployeeDirectory>,
      },
    ],
  },
]);
export default router;
