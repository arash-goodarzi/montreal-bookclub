import React,{useMemo} from 'react'
import { useTable,useSortBy,useGlobalFilter,useFilters,usePagination } from 'react-table'
import ColumnFilter from '../../components/navbar/ColumnFilter';
import GlobalFilter from '../../components/navbar/GlobalFilter';
import { BsChevronDoubleLeft,BsChevronDoubleRight } from "react-icons/bs";

const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        Filter: ColumnFilter
    },
    {
        Header: 'Username',
        Footer: 'Username',
        accessor: 'username',
        Filter: ColumnFilter
    },
    {
        Header: 'Roles',
        Footer: 'Roles',
        id:'roles',
        accessor: data => {
          let output = [];
          data.roles.map(book=>output.push(book.name))
            return output.join(', ');
        },
        Filter: ColumnFilter
    },
    {
      Header: 'Books',
      Footer: 'Books',
      id:'books',
      accessor: data => {
        let output = [];
        data.books.map(book=>output.push(book.title))
          return output.join(', ');
      },
      Filter: ColumnFilter
    },
]

// const GROUPED_COLUMNS = [
//     {
//         Header: 'Id',
//         Footer: 'Id',
//         accessor: 'id',
//         Filter: ColumnFilter
//     },  
//     {
//         Header: 'Personal Information',
//         Footer: 'Personal Information',
//         columns: [
//                 {
//                     Header: 'Name',
//                     Footer: 'Name',
//                     accessor: 'name',
//                     Filter: ColumnFilter
//                 },
//                 {
//                     Header: 'Username',
//                     Footer: 'Username',
//                     accessor: 'username',
//                     Filter: ColumnFilter
//                 },          
//         ]
//     },
//     {
//         Header: 'Other Information',
//         Footer: 'Other Information',
//         columns: [
//                 {
//                     Header: 'Roles',
//                     Footer: 'Roles',
//                     id:'roles',
//                     accessor: data => {
//                       let output = [];
//                       data.roles.map(book=>output.push(book.name))
//                         return output.join(', ');
//                     },
//                     Filter: ColumnFilter
//                 },
//                 {
//                   Header: 'Books',
//                   Footer: 'Books',
//                   id:'books',
//                   accessor: data => {
//                     let output = [];
//                     data.books.map(book=>output.push(book.title))
//                       return output.join(', ');
//                   },
//                   Filter: ColumnFilter
//                 },          
//         ]      
//     }
// ]

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8080/api/users');
  const users = await res.json();
  return {
    props: {
      users:users
    }
  }
}

const UserList = ({ users }) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(()=> users, [])

    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            pageIndex:0
          }
    },useFilters,useGlobalFilter,useSortBy,usePagination)

    const {getTableProps,getTableBodyProps,headerGroups,footerGroups,rows,prepareRow,state,setGlobalFilter,page,nextPage,previousPage,canNextPage,canPreviousPage,pageOptions,gotoPage,pageCount,setPageSize} = tableInstance

    const {globalFilter,pageIndex,pageSize} =state
    // const {} = state
    return (
      <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup,idx) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                        {headerGroup.headers.map((column,indx) => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} key={indx}>
                            <div>{column.render('Header')}
                              <span >
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                  : ''}
                              </span>

                              <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </div>
                          </th> 
                        ))}
                  </tr> 
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {
                    page.map((row,idx) => {
                        prepareRow(row)

                        return (
                            <tr {...row.getRowProps()} key={idx}>
                                {
                                    row.cells.map((cell,indx) => {
                                        return (<td {...cell.getCellProps()} key={indx}>{cell.render('Cell')}</td>)
                                        
                                    })
                                }
                            </tr>
                        )
              
                    })                  
              }
                
          </tbody>
          {/* <tfoot>
            {footerGroups.map((footerGroup,idx) => (
              <tr {...footerGroup.getFooterGroupProps()} key={idx}>
                {footerGroup.headers.map((column,indx) => (
                  <td {...column.getFooterProps()} key={indx}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>    
        <div style={{display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-success" style={{ width: '80px',margin:'10px 5px 10px 5px'}}><BsChevronDoubleLeft />{' '}First</button>
          <button onClick={()=>previousPage()} disabled={!canPreviousPage} className="btn btn-success" style={{width:'120px',margin:'10px 5px 10px 5px'}}>Previous</button>
          <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))} className='form-select form-select-sm' style={{width:'80px',margin:'10px 5px 10px 5px'}}>
            {
              [10, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))
            }
          </select>
          <span style={{margin:'10px 5px 10px 5px'}}>
            &nbsp;Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
              &nbsp;
            </strong>
          </span>
          <span style={{margin:'10px 5px 10px 5px'}}>
            Go to page:{' '}
            <input type='number' defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
              }} style={{width:'50px'}} />
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-success" style={{ width: '120px',margin:'10px 5px 10px 5px' }}>Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-success" style={{ width: '80px',margin:'10px 5px 10px 5px' }}>Last{' '}<BsChevronDoubleRight /></button>
        </div>
      </>
  )
}

export default UserList