import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}
const vote = async (id) => {

    const object = await (await axios.get(`${baseUrl}/${id}`)).data
    console.log(object)
    object.votes++
    await axios.put(`${baseUrl}/${id}`, object)
}

const all = {
    getAll,
    createNew,
    vote
}
export default all