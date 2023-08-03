import AsyncStorage from "@react-native-async-storage/async-storage"

import { GROUP_COLLECTION } from "@storage/storageConfig"
import { AppError } from "@utils/AppError"

import { groupsGetAll } from "./groupGetAll"




export async function groupCreate(newGroupName: string){
    try {
        const storageGroups = await groupsGetAll()

        const groupAlreadyExist =  storageGroups.includes(newGroupName)

        if(groupAlreadyExist){
            throw new AppError('Group already exist')
            
        }

        const storageString = JSON.stringify([...storageGroups, newGroupName])

        await AsyncStorage.setItem(GROUP_COLLECTION, storageString)
    } catch (error) {
        throw error
    }
}