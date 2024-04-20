const db = require('../../db')


module.exports.getAllbooks = async()=> {
    const [rows] = await db.query('SELECT * FROM books')
return rows;
}

module.exports.getbookById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM books WHERE book_id=?',[id])
    return rows;
}

module.exports.addbook = async(newBook)=>{
    const [rows]=await db.query('INSERT INTO books SET ?',newBook)
    return rows;
}

module.exports.updatebook = async ( bookData, book_id) => {
    const query = "UPDATE books SET ? WHERE book_id = ?";
    const [{affectedRows}] = await db.query(query, [bookData, book_id]);
    return affectedRows;
};

module.exports.deletebook=async(book_id)=>{
    const [{affectedRows}] =await db.query('DELETE FROM books WHERE book_id=?',[book_id])
    return affectedRows;
}

