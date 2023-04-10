import SpaceLogo from "../SpaceLogo"
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components'
import AuthMain from "./AuthMain"
import ForgotPasswordForm from "./ForgotPasswordForm"

const Main = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-image: url("auth-background.png");
`

const ModalContainer = styled.div`
    position: absolute;
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2rem);
    z-index: 1025555;
`

interface Props {
    selectedTab: string
}

const AuthWrapper: React.FC<Props> = ({ selectedTab }) => {
    const query = useSearchParams()

    const forgotPasswordModal = query?.get('forgotPasswordModal')
    return (
        <Main>
            <SpaceLogo />
            {forgotPasswordModal &&
                <ModalContainer >
                    <ForgotPasswordForm />
                </ModalContainer>}
            <AuthMain selectedTab={selectedTab} />
        </Main>
    )
}

export default AuthWrapper
