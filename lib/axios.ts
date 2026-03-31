import axios from "axios"

const username =  process.env.API_USERNAME;
const password =  process.env.API_PASSWORD;

export const api = axios.create({
  baseURL: "http://ec2-50-19-36-138.compute-1.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
  },
})
