import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'shop',
    clientId: 'shop-frontend',
})

export default keycloak