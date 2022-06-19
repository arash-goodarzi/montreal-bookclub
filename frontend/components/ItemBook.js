import Image from 'next/image'
import { BsFillInfoCircleFill } from 'react-icons/bs'

const ItemBook = ({ book,setReserved }) => {
  return (
    // <div>
    //   {
    //     book.id
    //   }
    // </div>
    <div style={{ boxShadow: '10px 5px 5px rgb(160,82,45)', border: 'solid 1px rgb(102, 102, 102)', borderRadius: '5px', backgroundColor: book.reserved ? 'gray' : 'white' }}>
        <input disabled={book.reserved} type="radio" id={book.id} name="bookselection" onChange={(e) => setReserved(book.id)} style={{marginLeft:'10px'}} />
        <label style={{margin: '10px'}}>Title: { book.title}</label>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '25px 0px' }}>
        {book.bookImageLink &&(<Image loader={() => book.bookImageLink} src={book.bookImageLink} alt="book image" width={200} height={200} style={{borderRadius: '5%'}}/>)}
        {!book.bookImageLink &&(<label>No Image</label>)}
        
      </div>
      <div style={{ marginLeft: '30px' }}>
        {book.bookInfoLink && (<a href={book.bookInfoLink} target="_blank" rel="noreferrer noopener"> <BsFillInfoCircleFill /> for more information </a>)}
        {!book.bookInfoLink && (<label>No more information</label>)}
        
      </div>
      <div style={{marginLeft:'30px'}}>
        <label>Writers:</label>
          <ul>
            {
              book.writers.map((writer, idx) => {
                return (
                  <li key={idx}>{ writer}</li>
                )
              })
            }
          </ul>
      </div>
      <div style={{marginLeft:'30px'}}>
        <label>Translators:</label>
          <ul>
            {
              book.translators.map((translator, idx) => {
                return (
                  <li key={idx}>translator: { translator}</li>
                )
              })
            }
          </ul>
      </div>
      <div style={{marginLeft:'30px'}}>
        <label>Writers:</label>
          <ul>
            {
              book.donors.map((donator, idx) => {
                return (
                  <li key={idx}>{ donator}</li>
                )
              })
            }
          </ul>
      </div>     
    </div>
  )
}

export default ItemBook