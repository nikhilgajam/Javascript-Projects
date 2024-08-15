var http = require('http')
var url = require('url')
// const { route } = require('./router')

let count = 0

function startServer(route){

    function onRequest(request, response){
        count++
        // var pathname = url.parse(request.url).pathname
        var pathname = request.url
        console.log("Request recieved " + count + " time(s) for " + pathname)
        route(pathname)
        // response.writeHead(200, {"Content-Type": "text/plain"})
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("<h1>Hello World</h1>")
        response.end()
    }
    http.createServer(onRequest).listen(8888)
    
    console.log("Server started on localhost with port 8888")
    console.log("Type this url in your browser: http://localhost:8888/")

}

// To make this as a module we use below code
exports.startServer = startServer
