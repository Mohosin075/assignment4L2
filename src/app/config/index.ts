
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path : path.join(process.cwd(), '.env')});

export default {
    node_env : process.env.NODE_Env,
    port : process.env.DB_Port,
    database_url : process.env.DB_Url,
    salt_round : process.env.SALT_ROUND,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
}