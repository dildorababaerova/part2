import axios from 'axios'


<<<<<<< HEAD
const baseUrl = 'http://localhost:3001/api/notes'
=======
const baseUrl = '/api/notes'
>>>>>>> 9a32afb9fc00a4cb38160ef5838c6e88384007df

const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject )
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put (`${baseUrl}/${id}`, newObject )
    return request.then(response => response.data)
    
}

export default {
    getAll,
    create,
    update
}