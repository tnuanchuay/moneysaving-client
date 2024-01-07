const TransactionSpenderPicture = ({ imageUrl }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500">
                <img
                    className="h-10 w-10 object-cover"
                    src={imageUrl}
                    alt="Profile"
                />
            </div>
        </div>
    )
}

export default TransactionSpenderPicture