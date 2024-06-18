import axios from 'axios'

export const getUser = async (id: number) => {
    try {
        const response = await axios.get(`/api/user/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}