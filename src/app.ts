
import express, { Request, Response } from 'express'
import { courseRoute } from './models/course/course.route'

const app = express()

app.use(express.json())


app.use('/api/', courseRoute)

app.get('/', (req : Request, res : Response) => {
  res.send('this is assignment 3')
})





export default app