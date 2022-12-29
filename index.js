const express = require("express")
const bookRoutes = require("./routes/books.routes")
const app = express()

app.use(express.json());


app.use("/api/books", bookRoutes);


const PORT = 8080;


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})