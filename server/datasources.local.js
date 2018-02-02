module.exports = {
  psql: {
      host: process.env.DBHOST || "qaeverteamdb.crfk3ijcwlp6.us-east-1.rds.amazonaws.com",
      port: process.env.DBPORT || 5432,
      url: process.env.DBURL || "postgres://QAEverTeamDB:QAEverTeamDB@qaeverteamdb.crfk3ijcwlp6.us-east-1.rds.amazonaws.com:5432/QAEverTeamDB",
      database: process.env.DB || "QAEverTeamDB",
      password: process.env.DBPASSWORD || "QAEverTeamDB",
      user: process.env.DBUSER || "QAEverTeamDB",
      connector: "postgresql"
    }
}

