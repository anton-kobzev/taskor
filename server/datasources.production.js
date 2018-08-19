const mongodbUrl = process.env.MONGODB_URL

if (mongodbUrl) {
    console.log("Using MongoDB url")

    module.exports = {
        db: {
            name: "db",
            connector: "mongodb",
            url: mongodbUrl
        }
    }
} else {
    console.log("No MongoDB url specified")
}
