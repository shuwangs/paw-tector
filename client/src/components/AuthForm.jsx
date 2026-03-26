import { useState } from react;
const AuthForm = () => {

    const [authMode, setAuthMode] = useState("login");

    return (
        <div className="">
            <form>
                <label>First Name
                    <input />
                </label>

                <label>Email
                    <input />
                </label>

                <label>Password
                    <input />
                </label>
            </form>
        </div>


    )
}

export default AuthForm;