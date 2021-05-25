import axios from 'axios'
import { Person } from '../types'

const API_BASE_PATH = 'https://swapi.dev/api/people/'

export const getPeople = async (page: number) => {
    try {
        const response = await axios.get(`${API_BASE_PATH}?page=${page}`)

        if (response?.data) {
            const results = response.data.results as Person[] || []

            for (let result of results) {
                try {
                    const homeworldResponse = await axios.get(result.homeworld)

                    if (homeworldResponse.data) {
                        result.homeworld = homeworldResponse.data.name || 'Unknown'
                    }

                } catch (error) {
                    result.homeworld = 'No Name'
                }
            }

            return {
                count: response.data?.count || 0,
                results
            }
        }
        return null

    } catch (error) {
    }
}


export const getPerson = async (name: string) => {
    try {
        const response = await axios.get(`${API_BASE_PATH}?search=${name}`)

        if (response?.data?.results?.length) {
            const characterData = response.data.results[0]

            try {
                const homeworldResponse = await axios.get(characterData.homeworld)

                if (homeworldResponse.data) {
                    characterData.homeworld = homeworldResponse.data.name || 'Unknown'
                }

            } catch (error) {
                characterData.homeworld = 'No Name'
            }
            return characterData
        }
        return null

    } catch (error) {
    }
}