const db = require('../../db')


module.exports.getcartById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM carts WHERE cart_id=?',[id])
    return rows;
}

module.exports.addcart = async(newCart)=>{
    const [rows]=await db.query('INSERT INTO carts SET ?',newCart)
    return rows;
}
module.exports.removecart = async(removeCart)=>{
    const [rows]=await db.query('Delete INTO carts SET ?',removeCart)
    return rows;
}

module.exports.emptycart = async(newCart)=>{
    const [rows]=await db.query('INSERT INTO carts SET ?',newCart)
    return rows;
}




