import { createBrowserRouter } from "react-router";
import App from "./components/App";
import Layout from "./components/Layout";
import Sets from "./components/Sets";
import SingleSet from "./components/SingleSet";
import { fetchSets } from "./services/pokemonTcgApi";
import { Set } from "./types/setTypes";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: App },
            { path: '/sets', Component: Sets, loader: async () => { return { sets: await fetchSets() as Set[] } } },
            { path: '/set/:setId', Component: SingleSet },
            { path: '/register', Component: Register },
            { path: '/login', Component: Login }
        ]
    }
])