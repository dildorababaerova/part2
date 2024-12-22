import { useState } from "react"


const LoginForm = ({handleSubmit}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({
      username, password
    })
    setUsername('')
    setPassword('')
  }

    return(
    <div>
    <form onSubmit={handleLogin}>
      <div className="loginFormUsername">
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="loginFormPassword">
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="loginButton">login</button>
    </form> 
    </div>
  )
}

export default LoginForm
  