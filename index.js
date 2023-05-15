// require express
const express = require('express');

// app use express
const app = express()

// here is the port 
const port = process.env.PORT || 5000

// require cors 
const cors = require("cors")

// midiilewer
app.use(cors())

// convert in express.jon 
app.use(express.json())

// here is the env
require('dotenv').config()

// ===============================================================================================

// here is connect mongodb starts


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

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


        // here is the database collection

        const Db = client.db("contentContainer").collection("content")

        const Db2 = client.db("adminadd").collection("vloenters")

        // here is the database collection ends

        // ============================================================================

        // here is the all res starts



        // here is the cursor for register as a volenter 
        app.get('/admin', async (req, res) => {
            const cursor = Db2.find();

            const result = await cursor.toArray();

            res.send(result)
        })
        // here is the cursor for register as a volenter ends 

        // here is the register volenters 
        app.post("/admin", async (req, res) => {

            const user = req.body

            const result = await Db2.insertOne(user)

            res.send(result)

        })
        // here is the register volenters  ends


        // here is the cursor for contents 

        app.get('/content', async (req, res) => {
            const cursor = Db.find();

            const result = await cursor.toArray();

            res.send(result)
        })


        // here is the cursor ends



        // here is the post method starts
        // this post is for admin add event
        app.post("/content", async (req, res) => {

            const user = req.body

            const result = await Db.insertOne(user)

            res.send(result)

        })
        // this post is for admin add event ends

        // here is the post method ends


        // here is delete for admin
        // only for admin

        app.delete('/admin/:id', async (req, res) => {

            const id = req.params.id

            const filter = { _id: new ObjectId(id) }
            const result = await Db.deleteOne(filter)
            res.send(result)

        })

        // here is delete for admin ends



        // here is the content 



        // here is the all res ends


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// here is connect mongodb ends

// ===============================================================================================




// server response here sending
app.get("/", (req, res) => {
    res.send("server is runnign ")
})

app.listen(port, () => {
    console.log(`server is running on port ${[port]}`);
})





