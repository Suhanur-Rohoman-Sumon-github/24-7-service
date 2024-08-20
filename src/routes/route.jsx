import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute/PrivateRoute";
import DashboardLaouts from "../layouts/DashboardLaouts";
import ServerCopyUnoficial from "../pages/Dashboard/serverCopyUnoficial/ServerCopyUnoficial";
import Logins from "../pages/LoginAndSinup/login/Logins";
import Sinup from "../pages/LoginAndSinup/sinup/Sinup";
import CreateNid from "../pages/Dashboard/createNid/CreateNids";
import CreateNids from "../componnets/CreateNid";
import Nid from "../componnets/ServerCoppyComponnets";
import AddBalance from "../pages/Dashboard/addBalance/AddBalance";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLaouts />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/server-copy-unofficial",
        element: <ServerCopyUnoficial />,
      },
      {
        path: "/dashboard/create-nid",
        element: <CreateNid />,
      },

      {
        path: "/dashboard/add-balance",
        element: <AddBalance />,
      },
    ],
  },
  {
    path: "/",
    element: <Logins />,
  },
  {
    path: "/sinup",
    element: <Sinup />,
  },
  {
    path: "/create-nid-download",
    element: <CreateNids />,
  },
  {
    path: "/server-copy",
    element: <Nid />,
  },
]);

export default router;
