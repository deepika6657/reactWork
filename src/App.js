import React from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { useEffect,useState } from 'react'
import './App.css'
import {Link} from 'react-router-dom'



export default function App() {

    let [data,setData]=useState([])
    let [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    let usersPerPage=10;
    const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  let npage =  Math.ceil(data.length / usersPerPage);
  
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(res=> setData(res.data))
    .catch(err=> console.log(err))
  },[]);
  let allBlogs= currentUsers.map((user,i)=>{
    return(
    <div className='blogItem' key={i}> 
    <h3>{user.id}</h3> 
    <p>{user.email} </p>
    <button><Link to={`/app/${user.id}`}  state={{ user}}>Read more</Link>  </button>
    </div>
    )
  })

  const filteredUsers = data.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
 


  return (
    <div>
      <h1 >Data fetch from API</h1>
      <br/>
      <div className="search">
       <input
          type="text"
          placeholder="Search by email ID"
           value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
      </div>  <br/>

      <div className='container'>
        {filteredUsers.slice(indexOfFirstUser, indexOfLastUser).map((user, index) => (
          <div className='blogItem' key={index}>
            <h3>{user.id}</h3>
            <p>{user.email}</p>
            <Link to={`/app/${user.id}`} state={{ user }}>
              <button className="btn btn-primary">Read more</button>
            </Link>
          </div>))}
          </div>
      <br/>


      
    <br/>
    <nav >
      <ul className="pagination">
        <li className='page-item'>
          <button onClick={previousPage} disabled={currentPage === 1}> Prev</button> 
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage} of {npage}</span>
          </li>
        
        <li className='page-item'>
          <button onClick={nextPage} className='next' disabled={currentPage===npage} > Next</button> 
          </li>
      </ul>

    </nav>
    
    </div>
  )
}
