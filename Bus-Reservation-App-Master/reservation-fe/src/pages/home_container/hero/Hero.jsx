import Bus2 from '../../../assets/bus5.png';
import { motion } from "framer-motion";


const Hero = () => {


    const imageVariants = {
        initial: { x: "100%" },
        animate: {
            x: "3%",
            transition: { duration: 3, ease: "easeInOut" },
        },
    };

    return (
        <div className='w-full h-[calc(100vh-8ch)] lg:pl-28 md:pl-16 sm:pl-7 px-4 mt-[8ch] flex items-center justify-center flex-col hero relative'>
            <div className="flex-1 w-full flex items-stretch justify-between gap-6 md:gap-10 lg:gap-12 pb-10">
                <motion.div
                    className="w-full md:w-[50%] lg:w-[35%] h-auto rounded-md flex justify-center flex-col space-y-8 md:space-y-10 lg:space-y-14"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'linear', delay: 0.2 }}
                >
                    <motion.div className="space-y-3 md:space-y-5"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'linear', delay: 0.2 }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-50 leading-tight md:leading-[1.15]"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, ease: 'linear', delay: 0.4 }}
                        >
                            Reserve Your Bus
                            <span className='text-violet-400 tracking-wider'> Tickets</span>Now
                        </motion.h1>
                        <motion.p
                            className="text-base md:text-lg lg:text-xl font-normal text-neutral-300 line-clamp-3 text-ellipsis"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, ease: 'linear', delay: 0.4 }}
                        >
                            Find and book your bus tickets with just a few clicks. We offer a wide range of bus routes and schedules to suit your needs.
                        </motion.p>

                        <motion.button
                            className="w-fit bg-violet-700 hover:bg-violet-800 text-neutral-50 font-medium py-2 md:py-3 px-4 md:px-6 rounded-md ease-in-out duration-300"
                        >
                            Reserve Seat Now
                        </motion.button>
                    </motion.div>
                </motion.div>

                <div className="w-[70%] md:w-[60%] lg:w-[60%] h-full rounded-md flex items-end justify-end absolute top-0 -right-28 md:-right-40 lg:-right-48">
                    <motion.img
                        className='w-full max-w-[500px] md:max-w-[600px] lg:max-w-full aspect-[4/2] object-contain'
                        src={Bus2}
                        alt='bus img'
                        initial="initial"
                        animate="animate"
                        variants={imageVariants}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
