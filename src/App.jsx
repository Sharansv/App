import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'

function App() {

  let [city, setCity] = useState('')
  let [wDetails, setWdetails] = useState()
  let [isLoading, setIsLoading] = useState(false)
  let [counter, setCounter] = useState(1)
  let getData = (event) => {
    setIsLoading(true)
    // console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((response) => response.json())
      .then((finalResponse) => {
        console.log(finalResponse);
        if (finalResponse.cod == "404") {
          setWdetails(undefined)
        } else {
          setWdetails(finalResponse)
        }
        setIsLoading(false)
      })

    event.preventDefault()
    setCity('')    //to set city inbox blank after enter city name and submit
  }


  let changeCounter = () => {
    setCounter(counter + 1)
  }

  useEffect(() => {
    console.log("Welcome to UseEffect");

  }, [counter])



  return (
    <>
      <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
        {counter}
        <button onClick={changeCounter}>Count</button>

        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white' >Simple Weather App</h1>

          <form onSubmit={getData}>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name' /> <button className='bg-[#6A9C89] p-[8px]'>Submit</button>
          </form>

          <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

            <img src="https://i.gifer.com/ZKZg.gif" alt="" width={100} className={`absolute left-[150px] ${isLoading ? '' : 'hidden'} `} />

            {wDetails !== undefined
              ?
              <>
                <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
                <h2 className='font-bold text-[40px]'>{wDetails.main.temp}</h2>
                <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt="" />
                <p>{wDetails.weather[0].description}</p>
              </>
              :
              "No City Found"
             
            }


          </div>
        </div>
      </div>
    </>
  )
}

export default App
