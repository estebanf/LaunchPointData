module.exports = {
  psql: {
      host: process.env.DBHOST || "everteampostdb.crfk3ijcwlp6.us-east-1.rds.amazonaws.com",
      port: process.env.DBPORT || 5432,
      url: process.env.DBURL || "postgres://EverTeamDBDeveloper:EverTeamDBDeveloper@everteampostdb.crfk3ijcwlp6.us-east-1.rds.amazonaws.com:5432/EverTeamPostDB",
      database: process.env.DB || "EverTeamPostDB",
      password: process.env.DBPASSWORD || "EverTeamDBDeveloper",
      user: process.env.DBUSER || "EverTeamDBDeveloper",
      connector: "postgresql"
    }
}
