const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const news = require('./data.json');

// app.use(express.json());


// rnrabi913
// u6k8R9F4EH493vxd



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rnrabi913:<password>@cluster0.rjjtc94.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use(cors())
app.use(express.json());



app.get('/news' , (req , res)=>{
    res.send(news);
})

// app.post('/news' , (req , res) =>{
//     console.log('post is hitting')
//     const newUser = req.body;
//     news.push(newUser);
//     res.send(newUser)
// })
app.post('/news', (req, res) =>{
    console.log('post api hitting')
    // console.log(req.body);
    const newUser = req.body;
    newUser.id = news.length + 1;
    news.push(newUser);
    res.send(newUser);
})






app.listen(port , ()=>{
    console.log('news server listen is ok')
})