interface Props {
    balance: number
}

const CashBalanceCard = (props: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 lg:w-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Cash Balance</h2>
                    <p className="text-gray-600">฿ {props.balance}.00</p>
                </div>
                <button className="rounded-full bg-blue-500 text-white p-2 flex items-center justify-center">
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
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CashBalanceCard