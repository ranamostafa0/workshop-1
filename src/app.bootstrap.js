import { NODE_ENV, port } from '../config/config.service.js'
import { checkDBConnection, checkDBSync } from './DB/connection.db.js'
import { courseRouter, studentRouter } from './modules/index.js'
import express from 'express'

async function bootstrap() {
    const app = express()
    //convert buffer data
    app.use(express.json())
    //application routing

    // db
    await checkDBConnection()
    await checkDBSync()


    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/student', studentRouter)
    app.use('/course', courseRouter)


    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error,
            error_message: status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
            stack: error.stack 
        })
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap