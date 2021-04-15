export const sortAllBooks = (list)=>{
    const newList = list.sort((a,b)=>{
        const bookA = a.title.toUpperCase();
    const bookB = b.title.toUpperCase();
        if(bookA < bookB){
            return -1;
        }
        if(bookA > bookB){
            return 1;
        }
        return 0;
    })
    return newList;
}
export const mergeShelf =(shelf, search) =>{
    const hash = {};
    shelf.forEach(book =>hash[book.id] = book.shelf);
    search.forEach(book => {
        book.shelf = hash[book.id] || 'none';
    });
    return search;
}