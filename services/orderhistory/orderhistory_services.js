const db = require('../../db')


module.exports.getorderhistoryByClientID = async(id)=> {
    const [rows] = await db.query('SELECT order_id,order_date,order_item * FROM orderhistory JOIN clients c ON o.client_id = c.client_id',[id])
return rows;
}

module.exports.getorderhistoryById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM orderhistory WHERE order_id = ?',[id])
    return rows;
}



