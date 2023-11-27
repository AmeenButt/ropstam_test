import { basePath } from "url";
import Login from 'views/auth/login'
import Signup from 'views/auth/signup'
import Dashboard from 'views/admin/dashboard'
import Categories from 'views/admin/categories'
import Car from 'views/admin/car'
export const routes = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-tv-2 text-primary",
        component: <Login />,
        layout: `/${basePath}/auth`,
    },
    {
        path: "/signup",
        name: "Signup",
        icon: "ni ni-tv-2 text-primary",
        component: <Signup />,
        layout: `/${basePath}/auth`,
    },
    {
        path: "/",
        name: "Home",
        icon: "ni ni-tv-2 text-primary",
        component: <Dashboard />,
        layout: `/${basePath}/admin`,
    },
    {
        path: "/categories",
        name: "Categories",
        icon: "ni ni-tv-2 text-primary",
        component: <Categories />,
        layout: `/${basePath}/admin`,
    },
    {
        path: "/cars",
        name: "Cars",
        icon: "ni ni-tv-2 text-primary",
        component: <Car />,
        layout: `/${basePath}/admin`,
    },
]