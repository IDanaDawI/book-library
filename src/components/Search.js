import React, { Component}  from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import * as bookList from '../BookList'
import Book from "./Book"
import '../App.css'

class Search extends Component{
    state={
      q: "",
      books: [],
      quickView: {},
      showModal: false
    };
    qTimer = null;
    changeQ = (value) =>{
      clearTimeout(this.qTimer);
      this.setState({q: value});
      this.qTimer = setTimeout(this.updateSearch, 250);
    }
    updateSearch=()=>{
      if(this.state.q === ""){
        this.setState({error: false, books: []});
        return;
      }
      BooksAPI.search(this.state.q).then(response =>{
        let newList = [];
        let nErr = false;
        if(response === undefined || (response.error && response.error !== "no output")){
          nErr = true;
        }else if(response.length){
          newList = bookList.mergeShelf(this.props.selectedBooks, response)
          //console.log(newList);
          newList = bookList.sortAllBooks(newList);
        }
          this.setState({error: nErr, books: newList})
      })
    }
   
      render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/">
            <button className="close-search">
              Close
            </button>
          </Link>
              <div className="search-books-input-wrapper">
               
                <input type="text" placeholder="Search by title or author" onChange={(e)=>this.changeQ(e.target.value)} value={this.state.q.value} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books && this.state.books.map(book => (<li key={book.id}>
                  <Book book={book} 
                        onChangeShelf={this.props.onChangeShelf}/>
                </li>))}
              </ol>
            </div>
          </div>
        )
    }
}
export default Search;