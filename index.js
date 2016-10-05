const ghost = require("ghost")
const path = require("path")

ghost({
  config: path.resolve(__dirname, "config.js")
})
.then(server => server.start())
