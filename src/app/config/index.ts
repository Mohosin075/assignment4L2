
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path : path.join(process.cwd(), '.env')});

export default {
    node_env : process.env.NODE_Env,
    port : process.env.DB_Port,
    database_url : process.env.DB_Url,
    salt_round : process.env.SALT_ROUND
}