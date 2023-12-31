import { useState, useRef, useEffect } from 'react';

const SegmentControl = ({ segments, defaultSelected, onSegmentChange }) => {
    const [selectedSegment, setSelectedSegment] = useState(defaultSelected || segments[0]);
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const indicatorRef = useRef(null);

    useEffect(() => {
        if (indicatorRef.current) {
            const index = segments.indexOf(selectedSegment);
            const segmentWidth = indicatorRef.current.offsetWidth;
            setIndicatorPosition(segmentWidth * index);
        }
    }, [selectedSegment, segments]);

    const handleSegmentClick = (segment) => {
        setSelectedSegment(segment);
        onSegmentChange(segment);
    };

    return (
        <div className="flex rounded-md border overflow-hidden bg-gray-200 relative">
            <div
                className="absolute top-0 left-0 h-full bg-white transition-transform duration-300 z-10"
                style={{
                    width: `calc(100% / ${segments.length})`,
                    transform: `translateX(${indicatorPosition}px)`,
                }}
            />
            {segments.map((segment, index) => (
                <div
                    key={index}
                    className={`${
                        selectedSegment === segment ? 'text-gray-700' : 'text-gray-700'
                    } flex-1 p-3 text-center cursor-pointer z-20`}
                    onClick={() => handleSegmentClick(segment)}
                    ref={selectedSegment === segment ? indicatorRef : null}
                >
                    <div>{segment}</div>
                </div>
            ))}
        </div>
    );
};

export default SegmentControl;