function connected(){
    var sql = require("mssql");
  
    // config for your database
    // var config = {
    //     user: 'admin',
    //     password: '12345',
    //     server: 'localhost', 
    //     database: 'TMDT',
    //     trustServerCertificate: true
    // };
    var config = {
        user: 'db_a90403_admin_admin',
        password: 'Giahoa123',
        server: 'sql8001.site4now.net', 
        database: 'db_a90403_admin',
        trustServerCertificate: true
    };
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        else console.log("Connected !");
    });
  }
  
  module.exports={connected};
