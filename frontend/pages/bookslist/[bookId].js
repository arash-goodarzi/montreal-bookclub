import { useRouter } from 'next/router'
import React from 'react'

const BookDetail = () => {
    const router = useRouter()
    const bookId = router.query.bookId

  return (
      <div>{bookId}</div>
  )
}

export default BookDetail