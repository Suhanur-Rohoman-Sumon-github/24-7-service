import { FaHome } from "react-icons/fa";

import { FaCodePullRequest } from "react-icons/fa6";

import { FaCcMastercard } from "react-icons/fa";
import { VscServerProcess } from "react-icons/vsc";
export const navDatas = [
  {
    icon: <VscServerProcess />,
    path: "/dashboard/create-nid",
    element: "সাইন কপি টু এনআইডি",
  },
  {
    icon: <VscServerProcess />,
    path: "/dashboard/server-copy-unofficial",
    element: "সার্ভার কপি ",
  },
];

export const adminNavData = [
  {
    icon: <FaHome />,
    path: "/dashboard/home",
    element: "Home",
  },
  {
    icon: <FaCodePullRequest />,
    path: "/dashboard/requests",
    element: "Requests",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/payment-requests",
    element: "Payment Requests",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/add-payments",
    element: "add payments manually",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/update-charge",
    element: "update current charge",
  },
];
