import {Preferences} from '@capacitor/preferences'

// JSON "set" example
export const setObject = async (key: string, value: string) => {
    await Preferences.set({
        key: key,
        value: value
    })
}

// JSON "get" example
export const getObject = async (key: string): Promise<string> => {
    const result = await Preferences.get({key: key})
    return result.value
}