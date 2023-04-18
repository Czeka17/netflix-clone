import { useSession } from "next-auth/react"

function Profile() {
    const { data: session, status } = useSession()
    return(
        <>
        <h1>MY PROFILE</h1>
        <p>{session.user.name}</p>
        <img src={session.user.image} />
        <p>{session.user.email}</p>
        </>
    )
}

export default Profile