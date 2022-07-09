import { useState } from 'react'
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState("")
  const [playerData, setPlayerData] = useState({})

  // Change key to realize request
  const API_KEY = 'RGAPI-a0c87a16-01a0-4cd5-8eae-a1604e966877'

  function searchForPlayer(event: any) {
    var APICallString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY
    axios.get(APICallString).then((response) => {
      setPlayerData(response.data)
    }).catch((error) => {
      console.log(error);
      setPlayerData({})
    })
  }

  return (
    <>
      <div className='flex h-full w-full items-center justify-center flex-col gap-5 '>
        <h1 className='font-bold text-xl text-gray-900'>Pesquise seu perfil no League of Legends</h1>
        <input type="text" className='border border-gray-900 rounded-md h-[3rem] px-3 text-gray-900 outline-none' onChange={e => setSearchText(e.target.value)} />
        <button onClick={e => searchForPlayer(e)} className='h-[3rem] px-4 text-white rounded-md bg-gray-900 '>Search</button>
        {JSON.stringify(playerData) != '{}'
          ? <>
            <div className='flex flex-col items-center justify-center p-8 bg-gray-900 rounded-md'>
              <h1 className='font-medium text-[2rem] mb-5 text-center text-white'>{playerData.name}</h1>
              <img className='rounded-md h-40 text-white border border-red-600' src={"https://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/" + playerData.profileIconId + ".png"} />
              <p className='text-lg font-semibold text-white mt-3'>Nível: {playerData.summonerLevel}</p>
            </div>
          </>
          : <p className='text-lg p-8 text-white bg-gray-900 rounded-md'>Não obtivemos resposta 🤷‍♀️</p>
        }
      </div>
    </>
  )
}

export default App
