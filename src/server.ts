// getting-started.js
import mongoose  from "mongoose";
import app from "./app";
import config from "./app/config";
const port = 5000

// main().catch(err => console.log(err));

async function main() {
  try{
    await mongoose.connect(config.database_url as string);

    app.listen(port, () => {
        console.log(`Assignment 4 is running on port : ${config.port}`)
      })

  }catch(error){
    console.log(error);
  }
 
}

main()