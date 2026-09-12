import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutProvider from "./ECommerceSite/LayoutProvider";
import Dashboard from "./ECommerceSite/components/Dashboard";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutProvider />,
            children: [
                { path:"dashboard", element: <Dashboard /> },
                { path: "products", element: <p>THis is products page</p> }
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}
export default App;