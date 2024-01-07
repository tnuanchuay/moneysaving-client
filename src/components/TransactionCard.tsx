import { format } from "date-fns"
import TransactionSpenderPicture from "./TransactionSpenderPicture"
import TransactionDroplet from "./TransactionDroplet"
import { Summary } from "../app/summary"
import {PlaceHolderProfilePicture} from "./PlaceHolderProfilePicture"

interface Props {
  transaction: Summary
}

const TransactionCard = (props: Props) => {
  const date = format(props.transaction.createdAt, "yyyy-MM-dd")
  const time = format(props.transaction.createdAt, "hh:mm a")
  const spender = props.transaction.familyId
    ? props.transaction.familyId
    : props.transaction.userId

  const profilePicture = props.transaction.pictureProfile ? (
    <TransactionSpenderPicture imageUrl={props.transaction.pictureProfile} />
  ) : (
    <PlaceHolderProfilePicture size={12} name={props.transaction.name} email={props.transaction.email} />
  )

  return (
    <div className="flex my-1">
      <div className="flex place-items-start">
        {profilePicture}
          <div
            className={`h-12 w-12 rounded-full mr-2 bg-black ${props.transaction.categoryColor}`}
          ></div>
      </div>

      <div className="flex-1 mx-2">
        <div className="flex-col">
          <div>
            <TransactionDroplet message={props.transaction.description} />
          </div>
          <div>
            <div className="flex w-full">
              <div className="text-sm text-gray-600">{date}</div>
              <div className="text-sm text-gray-600 mx-1">{time}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={`text-lg font-semibold mb-1 w-30 ${
            props.transaction.amount > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ฿ {props.transaction.amount}
        </div>
      </div>
    </div>
  )
}

export default TransactionCard
