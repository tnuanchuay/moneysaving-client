interface Props {
    size: number,
    name: string,
    email: string
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
}

export const PlaceHolderProfilePicture = (props: Props) => (
    <div className={`bg-white border-2 w-${props.size} h-${props.size} rounded-full`}>
        <img alt="this is you. right ?"
             src={`https://avatar.iran.liara.run/public/boy?username=${props.name + props.email}`}
             onMouseEnter={props.onMouseEnter}
             onMouseLeave={props.onMouseLeave}
        />
    </div>
)