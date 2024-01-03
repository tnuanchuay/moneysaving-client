// const TransactionCard = ({ date, time, category, spender, description, amount }) => {
import {Transaction} from "../app/transactions"
import {format, parseISO, parseJSON} from "date-fns"
import TransactionSpenderPicture from "./TransactionSpenderPicture"
import TransactionDroplet from "./TransactionDroplet"

interface Props {
    transaction: Transaction
}

const TransactionCard = (props: Props) => {
    const date = format(props.transaction.createdAt, 'yyyy-MM-dd')
    const time = format(props.transaction.createdAt, 'hh:mm a')
    const spender = props.transaction.familyId ? props.transaction.familyId : props.transaction.userId

    return (
        <div className="m-1 p-2">
            <div className="flex justify-start">
                <div className="flex mx-1">
                    <TransactionSpenderPicture
                        imageUrl={"https://scontent.fkkc1-1.fna.fbcdn.net/v/t39.30808-6/289116418_10208690140567147_8498535620969896951_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFmg-5eZB3EBXqPMVlVcQZJ7igsnUlr-g7uKCydSWv6DqIHKoEuHulDJAOytfUVdxg&_nc_ohc=O93wBm_fEv8AX__6oGz&_nc_ht=scontent.fkkc1-1.fna&oh=00_AfBsFkgRPO5bDqVQOiyyspU7mnD4lspuzHXDxwlNFKmdYw&oe=6596C7A5"}/>
                </div>
                <div className="grow mx-1">
                    <TransactionDroplet message={props.transaction.description}/>
                </div>
            </div>
            <div className="flex justify-between">
                <div
                    className={`text-lg font-semibold mb-2 ${props.transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    ฿ {props.transaction.amount}
                </div>
                <div className="flex justify-end items-center">
                    <div className="text-sm text-gray-600 mx-1">{date}</div>
                    <div className="text-sm text-gray-600 mx-1">{time}</div>
                </div>
            </div>

        </div>
    )
}

export default TransactionCard