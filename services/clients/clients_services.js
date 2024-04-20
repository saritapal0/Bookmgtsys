const db = require('../../db')


module.exports.getAllclients = async()=> {
    const [rows] = await db.query('SELECT * FROM clients')
return rows;
}

module.exports.getclientById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM clients WHERE client_id=?',[id])
    return rows;
}

module.exports.addclient = async(newClient)=>{
    const [rows]=await db.query('INSERT INTO clients SET ?',newClient)
    return rows;
}

module.exports.updateclient = async ( clientData, client_id) => {
    const query = "UPDATE clients SET ? WHERE client_id = ?";
    const [{affectedRows}] = await db.query(query, [clientData, client_id]);
    return affectedRows;
};

module.exports.deleteclient=async(client_id)=>{
    const [{affectedRows}] = await db.query('DELETE FROM clients WHERE client_id=?',[client_id])
    return affectedRows;
}

