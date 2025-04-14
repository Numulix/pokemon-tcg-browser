import { NavLink, Outlet, useNavigation } from "react-router";
import Loader from "./Loader";

function Layout () {
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-red-400 to-indigo-500 flex flex-col items-center p-4 font-sans">
            <header className="w-full max-w-6xl bg-white bg-opacity-90 rounded-lg shadow-md p-4 mb-6">
                <nav className="flex justify-center space-x-6">
                    <NavLink to="/" className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-200">Card Browser</NavLink>
                    <NavLink to="/sets" className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-200">Sets</NavLink>
                </nav>
            </header>

            <main className="w-full max-w-6xl">
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