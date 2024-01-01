const TransactionDroplet = ({message}) => {
    return (
        <div
            className="max-w-xs rounded-lg p-4 bg-blue-500 text-white shadow-xl">
            <p>{message}</p>
        </div>
    );
};

export default TransactionDroplet;