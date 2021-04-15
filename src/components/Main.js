import React, { Component}  from 'react'
import {Link} from 'react-router-dom'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf";

class MainLib extends Component{
    state ={}
    componentDidMount =()=>{
        //updateeeee
        this.props.onRefreshBooks();
    }
    updateShelves = ()=>{
        const nCurrent = {
            name: "Currently Reading",
            books: this.props.books.filter(book => book.shelf === 'currentlyReading')

        };
        const nWant = {
            name: "Want to Read",
            books: this.props.books.filter(book => book.shelf === 'wantToRead')
        };
        const nRead = {
            name: "Read",
            books: this.props.books.filter(book => book.shelf === 'read')
        };
        return ([nCurrent, nWant,nRead])
    }
    render(){
        let shelves = [];
        if(this.props.books && this.props.books.length){
            shelves = this.updateShelves();
        }
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    {shelves && shelves.map((shelf)=>
                     (<BookShelf 
                        key={shelf.name} 
                        shelf={shelf} 
                        onChangeShelf = {this.props.onChangeShelf}
                     /> ))}
                   
                </div>
                </div>
              <div className="open-search">
                <Link to="search">
            <label>
              Add new books
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </label>
            <button>Add new Book</button>
          </Link>
            </div>
          </div>
        )
    }
}
export default MainLib;
