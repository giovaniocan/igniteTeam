import AsyncStorage from "@react-native-async-storage/async-storage"

import { groupsGetAll } from "./groupGetAll"

import { GROUP_COLLECTION } from "@storage/storageConfig"


export async function groupCreate(newGroupName: string){
    try {
        const storageGroups = await groupsGetAll()

        const storageString = JSON.stringify([...storageGroups, newGroupName])

        await AsyncStorage.setItem(GROUP_COLLECTION, storageString)
    } catch (error) {
        throw error
    }
}