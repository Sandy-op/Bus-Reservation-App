import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Save from '../../../assets/save.png'
import { FaCopy } from 'react-icons/fa'

const Offer = () => {
    const [copied, setCopied] = useState({ first: false, second: false });

    const handleCopy = (coupon) => {
        const couponCode = coupon === 'first' ? "BUS10SNDY" : "BUS10HBD";
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                setCopied((prev) => ({ ...prev, [coupon]: true }));
                setTimeout(() => {
                    setCopied((prev) => ({ ...prev, [coupon]: false }));
                }, 2000);
            })
            .catch((err) => {
                console.log('Failed to copy', err);
            })
    };

    return (
        <div className='w-full lg:px-28 md:px-20 sm:px-10 px-4 mb-[8ch]'>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-medium">
                    Special Offer
                </h1>
                <Link to={"/offer"} className='text-violet-600 mt-2 sm:mt-0'>View All</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">

                {/* First Coupon */}
                <div className="w-full rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-y-5 lg:gap-y-0 lg:gap-x-3 shadow-md">
                    <img src={Save} alt="save img" className="w-full lg:w-52 aspect-[2/1] object-contain object-center" />
                    <div className="flex flex-1 flex-col space-y-4 lg:space-y-5">
                        <h1 className="text-lg lg:text-xl font-semibold text-neutral-800 dark:text-neutral-50 text-center lg:text-left">
                            Get 60% off on your first booking
                        </h1>

                        <div className="flex items-center gap-x-3 justify-center lg:justify-start">
                            <div className="w-fit border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-800 bg-violet-500/10 dark:bg-violet-800/5 rounded-md p-3">
                                {
                                    copied.first
                                        ? <span className='text-green-600'>Copied</span>
                                        : <span className='text-green-600'>BUS10SNDY</span>
                                }
                            </div>
                            <button onClick={() => handleCopy('first')} className="text-xl text-violet-600">
                                <FaCopy />
                            </button>
                        </div>
                        <p className="text-sm text-neutral-400 dark:text-neutral-600 font-normal text-center lg:text-left">
                            Valid till: <span className='text-sm font-medium'>31st December</span>
                        </p>
                    </div>
                </div>

                {/* Second Coupon */}
                <div className="w-full rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-y-5 lg:gap-y-0 lg:gap-x-3 shadow-md">
                    <img src={Save} alt="save img" className="w-full lg:w-52 aspect-[2/1] object-contain object-center" />
                    <div className="flex flex-1 flex-col space-y-4 lg:space-y-5">
                        <h1 className="text-lg lg:text-xl font-semibold text-neutral-800 dark:text-neutral-50 text-center lg:text-left">
                            Get 60% off on your first booking
                        </h1>

                        <div className="flex items-center gap-x-3 justify-center lg:justify-start">
                            <div className="w-fit border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-800 bg-violet-500/10 dark:bg-violet-800/5 rounded-md p-3">
                                {
                                    copied.second
                                        ? <span className='text-green-600'>Copied</span>
                                        : <span className='text-green-600'>BUS10HBD</span>
                                }
                            </div>
                            <button onClick={() => handleCopy('second')} className="text-xl text-violet-600">
                                <FaCopy />
                            </button>
                        </div>
                        <p className="text-sm text-neutral-400 dark:text-neutral-600 font-normal text-center lg:text-left">
                            Valid till: <span className='text-sm font-medium'>31st December</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Offer;
