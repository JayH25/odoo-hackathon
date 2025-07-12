import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Component/Login";
import SignUp from "./Component/Signup";
import Home from "./Component/Home";
import Ans from "./Component/Answer";
import Team from "./Component/Team";
import AskQuestion from "./Component/AskQuestion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Layout with Navbar/Footer
      children: [
        { index: true, element: <Home /> },
        { path: "addNewQuestion", element: <AskQuestion /> },
        { path: "answer", element: <Ans /> },
        { path: "team", element: <Team /> },
      ],
    },
    {
      path: "/login",
      element: <Login />, // no Navbar
    },
    {
      path: "/signup",
      element: <SignUp />, // no Navbar
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
