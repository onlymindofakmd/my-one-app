import axios from 'axios'

const api = axios.create({
    baseURL: '**',
    timeout: 3000
})

export default api