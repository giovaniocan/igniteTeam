import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

export async function groupRemoveByName(groupDeleted: string){
    try {
        
        const storegerGroups = await groupsGetAll()

        const groups = storegerGroups.filter(group => group !== groupDeleted) // todos menos esse

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)

    } catch (error) {
        throw error;
    }
}