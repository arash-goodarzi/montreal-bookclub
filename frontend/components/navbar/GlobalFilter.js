import React from 'react'

const GlobalFilter = ({filter,setFilter}) => {
  return (
    <>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
          </div>
          <input value={filter || ''} onChange={ (e)=>setFilter(e.target.value)} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </div>
    </>
  )
}

export default GlobalFilter