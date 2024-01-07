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
    // <div className="m-1 p-2">
    //   <div className="flex justify-start">
    //     <div className="flex mx-1">
    //       <TransactionSpenderPicture
    //         imageUrl={
    //           "https://scontent.fkkc1-1.fna.fbcdn.net/v/t39.30808-6/289116418_10208690140567147_8498535620969896951_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFmg-5eZB3EBXqPMVlVcQZJ7igsnUlr-g7uKCydSWv6DqIHKoEuHulDJAOytfUVdxg&_nc_ohc=O93wBm_fEv8AX__6oGz&_nc_ht=scontent.fkkc1-1.fna&oh=00_AfBsFkgRPO5bDqVQOiyyspU7mnD4lspuzHXDxwlNFKmdYw&oe=6596C7A5"
    //         }
    //       />
    //     </div>
    //     {/* <div className="flex mx-1 items-center justify-center">
    //                 <div className={`h-6 w-6 rounded-full mr-2 ${props.transaction.categoryColor}`}></div>
    //             </div> */}
    //     <div className="grow mx-1">
    //       <TransactionDroplet message={props.transaction.description} />
    //     </div>
    //   </div>
    //   <div className="flex justify-between">
    //     <div
    //       className={`text-lg font-semibold mb-2 ${
    //         props.transaction.amount > 0 ? "text-green-600" : "text-red-600"
    //       }`}
    //     >
    //       ฿ {props.transaction.amount}
    //     </div>
    //     <div className="flex justify-end items-center">
    //       <div className="text-sm text-gray-600 mx-1">{date}</div>
    //       <div className="text-sm text-gray-600 mx-1">{time}</div>
    //     </div>
    //   </div>
    // </div>

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
              <div className="text-sm text-gray-600 mx-1">{date}</div>
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
