const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = 4200;
const connectionString = 'mongodb+srv://Kumuthu:expressJS123@cluster0.ehhq0.mongodb.net/ExpressJsTechTalk?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
  });

  const Model = mongoose.model('myDatabase', schema);

app.get('/api/getData', async function (req, res) {
  try{
    const users = await Model.find();
    res.json(users);
  }catch(error){
    console.log(error);
  }
});

app.get('/api/user/:userId', async function(req,res){
  const { userId } = req.params;
  try{
    const user = await Model.findById(userId.toString());
    res.json(user);
  }catch(error){
    console.log(error);
  }
})

app.post('/api/saveData', async function(req, res) {
  const data = req.body;
  const document = new Model(data);

  // Insert document into database
  try{
    await Model.create({
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email
    });
    res.json({ status: "ok" });
  }catch(error){
    res.json({ status: "error" });
    console.log(error);
  }
});

app.post('/api/updateUser/:userId', async (req, res) => {
  const {firstName,lastName,email} = req.body;
  const userId = req.params.userId;

  try{
    let results = await Model.findByIdAndUpdate(userId,{
      firstName,
      lastName,
      email
    });
    res.status(200).json({status: 'ok'});
    console.log('response sent');
    results = await results.save();
    
  }catch(error){
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }

});

app.delete('/api/deleteUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await Model.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting user' });
  }
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});