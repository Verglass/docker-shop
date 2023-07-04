import { useKeycloak } from '@react-keycloak/web'
import { selectLanguage } from '../features/layout/languageSlice'
import { useSelector } from 'react-redux'


const AdminRoute = ({ children }) => {
    const { keycloak } = useKeycloak()

    const isLoggedIn = keycloak.authenticated

    const isAdmin = keycloak.hasRealmRole('admin')

    const polish = useSelector(selectLanguage)

    if (!isLoggedIn) {
        return (
            <div className='container flex justify-center'>
                <h1 className='mt-32 text-8xl font-bold'>{polish ? 'Ścieżka wymaga zalogowania' : 'Route requiers a sign in'}</h1>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className='container flex justify-center'>
                <h1 className='mt-32 text-8xl font-bold'>{polish ? 'Niedostępna Ścieżka' : 'Route is unavailable'}</h1>
            </div>
        )
    }

    return children
}

export default AdminRoute