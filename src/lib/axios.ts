import axios from "axios"

const toBase64 = (str: string) => Buffer.from(str).toString("base64")
const userName = process.env.NEXT_PUBLIC_API_USERNAME
const password = process.env.NEXT_PUBLIC_API_PASSWORD

export const api = axios.create({
  baseURL: "http://ec2-50-19-36-138.compute-1.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${toBase64(`${userName}:${password}`)}`,
  },
})