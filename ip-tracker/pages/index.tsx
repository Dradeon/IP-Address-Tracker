import axios, { AxiosError, AxiosResponse } from 'axios';
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { SyntheticEvent, useEffect, useState } from 'react';
const Map = dynamic(() => {
  return import("../components/map");
},{ssr: false});
import states from '../data/states';


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

const shortStateName = (stateName: string | undefined) => {
  if (!stateName){
    return "";
  }
  const state = states.filter(state => {
    return state[0] === stateName;
  });
  console.log(state);
  if(state.length == 0){
    return "";
  }
  return state[0][1];
}


const Home: NextPage = () => {
  
  const [address, setAddress] = useState<String>("");
  const [data, setData] = useState<Data>({"error": undefined});

  const changeAddress = (e : React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
    console.log(e.currentTarget.value);
  }

  const QueryLocation = async (e : SyntheticEvent) => {
    e.preventDefault();
    axios.get(`/api/IP/${address}`).then((res : AxiosResponse)=>{
      console.log(res.data)
      setData(
        {"ip": res.data.ip,
        "location": {
          "country" : res.data.location.country,
          "region" : res.data.location.region,
          "city" : res.data.location.city,
          "lat" : res.data.location.lat,
          "lng" : res.data.location.lng,
          "postalCode" : res.data.location.postalCode,
          "timezone" : res.data.location.timezone,
        },
        "isp": res.data.isp,
        'error': undefined,
      });
    }).catch((err : AxiosError) =>{
      setData({"error": err.cause});
      console.log(err);
    });
  }

  return (
    <>
      <div className='flex flex-col items-center min-w-full h-[250px] z-10 bg-hero-pattern bg-cover'>
        <h1 className='font-rubik text-white font-medium text-4xl my-8'>IP Address Tracker</h1>
        <form className='w-[90%] h-auto mb-4 flex flex-col items-center' autoComplete='false' onSubmit={QueryLocation}>
          <span className='w-full max-w-lg align-middle'>
            <input className='inline border-none rounded-l-2xl p-4  w-[84%] max-w-[500px]' placeholder='Search for any IP address or domain' pattern='(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}' type={'text'} onChange={changeAddress}></input>
            <button className='inline bg-black rounded-r-2xl p-5' type='submit'><img className='' src='/icon-arrow.svg'></img></button>
          </span>
        </form>
        <div className='flex flex-col items-center text-center bg-white px-8 py-4 rounded-[5vw] shadow-md w-[90%] max-w-5xl space-y-4 md:space-y-0 md:text-left md:flex-row md:items-center md:justify-center md:space-x-8'>
          {/** IP Address */}
          <div className='min-h-fit md:min-h-full'>
            <h2 className='font-rubik font-bold text-DarkGray text-xs'>IP ADDRESS</h2>
            <p className='font-rubik font-medium text-VeryDarkGray text-xl'>{data.ip ? data.ip : " "}</p>
          </div>
          {/** Location */}
          <div className='flex flex-row justify-between min-h-fit md:min-h-full'>
            <div className='hidden md:block min-h-[90%] border-[1px] opacity-50 border-DarkGray mr-4'></div>
            <div className=''>
              <h2 className='font-rubik font-bold text-DarkGray text-xs'>LOCATION</h2>
              <p className='font-rubik font-medium text-VeryDarkGray text-xl'>{ `${data.location?.city ? data.location.city + ", " : ""} ${shortStateName(data.location?.region)} ${data.location?.postalCode ? data.location.postalCode : ""}`}</p>
            </div>
          </div>
          {/** Timezone */}
          <div className='flex flex-row justify-between min-h-fit md:min-h-full'>
            <div className='hidden md:block min-h-[90%] border-[1px] opacity-50 border-DarkGray mr-4'></div>
            <div className=''>
              <h2 className='font-rubik font-bold text-DarkGray text-xs'>LOCATION</h2>
              <p className='font-rubik font-medium text-VeryDarkGray text-xl'>{data.location?.timezone ? `UTC ${data.location.timezone}` : " "}</p>
            </div>
          </div>
          {/** ISP */}
          <div className='flex flex-row justify-between min-h-fit md:min-h-full'>
            <div className='hidden md:block min-h-[90%] border-[1px] opacity-50 border-DarkGray mr-4'></div>
            <div className=''>
              <h2 className='font-rubik font-bold text-DarkGray text-xs'>LOCATION</h2>
              <p className='font-rubik font-medium text-VeryDarkGray text-xl'>{data.isp ? data.isp : " "}</p>
            </div>
          </div>

          
        </div>
      </div>
      <div className=''>
        <Map lat={data.location?.lat} lng={data.location?.lng}/>
      </div>
    </>
  )
}

export default Home
