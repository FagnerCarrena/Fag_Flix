import axios from 'axios'

//https://www.themoviedb.org/settings/api;

const api = axios.create({
baseURL: 'https://api.themoviedb.org/3/'

})

export default api
