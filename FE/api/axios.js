import axios from 'axios'
import keycloak from '../src/app/keycloak'

export default axios.create({
    // baseURL: 'https://shopapi-production-7591.up.railway.app'
    baseURL: 'http://localhost:3500',
    headers: {
        authorization: `Bearer ${keycloak.token}`
    }
})