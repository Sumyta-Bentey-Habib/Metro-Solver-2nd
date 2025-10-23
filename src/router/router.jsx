import { createBrowserRouter } from "react-router";
import Home from "../pages/Dashboard";
import EmployeeDirectory from "../pages/EmployeeDirectory";
import HomeLayout from "../layouts/HomeLayout";
import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";

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
      {
        path: "/calendar",
        element:<Calendar></Calendar>
      }
    ],
  },
]);
export default router;
