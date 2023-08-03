import AsyncStorage from "@react-native-async-storage/async-storage"
import { PLAYER_COLLECTION } from "@storage/storageConfig"
import { PlayerStorageDTO } from "./PlayerStorageDTO"

export async function playersGetByGroup(group:string){
    try {
        
        const oldStorageData = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

        const players: PlayerStorageDTO[] = oldStorageData ? JSON.parse(oldStorageData) : [] 

        return players

    } catch (error) {
        throw error
    }
}