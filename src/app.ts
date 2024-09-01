
import express, { Request, Response } from 'express'
import { UserRoute } from './models/user/user.route'
const app = express()

app.use(express.json())


app.use('/api/', UserRoute)

app.get('/', (req : Request, res : Response) => {
  res.send('this is my first mongoose assignment')
})





export default app