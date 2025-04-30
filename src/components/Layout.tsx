import { NavLink, Outlet, useNavigation } from "react-router";
import Loader from "./Loader";

function Layout () {
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center p-4 font-sans">
            <header className="w-full container mb-6">
                <div className="navbar bg-base-100 shadow-sm rounded-2xl">
                    <div className="flex-1">
                        <NavLink to="/" className="btn btn-ghost text-xl">PTCG Buddy</NavLink>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <NavLink to={"/"} className="font-semibold text-lg transition duration-200">Card Browser</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/sets"} className="font-semibold text-lg transition duration-200">Sets</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <main className="w-full container">
                {isNavigating && <Loader />}
                <Outlet />
            </main>

            <footer className="text-center text-white text-opacity-80 mt-8">
                Pokemon TCG data provided by TCGdex API
            </footer>
        </div>
    )
}

export default Layout;