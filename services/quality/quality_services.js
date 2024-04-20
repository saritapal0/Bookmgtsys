const db = require('../../db')


module.exports.getAllquality = async()=> {
    const [rows] = await db.query('SELECT * FROM quality')
return rows;
}

module.exports.getqualityById=async(id)=> {
    const [rows] = await db.query('SELECT * FROM quality WHERE QualityID=?',[id])
    return rows;
}

module.exports.addquality = async(newQuality)=>{
    const [rows]=await db.query('INSERT INTO quality SET ?',newQuality)
    return rows;
}

module.exports.updatequality = async ( qualityData, QualityID) => {
    const query = "UPDATE quality SET ? WHERE QualityID = ?";
    const [{affectedRows}] = await db.query(query, [qualityData,QualityID]);
    return affectedRows;
};

module.exports.deletequality=async(QualityID)=>{
    const [{affectedRows}] = await db.query('DELETE FROM quality WHERE client_id=?',[QualityID])
    return affectedRows;
}

