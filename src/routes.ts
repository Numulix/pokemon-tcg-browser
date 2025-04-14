import { createBrowserRouter } from "react-router";
import App from "./components/App";
import Layout from "./components/Layout";
import Sets from "./components/Sets";
import { fetchSets, Set } from "./services/tcgdex";
import SingleSet from "./components/SingleSet";

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { index: true, Component: App },
            { path: '/sets', Component: Sets, loader: async () => { return { sets: await fetchSets() as Set[] } } },
            { path: '/set/:setId', Component: SingleSet }
        ]
    }
])