import { NavLink, useLoaderData } from "react-router";
import { Set } from "../types/setTypes";

function Sets() {
    const { sets } = useLoaderData();

    return (
        <div className="w-full bg-base-100 bg-opacity-95 rounded-lg shadow-xl p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Pokemon TCG sets</h1>
            <div className="mt-6 min-h-[200px]">
                {sets && sets.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sets.map((set: Set) => (
                            <NavLink key={set.id} to={`/set/${set.id}`}>
                                <div className="border border-base-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center bg-base-200 bg-opacity-90">
                                    {set.images && (
                                        <img
                                            src={`${set.images.logo}`}
                                            alt={`${set.name} logo`}
                                            className="w-16 h-16 object-contain mb-3"
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                                        />
                                    )}
                                    {!set.images && (
                                        <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-full">
                                            <span className="text-xs">No Logo</span>
                                        </div>
                                    )}
                                    <p className="text-lg font-semibold mb-1">{set.name}</p>
                                    <p className="text-sm">
                                        Cards: {set.printedTotal} official ({set.total} total)
                                    </p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sets;