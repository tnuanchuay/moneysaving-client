import {useCallback} from "react"

interface Props {
    onClick?: () => void
}

const FloatingButton = (props: Props) => {
    const onClick = useCallback(() => {
        if (props.onClick) {
            props.onClick()
        }
    }, [])

    return (
        <div className="fixed bottom-8 right-8">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg"
                type="button"
                onClick={onClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
        </div>
    )
}

export default FloatingButton