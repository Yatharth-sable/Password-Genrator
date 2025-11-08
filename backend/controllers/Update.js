
// // get the password
// app.get('/', async(req, res) => {
//     const db = client.db(dbName)
//     const collection = db.collection('passwords');
//     const finalResult = await collection.find({}).toArray();
//     res.send(finalResult)
// })

// // save the password
// app.post('/', async(req, res) => {
//   const password = req.body
//     const db = client.db(dbName)
//     const collection = db.collection('passwords');
//     const finalResult = await collection.insertOne(password);
//     res.send({succees:true , finalResult})
// })

// // update the data
// app.put('/',async(req,res)=> {
  
//   const { id, password,site,username} = req.body;
//   if (!id || !password || !site || !username) {
//     console.log("is is not found",req.body)
//     return  
//   }
//       try{
//         const db = client.db(dbName)
//     const collection = db.collection('passwords');
//     const finalResult = await collection.findOneAndUpdate({ id }, { $set: { password, site, username } }, { returnDocument: "after" ,upsert: false } )
//     res.send({success:true , finalResult})
//       }
//        catch(err){
//          console.log(err)
//          res.json({
//           succes:false,
//           message:err.message
//          })
//        }
// })

// app.delete('/', async(req, res) => {
//   const id = req.body.id
//     const db = client.db(dbName)
//     const collection = db.collection('passwords');
//     const finalResult = await collection.deleteOne({id});
//     res.send({succees:true , finalResult})
// })
