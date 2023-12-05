import mongoose from 'mongoose';

const uri = 'mongodb+srv://harisrana87:harrishassan@practice1.pri08fh.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connection successful......');
    // Perform any database operations here
  } catch (error) {
    console.error('No Connection');
  }
}

connect();