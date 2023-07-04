import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage, languageSwitch } from './languageSlice'
import { selectCart } from '../cart/cartSlice'
import { useKeycloak } from '@react-keycloak/web'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const polish = useSelector(selectLanguage)
    const cart = useSelector(selectCart)
    const { keycloak } = useKeycloak()

    return (
        <>
            <nav className='bg-zinc-700 text-zinc-50 text-xl h-14 fixed top-0 left-0 right-0 flex justify-between'>
                <div className='h-fit px-10 self-center flex gap-10'>
                    <button onClick={() => navigate('/')}>{polish ? 'dom' : 'home'}</button>
                    {!!keycloak.authenticated && <p>{keycloak.tokenParsed.preferred_username}</p>}
                    {keycloak.hasRealmRole('admin') && <button onClick={() => navigate('/stats')}>{polish ? 'statystyki' : 'stats'}</button>}
                </div>
                <div className='h-fit px-10 self-center flex gap-10'>
                    {!keycloak.authenticated
                        ?
                        <button onClick={() => keycloak.login()}>{polish ? 'zaloguj się' : 'sign in'}</button>
                        :
                        <button onClick={() => keycloak.logout()}>{polish ? 'wyloguj się' : 'sign out'}</button>
                    }
                    <button onClick={() => navigate('/cart')}>{polish ? 'koszyk' : 'cart'}({cart.length})</button>
                    {polish
                        ?
                        <button onClick={() => dispatch(languageSwitch())}>EN</button>
                        :
                        <button onClick={() => dispatch(languageSwitch())}>PL</button>
                    }
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout