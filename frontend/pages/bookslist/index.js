import React from 'react'
import ItemBook from '../../components/ItemBook'
import { useState, useEffect } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import Button from 'react-bootstrap/Button'


export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8080/api/books');
  const data = await res.json();
  return {
    props: {
      booksDB :data
    }
  }
}

const BooksList = ({ booksDB }) => {
  const { data: session, loadingg } = useSession();
  const { data: session1, loadinggg } = getSession();

  const [reserved, setReserved] = useState('')
  // const [booksDB, setBooksDB] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // const { data: session, loading } = useSession();
  const [loading, setloading] = useState(true)

  // const fetchBooks = async () => {
  // await fetch('/api/discoveryBook')
  //     .then(response => console.log(response))
  //     // .then(response => response.json())
  //     // .then(data => setBooksDB(data))
  //     // .then(data => console.log("77777777"))
  //     // .then(data => console.log(data))
  //     // .catch(err => console.error(err));

    
  // }

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      if (!session) {
        signIn()
      } else {
        setloading(false)
      }
    }
    securePage()
    // fetchBooks()
  }, [])
  
  if (loading) {
    return (<h2>Loading ...</h2>)
  }

  const handleSubmit = async() => {
    fetch('/api/discoveryBook', {
      method: 'POST',
      body: JSON.stringify(
        {
          reserved: reserved,
          email:session.user.email
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // .then((res) => res.json())
      // .then((data) => console.log(data))
    
    
  }

  return (
    <form>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div style={{ fontSize: 40, backgroundColor: '#34495E', color: '#F4F4F4', width: '100vw',display:'flex',flexDirection:'row',justifyContent: 'space-between',alignContent:'center'}}>
          <div style={{margin:'0px 20px'}}>
            List of Books:
          </div>
          
          <div style={{display:'flex',alignContent:'center',justifyContent:'center',flexDirection: 'column'}}>
            <Button onClick={handleSubmit} type="button" style={{ width:'100px',height:'50px',backgroundColor:'#F4F4F4',color:'#34495E'}} className="btn-sm" >Send {'  >>  '}</Button>
          </div>
          <div style={{margin:'0px 20px'}}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <label>Search&nbsp;</label>
              <input type="text" className="form-control mr-sm-2" style={{}} onChange={(e)=>setSearchTerm(()=>e.target.value)} />
            </label>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'row',fontSize:18,flexWrap:'wrap'}}>
          {booksDB.filter((val) => {
            if (searchTerm == '') {
              return val
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            } else if (val.writers.find(o => o.toLowerCase().includes(searchTerm.toLowerCase()))) {
              return val
            }else if (val.translators.find(o => o.toLowerCase().includes(searchTerm.toLowerCase()))) {
              return val
            }else if (val.donors.find(o => o.toLowerCase().includes(searchTerm.toLowerCase()))) {
              return val
            }
          }).map((book,idx) => {
            return (
              <label key={book.id} htmlFor={book.id} style={{display:'flex',flexDirection:'row',margin:'5px'}}>
                <ItemBook key={idx} book={book} setReserved={setReserved} />
              </label>
            )
          })}
        </div>
      </div>
      {/* {JSON.stringify(reserved)} */}
      {/* {JSON.stringify(booksDB)} */}
      {/* {JSON.stringify(session1)} */}
      <hr />
      {JSON.stringify(session.user.email)}


    </form>
  )
}

export default BooksList