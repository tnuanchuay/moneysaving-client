import {Family} from "../app/family";
import {useCallback, useRef, useState} from "react";
import {createFamilyInviteLink} from "../api/family";
import {Dialog} from "@capacitor/dialog";

interface Props {
    family: Family
}

export const FamilyCard = (props: Props) => {
    const [link, setLink] = useState("")
    const toggleCopyLink = useCallback(async (familyId: number) => {
        try {
            if (link) {
                setLink("")
            } else {
                const result = await createFamilyInviteLink(familyId)
                setLink(result.url)
            }
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: e,
            })
        }
    }, [link])

    const inviteLinkInput = useRef(null);

    const selectAllText = () => {
        if (inviteLinkInput.current) {
            inviteLinkInput.current.select();
        }
    };

    return (
        <div className="flex-row bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between">
                <div className="flex-row">
                    <h2 className="text-lg font-semibold mb-2">{props.family.name}</h2>
                    <p className="text-gray-600">{props.family.description}</p>
                </div>
                <div className="flex items-center">
                    <div className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                    </div>
                    <div onClick={() => toggleCopyLink(props.family.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                        </svg>
                    </div>
                </div>
            </div>
            {link && (
                <div className="flex pt-2">
                    <div className="grow relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">Link</span>
                        </div>
                        <input type="text" name="price" id="link"
                               className="block w-full rounded-md border-0 py-1.5 pl-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                               onClick={selectAllText}
                               ref={inviteLinkInput}
                               value={link}/>
                    </div>
                </div>
            )}
        </div>
    )
}