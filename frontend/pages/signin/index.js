import { signIn } from 'next-auth/react'
import React,{ useState,useEffect } from 'react'
import { BsGithub, BsTwitter, BsGoogle,BsChevronDoubleRight } from 'react-icons/bs'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'



const Login = () => {
  const {data:session, loading} = getSession();
  const router = useRouter()

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

    fetch("http://localhost:8080/api/login")
      .then(res=>console.log(res))
      .then(res=>res.json())
      .then(data=>sessionStorage.setItem('JWT',data))
      .then(data=>sessionStorage.setItem('JWT',data))
      .catch()
  }

  return (
    <div style={{}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:'60px' }}>
        <div style={{ width: '100%', background: '#34495E', color: '#F4F4F4', fontSize: '1.5em', paddingLeft: '20px', height: '40px' }}>
          {session &&(<label>Login</label>)}
          {!session &&(<label>Welcome member </label>)}
        </div>
      </div>
      <div style={{ paddingLeft: '20px'}}>
        <div style={{display:'flex',justifyContent: 'center',margin:'20px'}}>
          <div className="btn-group">
            <button type="button" className="btn btn-dark"  onClick={handleOAuthSignIn('github')}><BsGithub />{' '}GitHub</button>
            <button type="button" className="btn btn-primary" onClick={handleOAuthSignIn('twitter')}><BsTwitter />{' '}Twitter</button>
            <button type="button" className="btn btn-danger" onClick={handleOAuthSignIn('google')}><BsGoogle />{' '}Google</button>
          </div>
        </div>
        <div style={{display:'flex',justifyContent: 'center'}}>
          <div style={{ marginTop: '50px', width: '275px', height: '500px', border: '1px solid black', borderRadius: '10px', boxShadow: '5px 5px' }}>
            <div style={{display:'flex',justifyContent: 'center', alignItems: 'center',backgroundColor:'black',color:'#F4F4F4',height:'40px', borderRadius: '10px 10px 0px 0px'}}>
              <label>Montreal BookClub Account</label>
            </div>
            <form style={{padding:'10px'}}>
              <div className='form-group' style={{marginTop:'30px'}}>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name="username" placeholder='Enter email' className="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
              </div>
              <div className='form-group' style={{marginTop:'40px'}}>
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" placeholder='password' className="form-control" id="exampleInputPassword1" onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-warning" style={{marginTop:'140px'}} onClick={handleSubmit}>Submit <BsChevronDoubleRight /></button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login