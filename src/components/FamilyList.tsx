const FamilyList = ({ families }) => {
    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-3">Families</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {families.map((family, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">{family.name}</h2>
                        <p className="text-gray-600">{family.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamilyList;