const db = require('../../db')


module.exports.addsale = async(newSale)=>{
    const [rows]=await db.query('INSERT INTO sales SET ?',newSale)
    return rows;
}




