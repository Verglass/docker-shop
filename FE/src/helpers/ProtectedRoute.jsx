import { useKeycloak } from '@react-keycloak/web'
import { selectLanguage } from '../features/layout/languageSlice'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
    const { keycloak } = useKeycloak()

    const isLoggedIn = keycloak.authenticated

    const polish = useSelector(selectLanguage)

    if (!isLoggedIn) {
        return (
            <div className='container flex justify-center'>
                <h1 className='mt-32 text-8xl font-bold'>{polish ? 'Ścieżka wymaga zalogowania' : 'Route requiers a sign in'}</h1>
            </div>
        )
    }

    return children
}

export default PrivateRoute