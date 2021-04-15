import React, { Component}  from 'react'
//import * as BooksAPI from '../BooksAPI'


class Changer extends Component{
    state ={
        shelfSelect :this.props.book.shelf || 'none'
    }
    onChangeShelf=(book,shelf)=>{
        this.setState({
            shelfSelect : shelf
        });
        this.props.onChangeShelf(book,shelf);
    }
    render(){
        return(
            <div className="book-shelf-changer">
                              <select value={this.state.shelfSelect} onChange={(e)=>this.onChangeShelf(this.props.book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
        )
    }
}
export default Changer;
