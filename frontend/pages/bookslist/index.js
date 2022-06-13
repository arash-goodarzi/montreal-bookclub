import React from 'react'
import ItemBook from '../../components/ItemBook'
import { useState, useEffect } from 'react'
import {  getSession,signIn } from 'next-auth/react'


// title, writers, translators, available, donators, bookImage

const BooksList = () => {

  const [reserved, setreserved] = useState('')
  const [booksDB, setBooksDB] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // const { data: session, loading } = useSession();
  const [loading, setloading] = useState(true)
  const fetchBooks = async () => {
    const response = await fetch('/api/discoveryBook')
    const data = await response.json()
    setBooksDB(data)
  }

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
    fetchBooks()
  }, [])
  
  if (loading) {
    return (<h2>Loading ...</h2>)
  }



  // useEffect(() => {
    
  // }, [])
  


  const handleSubmit = async() => {
    const response = await fetch('/api/discoveryBook', {
      method: 'POST',
      body: JSON.stringify({ reserved }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
  }

  return (
    <form>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div style={{ fontSize: 40, backgroundColor: 'black', color: 'orange', width: '100vw',display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
          <div style={{margin:'0px 20px'}}>
            Books List:
          </div>
          
          <button onClick={handleSubmit} style={{width:'180px',backgroundColor:'orange',fontSize: 20}} >Send {'  >>  '}</button>
          <div style={{margin:'0px 20px'}}>
            <label style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              Search: {'   '}
              <input type="text" style={{height:'30px',paddingLeft:'10px'}} onChange={(e)=>setSearchTerm(()=>e.target.value)} />
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
            }else if (val.donators.find(o => o.toLowerCase().includes(searchTerm.toLowerCase()))) {
              return val
            }
          }).map((book,idx) => {
            return (
              <label key={book.id} htmlFor={book.id} style={{display:'flex',flexDirection:'row',margin:'5px'}}>
                <div><input disabled={!book.available} type="radio" id={book.id} name="bookselection" onChange={(e)=>setreserved(book.id)} /></div>
                <ItemBook key={idx} book={book} />
              </label>
            )
          })}
        </div>
      </div>
      {JSON.stringify(reserved)}
    </form>
  )
}

export default BooksList