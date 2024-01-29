
type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }: NavigationProps) {
    console.log(isLoggedIn);
    return (
        <div>
            <h5>Kekambas Blog</h5>
            <ol>
                { isLoggedIn ? (
                    <>
                        <li>Create Post</li>
                        <li>Log Out</li>
                    </>
                ) : (
                    <>
                        <li>Log In</li>
                        <li>Sign Up</li>
                    </>
                )}
            </ol>
        </div>
    )
}
