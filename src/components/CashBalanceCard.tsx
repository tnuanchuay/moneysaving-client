interface Props {
  balance: number;
  onClickPlus: () => void;
}

const CashBalanceCard = (props: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-auto">
      <div>
        <h2 className="text-2xl font-bold mb-1">Cash Balance</h2>
        <p className="text-xl font-lgiht text-gray-600">฿ {props.balance}.00</p>
      </div>
      <div className="flex justify-around items-center rounded-lg shadow-md my-2 p-6 w-full lg:w-auto">
        <div className="glow text-l w-90">
          income
          <div className="flex border-2">+5000 (Mock)</div>
        </div>
        <div className="text-l">
          expense
          <div>-2000 (Mock)</div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="rounded-md w-full bg-blue-500 text-white p-2 m-2 flex items-center justify-center"
          onClick={() => props.onClickPlus()}
        >
          + Add log
          {/* <svg
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
            </svg> */}
        </button>
      </div>
    </div>
  );
};

export default CashBalanceCard;
