import { useState, useRef, useEffect } from 'react'

interface Props {
    segments: string[]
    defaultSelected: string
    onSegmentChange: (segment: string) => void
}

const SegmentControl = (props: Props) => {
    const [selectedSegment, setSelectedSegment] = useState(props.defaultSelected)
    const [indicatorPosition, setIndicatorPosition] = useState(props.segments.indexOf(props.defaultSelected))
    const indicatorRef = useRef(null)

    useEffect(() => {
        if (indicatorRef.current) {
            const index = props.segments.indexOf(selectedSegment)
            const segmentWidth = indicatorRef.current.offsetWidth
            setIndicatorPosition(segmentWidth * index)
        }
    }, [selectedSegment, props.segments])

    const handleSegmentClick = (segment) => {
        setSelectedSegment(segment)
        props.onSegmentChange(segment)
    }

    return (
        <div className="flex rounded-md border overflow-hidden bg-gray-200 relative">
            <div
                className="absolute rounded-md top-1 bottom-1 mx-1  bg-white transition-transform duration-300 shadow-md z-10"
                style={{
                    width: `calc(93% / ${props.segments.length})`,
                    transform: `translateX(${indicatorPosition}px)`,
                }}
            />
            {props.segments.map((segment, index) => (
                <div
                    key={index}
                    className="flex-1 p-2 text-center cursor-pointer z-20"
                    onClick={() => handleSegmentClick(segment)}
                    ref={selectedSegment === segment ? indicatorRef : null}
                >
                    <div>{segment}</div>
                </div>
            ))}
        </div>
    )
}

export default SegmentControl