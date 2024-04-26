const db = require('../../db')


module.exports.getcarts=async()=> {
    const [rows] = await db.query('SELECT * FROM carts')
    return rows;
}

module.exports.addcart = async(newtCart)=>{
    const [rows]=await db.query('INSERT INTO carts SET ?',newtCart)
    return rows;
}

module.exports.updatecart = async(cartData,cart_id ) => {
    const query = "UPDATE carts SET ? WHERE cart_id = ?";
    const [{affectedRows}] = await db.query(query, [cartData,cart_id ]);
    return affectedRows;
};

module.exports.deletecart= async(cart_id )=>{
    const [{affectedRows}] =await db.query('DELETE FROM carts WHERE cart_id = ?',[cart_id ])
    return affectedRows;
}


