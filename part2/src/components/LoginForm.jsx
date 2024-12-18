const LoginForm = ( props) => {
    return(
    <div>
    <form onSubmit={props.handleSubmit}>
      <div className="loginFormUsername">
        username
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUsernameChange}
        />
      </div>
      <div className="loginFormPassword">
        password
          <input
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePasswordChange}
        />
      </div>
      <button type="submit" className="loginButton">login</button>
    </form> 
    </div>
  )
}

export default LoginForm
  