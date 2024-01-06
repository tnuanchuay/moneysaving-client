import FamilyList from '../components/FamilyList';

export const FamilyPage = () => {
    // Sample data of families (replace this with your actual data)
    const families = [
        {
            name: 'Family 1',
            description: 'Description of Family 1...',
        },
        {
            name: 'Family 2',
            description: 'Description of Family 2...',
        },
        // Add more families as needed
    ];

    return (
        <div>
            <FamilyList families={families} />
        </div>
    );
};