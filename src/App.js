import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import './App.css'

function App() {
  const [postsPerPage] = useState(4);
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );

    return (
      <button
        type="button"
        style={{ backgroundColor: 'pink' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  const getPostData = (data) => {
    return (
      data.map(post => <div className="container" key={post.id}>
        <Accordion defaultActiveKey="1">
          <Card>
            <Card.Header>
              <ul>
                <li>Hello</li>
                <li>CONTACT  <span>{post.name}</span></li>
                <li>CITY  <span>{post.address.city}</span></li>
                <li>STATE <span>{post.address.zipcode }</span></li>
                <li> <CustomToggle eventKey="0">View detail</CustomToggle></li>
              </ul>

            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div>
                  <h3>Description</h3>
                  <p>no description detail</p>
                  <ul>
                    <li>Contact Person <span>{post.name}</span></li>
                    <li>Address <p className='span-list'>
                    <span>{post.address.suite}</span><span>{post.address.city}</span><span>{post.address.zipcode}</span></p></li>
                    <li>Designation <span>no detail</span></li>
                    <li>City<span>{post.address.city}</span></li>
                    <li>Email <span>{post.email}</span></li>
                    <li>State <span>{post.address.zipcode}</span></li>
                    <li>Phones <span>{post.phone}</span></li>
                    <li>Country <span>country</span></li>
                   
                  </ul>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>)
    )

  }

  const getAllPosts = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    const data = res.data;
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

    // For displaying Data
    const postData = getPostData(slice)

    // Using Hooks to set value
    setAllPosts(postData)
    setPageCount(Math.ceil(data.length / postsPerPage))
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1)
  };

  useEffect(() => {
    getAllPosts()
  }, [offset])

  return (
    <div className="main-app container">

      {/* Display all the posts */}
      <div className='row'>
      <div className='col-md-12'> {posts}</div>
      <div className='col-md-12'>  <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} /></div>
      </div>
     

      {/* Using React Paginate */}
    
    </div>
  );
}

export default App;