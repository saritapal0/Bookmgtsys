const db = require('../../db')


module.exports.getAllcarts = async()=> {
    const [rows] = await db.query('SELECT * FROM carts')
return rows;
}

module.exports.getcartById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM carts WHERE cart_id=?',[id])
    return rows;
}

module.exports.addcart = async(newCart)=>{
    const [rows]=await db.query('INSERT INTO carts SET ?',newCart)
    return rows;
}

module.exports.updatecart = async ( cartData, cart_id) => {
    const query = "UPDATE carts SET ? WHERE cart_id = ?";
    const [{affectedRows}] = await db.query(query, [cartData, cart_id]);
    return affectedRows;
};

module.exports.deletecart=async(cart_id)=>{
    const [{affectedRows}] = await db.query('DELETE FROM carts WHERE client_id=?',[cart_id])
    return affectedRows;
}

