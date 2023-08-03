import { playersGetByGroup } from "./playersGetByGroup"

export async function playersGetByGroupAdnTeam(group: string, team: string) {
    try {
        
        const store = await playersGetByGroup(group)

        const players = store.filter(player => player.team === team)

        return players

    } catch (error) {
        throw error
    }

}