
import express, { Request, Response } from 'express'
const app = express()


app.get('/', (req : Request, res : Response) => {
  res.send('this is my first mongoose assignment')
})


export default app