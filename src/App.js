import React, { Component}  from 'react'
import { BrowserRouter as  Switch, Route } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainLib from './components/Main'
import * as bookList from './BookList'
import Search from './components/Search'
class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount = () =>{
    if(this.state.newBook){
      this.refreshBooks();
    }
  }
  //maintain my state and any functions that affect it
  //get back all books sorted
  refreshBooks = ()=>{
    BooksAPI.getAll().then((list)=>{
      this.setState({
        books:bookList.sortAllBooks(list),
        newBook: false
      })
    })
  }
  changeShelf = (book,shelf)=>{
    //get update from API
    BooksAPI.update(book, shelf).then(res => {
      let newList = this.state.books.slice(0);
      const books = newList.filter(listBook => listBook.id === book.id);
      if(books.length){
        books[0].shelf = shelf;
      }else{
        newList.push(book);
        newList = bookList.sortAllBooks(newList);
      }
      this.setState({
        books: newList
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Switch>
        <Route path='/' render={(()=>( <MainLib 
             books={this.state.books} 
             onRefreshBooks={this.refreshBooks} 
             onChangeShelf = {this.changeShelf} />))} />
         <Route path='/search' render={()=>( 
         <Search 
            selectedBooks={this.state.books} 
            onChangeShelf={this.changeShelf} />)} />
          </Switch>
      </div>
    )
  }
}

export default BooksApp
