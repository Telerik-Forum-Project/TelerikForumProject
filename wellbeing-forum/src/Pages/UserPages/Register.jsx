
export default function Register(){
    


    return (<form className="register-from">
            <h2>Register Form</h2>
              <label className="username-label">username: 
                <input type="text" 
                       placeholder="Enter username here..."/>
                </label><br />
                <br />
                <label className="email-label">email: 
                <input type="text" 
                       placeholder="Enter email here..."/>
                </label><br />
                <br />
                <label className="password-label">password: 
                <input type="text" 
                       placeholder="Enter password here..."/>
                </label><br />
                <br />
                <label className="confirm-password-label">confirm password: 
                <input type="text" 
                       placeholder="confirm password"/>
                </label><br />
                <br />
                <button>Register</button>
                <button>Log In</button>
        </form>);
}