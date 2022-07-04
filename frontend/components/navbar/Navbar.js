import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
// import './Navbar.css'

function Navbar() {
  const {data:session, loading} = useSession();
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='http://persianbookclub.com/' target="_blank" rel="noopener noreferrer">MTL Book Club</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/bookslist'>
            <a>List of Books</a>
          </Link>
        </li>
        {/* <li>
          <Link href='/blog'>
            <a>Blog</a>
          </Link>
        </li> */}

        {!loading && !session && (
          <li>
            <Link href='/api/auth/signin'>
              <a
                onClick={e => {
                  e.preventDefault()
                  signIn()
                }}>
                Sign In
              </a>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link href='/api/auth/signout'>
              <a
                onClick={e => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign Out
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar