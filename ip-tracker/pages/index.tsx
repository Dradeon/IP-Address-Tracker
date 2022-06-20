import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
const Map = dynamic(() => {
  return import("../components/map");
},{ssr: false});
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const QueryLocation = () => {

}



const Home: NextPage = () => {
  return (
    <>
      <div className='flex flex-col items-center min-w-full h-[250px] z-10 bg-hero-pattern bg-cover'>
        <h1 className='font-rubik text-white text-4xl my-8'>IP Address Tracker</h1>
        <form className='mb-4'>
          <span>
            <input className='inline border-none rounded-l-lg h-8' type={'text'}></input>
            <img className='inline bg-black rounded-r-lg p-4' src='/icon-arrow.svg' onClick={QueryLocation}></img>
          </span>
        </form>
        <div className='text-center bg-white px-8 py-4 rounded-[5vw] shadow-md min-w-[90%] space-y-4'>
          <div>
            <h2 className='font-rubik font-bold text-DarkGray text-xs'>IP ADDRESS</h2>
            <p className='font-rubik font-medium text-VeryDarkGray text-xl'>192.212.174.101</p>
          </div>
          <div>
            <h2 className='font-rubik font-bold text-DarkGray text-xs'>LOCATION</h2>
            <p className='font-rubik font-medium text-VeryDarkGray text-xl'>Brooklyn, NY 10001</p>
          </div>
          <div>
            <h2 className='font-rubik font-bold text-DarkGray text-xs'>TIMEZONE</h2>
            <p className='font-rubik font-medium text-VeryDarkGray text-xl'>UTC -05:00</p>
          </div>
          <div>
            <h2 className='font-rubik font-bold text-DarkGray text-xs'>ISP</h2>
            <p className='font-rubik font-medium text-VeryDarkGray text-xl'>SpaceX Starlink</p>
          </div>
        </div>
      </div>
      <div className='w-full h-full -z-10'>
        <Map/>
      </div>
    </>
  )
}

export default Home
