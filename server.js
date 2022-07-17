const PORT = process.env.PORT || 3001;
const io = require("socket.io")(PORT, {
  cors: {
    origin: "https://go-docdoc.web.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const data = ""
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});
