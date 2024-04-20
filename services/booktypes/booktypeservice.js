const db = require('../../db')


module.exports.getAllbooktype = async()=> {
    const [rows] = await db.query('SELECT * FROM booktypes')
return rows;
}

module.exports.getbooktypesById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM booktypes WHERE typeID=?',[id])
    return rows;
}

module.exports.addbooktype = async(newtTypename)=>{
    const [rows]=await db.query('INSERT INTO booktypes SET ?',newtTypename)
    return rows;
}

module.exports.updatebooktype = async(booktypeData,TypeID) => {
    const query = "UPDATE booktypes SET ? WHERE typeID = ?";
    const [{affectedRows}] = await db.query(query, [booktypeData,TypeID]);
    return affectedRows;
};

module.exports.deletebooktype= async(typeID)=>{
    const [{affectedRows}] =await db.query('DELETE FROM booktypes WHERE TypeID=?',[typeID])
    return affectedRows;
}


