function query(connection, query){
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if(err) rejects(err);
            //Store Query Results and return
            resolve(rows)
        })
    })
}

module.exports = query;