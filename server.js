const PORT = process.env.PORT || 3001;
const URI = false ? "https://go-docdoc.web.app" : "http://localhost:3000";
const io = require("socket.io")(PORT, {
  cors: {
    origins: ["https://go-docdoc.web.app"],
    // methods: ["GET", "POST"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "https://example.com",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    },
  },
});


io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (value) => {
      console.log(value)
      socket.broadcast.to(documentId).emit("receive-changes", value);
    });
  });
});
