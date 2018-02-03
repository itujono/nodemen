
const env = process.env.NODE_ENV

if (env === "production") {
    module.exports = {
        mongoURI: "mongodb://itujono:jangan@ds225078.mlab.com:25078/idea-app-prod"
    }
} else {
    module.exports = {
        mongoURI: "mongodb://localhost/idea-app"
    }
}