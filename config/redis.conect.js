import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config()
const REDISUSER = process.env.REDISUSER
const REDISPASSWORD = process.env.REDISPASSWORD
const REDISHOST = process.env.REDISHOST
const REDISPORT = process.env.REDISPORT
const redisUrl = `redis://${ REDISUSER }:${ REDISPASSWORD }@${ REDISHOST }:${ REDISPORT }`
export const redisConnection = async () => {
    const client = createClient({ url: redisUrl })

    client.on('error', (err) => console.log('redis error', err))

    await client.connect()
        .then(() => console.log('connected! to redis 🟢'))
        .catch((Error) => console.log(Error))
}



