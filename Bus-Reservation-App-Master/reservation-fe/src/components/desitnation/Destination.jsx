const Destination = ({ busDetails }) => {

    return (
        <div className='w-full space-y-4'>
            <div className="space-y-5">
                <h1 className="text xl text-neutral-800 dark:text-neutral-100 font-medium">
                    Your Destination
                </h1>
                <div className="w-full flex items-center gap-x-3">
                    <div className="w-fit text-base font-semibold">
                        From:- <sapn className="m1-1.5 font font-bold">{busDetails.from}</sapn>
                    </div>
                    <div className="flex-1">
                        <div className="w-full h-[1px] border border-dashed border-neutral-200 dark:border-neutral-800/80"></div>
                    </div>
                    <div className="w-fit text-base font-semibold">
                        To:- <sapn className="m1-1.5 font-bold">{busDetails.to}</sapn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destination