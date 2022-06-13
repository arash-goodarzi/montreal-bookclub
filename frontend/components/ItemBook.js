// title, writers, translators, available, donators, bookImage

import Image from 'next/image'

const ItemBook = ({ book }) => {
  return (
      <div style={{boxShadow:'10px 5px 5px rgb(160,82,45)',border:'solid 1px rgb(102, 102, 102)',borderRadius: '5%',backgroundColor:book.available?'white':'gray'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'25px 0px'}}>
          <Image src={book.bookImage} alt="book image" width={200} height={200} style={{borderRadius: '5%'}}/>
        </div>
        
        <div style={{margin: '10px'}}>Title: { book.title}</div>
          <div >
            <ul>
              {
                book.writers.map((writer, idx) => {
                  return (
                    <li key={idx}>writer: { writer}</li>
                  )
                })
              }
            </ul>
          </div>
          <div >
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
          <div >
            <ul>
              {
                book.donators.map((donator, idx) => {
                  return (
                    <li key={idx}>donator: { donator}</li>
                  )
                })
              }
            </ul>
          </div>
          <div >


          </div>

          
      </div>
  )
}

export default ItemBook