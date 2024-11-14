import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Bus = () => {
    const location = useLocation();
    const buses = location.state?.buses || []; // Retrieve buses data or default to an empty array

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-8'>
            {/* Search & filter */}
            <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md p-4 md:p-6 items-center">
                <div className="flex items-center gap-x-2.5 col-span-1 md:col-span-2">
                    <input type="number" id='seat' placeholder='Search buses...' name='seat' className='w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800' />
                    <button className="bg-violet-600 h-11 px-4 rounded-md text-base text-neutral-50">
                        <FaSearch />
                    </button>
                </div>
                <div className="hidden md:block col-span-2"></div>

                <div className="col-span-1 md:col-span-2">
                    <select className='w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800 cursor-pointer'>
                        <option value="location4">Select Bus Type</option>
                        <option value="location4">Recliner Bus</option>
                        <option value="location5">AC Sleeper Bus</option>
                        <option value="location7">Deluxe Bus</option>
                    </select>
                </div>
            </div>

            {/* Bus cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((bus) => (
                    <Link key={bus.id}
                        to={`/bus/bus-details`}
                        state={{ busDetails: bus }}  // Pass bus details in state
                        className='bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-3 sm:p-4'
                    >
                        <img src={bus.imageUrl} alt="Bus Img" className="w-full aspect-video object-contain object-center" />
                        <div className="px-2 py-3 sm:px-3 sm:py-4 space-y-1 sm:space-y-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                                    {bus.name}
                                </h1>
                                <p className="text-xs sm:text-sm font-normal text-neutral-800 dark:text-neutral-50">
                                    {bus.numberOfSeats} Seats
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bus;
