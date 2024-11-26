const Ping = () => {
  return (
    <div className="relative">
        <div className="absolute -left-4 top-1">
            <span className="flex size-[11px]">
            <span className="absolute inline-flex h-full w-full  rounded-full bg-pink-200 opacity-100">
                <span className="absolute inline-flex h-full w-full  rounded-full bg-pink-500 opacity-75">
                    <span className="absolute inline-flex bg-pink-500 animate-ping rounded-full size-[11px]">
                    </span>
                </span>
            </span>
            </span>
        </div>
    </div>
  )
}

export default Ping