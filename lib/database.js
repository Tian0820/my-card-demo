const AV = require('leancloud-storage')

function execQuery(cql, pvalues, callback) {
    AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
        // results 即为查询结果，它是一个 AV.Object 数组
        let results = data.results;
        callback(null, results)
    }, function (error) {
        callback(error)
    });
}

exports.getByName = function (name) {
    return new Promise(function (resolve, reject) {
        let cql = 'select * from Friend where name = ?';
        execQuery(cql, [name], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        let cql = 'select * from Friend';
        execQuery(cql, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

exports.deleteById = function (objectId) {
    return new Promise(function (resolve, reject) {
        let cql = 'delete from Friend where objectId = ?';
        execQuery(cql, [objectId], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

exports.updateFriend = function (name, sex, tags, objectId) {
    return new Promise(function (resolve, reject) {
        let cql = 'update Friend set name=?,sex=?,tags=? where objectId=?';
        execQuery(cql, [name, sex, tags, objectId], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

exports.addNewFriend = function (name, sex, tags) {
    return new Promise(function (resolve, reject) {
        let cql = 'insert into Friend(name, sex, tags) values (?, ?, ?)';
        execQuery(cql, [name, sex, tags], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}



