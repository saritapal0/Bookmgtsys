const db = require('../../db')


module.exports.addpurchase = async(newPurchase)=>{
    const [rows]=await db.query('INSERT INTO sales SET ?',newPurchase)
    return rows;
}




