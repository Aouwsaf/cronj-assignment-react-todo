import axios from 'axios';
import SERVER_URL from './urls';
export default axios.create({
    baseURL: SERVER_URL.BASE_URL
})