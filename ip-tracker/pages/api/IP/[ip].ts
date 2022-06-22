import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';
import axios, { AxiosError, AxiosResponse } from 'axios';


const cors = Cors({
  methods: ['GET'],
})

function runMiddleware(req: any, res: any, fn: (arg0: any, arg1: any, arg2: (result : any) => void) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

type Data = {
  "ip"?: string,
  "location"?: {
    "country" ?: string,
    "region" ?: string,
    "city" ?: string,
    "lat" ?: number,
    "lng" ?: number,
    "postalCode" ?: string,
    "timezone" ?: string,
  },
  "isp"?: string,
  'error': Error | undefined,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {ip} = req.query;
  console.log(ip);

  const BASE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${ip}`;

  await runMiddleware(req, res, cors);
  return axios.get(BASE_URL).then((response:AxiosResponse) => {
    console.log(res);
    res.status(200).json({...response.data, error:undefined});
  }).catch((err:AxiosError) => {
    console.log(err)
    res.status(400).json({error: err.cause});
  });
}
