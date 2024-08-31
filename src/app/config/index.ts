
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path : path.join(process.cwd(), '.env')});

export default {
    port : process.env.DB_Port,
    database_url : process.env.DB_Url
}