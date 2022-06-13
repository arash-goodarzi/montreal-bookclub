import { signIn } from 'next-auth/react'
import React,{ useState } from 'react'
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs'
import axios from 'axios'

const Login = () => {

  const providers = [
    {
      name: 'github',
      icon: 'BsGithub'
    },
    {
      name: 'twitter',
      icon: 'BsTwitter'
    },
    {
      name: 'google',
      icon: 'BsGoogle'
    },
  ]

  const handleOAuthSignIn = (provider) => () => signIn(provider)

  const [usernamePassword, setUsernamePassword] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    console.log("&&&&&&&&&")
    console.log(e.target.name)
    console.log(e.target.value)
    console.log("&&&&&&&&&")
    setUsernamePassword((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(usernamePassword)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("%%%%%%%%%%%%%%%%")
    console.log(usernamePassword)
    console.log("%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%")

    const username = usernamePassword.email
    const password = usernamePassword.password

    // const rr = loginUser(username,password)

    // const options = {
    //   url: 'http://localhost:8080/api/login',
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6b3JvQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfTUFOQUdFUiIsIlJPTEVfVVNFUiJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjU0ODIzMDQyfQ.m_o7MZ-6M6qL8ghL9hKlxWOsoI19ywjaM6mtGRPzSpk'

    //   },
    //   data: {
    //     username:usernamePassword.email,
    //     password:usernamePassword.password
    //   }
    // };

    axios.post('http://localhost:8080/api/login', {
      Headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6b3JvQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfTUFOQUdFUiIsIlJPTEVfVVNFUiJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjU0ODIzNzY5fQ.FHrA7czYHPRTqsa4dJtvcLabtzXKvNiiHhynAP45WNQ'
    }}, {
      auth: {
        username:usernamePassword.email,
        password:usernamePassword.password
      }
    })
  }

  // const loginUser = async (username,password) => {
  //   const mmm = await axios.post('http://localhost:8080/api/login', { username: 'zoro@gmail.com', password: '1234' });
  //   console.log(mmm);
  // }





  // const loginUser = async (username,password) => {
  //   const {data} = await axios.post('http://localhost:8080/api/login', { username, password });
  // }

  return (
    <>
      <div>Login</div>
      <button onClick={handleOAuthSignIn('github')}><BsGithub />{' '}GitHub</button>
      <button onClick={handleOAuthSignIn('twitter')}><BsTwitter />{' '}Twitter</button>
      <button onClick={handleOAuthSignIn('google')}><BsGoogle />{' '}Google</button>
      <form>
        <div><input type="email" name="email" placeholder='email' onChange={handleChange}/></div>
        <div><input type="password" name="password" placeholder='password' onChange={handleChange} /></div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>

      {/* {providers.map((name,icon) => {
        return (
          <icon key={name} />
        )
      })} */}
    </>
  )
}

export default Login