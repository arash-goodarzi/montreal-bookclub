import { signIn } from 'next-auth/react'
import React,{ useState,useEffect } from 'react'
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useRouter } from 'next/router'



const Login = () => {
  const router = useRouter()
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

  const handleOAuthSignIn = (provider) => () => {
    signIn(provider)
     router.push('/')
  }
  const [usernamePassword, setUsernamePassword] = useState({ username: '', password: '' });

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

    const username = usernamePassword.username
    const password = usernamePassword.password

    fetch("http://localhost:8080/api/login")
      .then(res=>console.log(res))
      .then(res=>res.json())
      .then(data=>sessionStorage.setItem('JWT',data))
      .then(data=>sessionStorage.setItem('JWT',data))
      .catch()
  }

  return (
    <>
      <div>Login</div>
      <button onClick={handleOAuthSignIn('github')}><BsGithub />{' '}GitHub</button>
      <button onClick={handleOAuthSignIn('twitter')}><BsTwitter />{' '}Twitter</button>
      <button onClick={handleOAuthSignIn('google')}><BsGoogle />{' '}Google</button>
      <form>
        <div><input type="email" name="username" placeholder='email' onChange={handleChange}/></div>
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