const Spinner = () => {
    const dotSizes = ['w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2', 'w-2.5 h-2.5', 'w-3 h-3', 'w-3.5 h-3.5', 'w-4 h-4', 'w-3 h-3']

    return (
        <div className="h-screen w-screen flex items-center justify-center animate-spin">
            <div className="w-20 h-20 relative">
                {dotSizes.map((size, index) => (
                    <div
                        key={index}
                        className={`bg-black rounded-full absolute top-0 left-0 right-0 bottom-0 m-auto ${size}`}
                        style={{
                            transform: `rotate(${45 * index}deg) translateX(24px) rotate(-${45 * index}deg)`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Spinner