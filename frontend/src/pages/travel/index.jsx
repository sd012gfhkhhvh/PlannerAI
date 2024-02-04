import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useRecoilState } from 'recoil';
import MarkdownEditor from '../../helper/MarkdownEditor ';
import { Loader } from '../../components/loader';
import { downloadPdf } from '../../helper/DownloadPdf';

import { travelInput, travelItinerary } from '../../store/atoms';

//icons
import { IconContext } from "react-icons";
import { IoCopy } from "react-icons/io5";
import { MdHome } from "react-icons/md";

function Travel() {
  const [itinerary, setItinerary] = useRecoilState(travelItinerary);
  const [input, setInput] = useRecoilState(travelInput)

  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [sucess, setSucess] = useState(false);

  const navigate = useNavigate();
  const targetRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(itinerary);
  }

  const handleGetItinerary = async () => {
    console.log(input);
    try {
      // if (input.place === "" || input.days === "") {
      //   alert("Please Input valid data")
      //   return;
      // }
      setIsRunning(true)
      setLoading(true);
      setShowDownloadBtn(true);
      const response = await axios.post('http://localhost:5000/getItinerary', {
        messages: [{
          "role": "system",
          "content": "Imagine you are the best travel planner in the world, who has traveled all the countries and knows everything about popular places to go, hidden gems, the best time to go, cultural places, outdoor activities, romantic destinations and activities, historic locations, and museums, wildlife attractions, cuisines to try and things and places to shop."
        },
        {
          "role": "user",
          "content": "I am planning to have a {{number_of_days}}-day trip to {{destination}}. We like to visit popular locations as well as offbeat hidden gems. We prefer medium-paced travel and are interested in visiting cultural places, seeing historic monuments, relaxing on beaches, interacting with wildlife, shopping for souvenirs, and enjoying nightlife. \nPlease plan a day-wise itinerary for the trip along with places to visit and explain the reason to visit each location. Provide the output in list format with details including: \n1. Day (e.g., Day 1)\n2. Primary city for the day\n3. Up to 4 locations to be covered day-wise in the following format:\n- Location title\n- Time to spend\n- Opening hours\n- Distance from the previous location"
        }],
        model: {
          name: 'openai/gpt-4-1106-preview',
        },
        variables: [
          {
            "name": "number_of_days",
            "value": `${input.days}`
          },
          {
            "name": "destination",
            "value": `${input.place}`
          }
        ],
      });
      const result = response.data.responseText
      setSucess(true)
      setLoading(false);
      setItinerary(result);
    } catch (error) {
      setSucess(false)
      setLoading(false);
      setShowDownloadBtn(false)
      console.error(error.message);
    }
  };

  return (
    <div className='p-4 bg-slate-900 flex flex-col justify-center items-center'>
      {/* Home button */}
      <div className='w-100 p-4 fixed top-0 left-0 text-slate-50'>
        <div onClick={() => navigate("/")} className='cursor-pointer py-1 px-2 bg-slate-800 rounded-lg hover:bg-slate-700'>
          <IconContext.Provider value={{ color: "#CBD5E1", size: "1.5em", className: "global-class-name" }}>
            <MdHome />
          </IconContext.Provider>
        </div>
      </div>

      {/* Heading */}
      <h1 className='text-2xl text-center lg:text-5xl mt-10 font-bold text-slate-200'>Generate Your Travel Itinerary</h1>

      {/* Input fields */}
      <div className='mt-4 p-4 rounded-md flex flex-wrap w-[90%] md:w-3/4 justify-center'>
        <input value={input.place} onChange={(e) => setInput((input) => { return { ...input, place: e.target.value } })} type="text" placeholder='Destination' className='bg-slate-700 text-slate-100 rounded-md w-full md:w-fit mb-2 md:mb-0 p-4 md:px-4 md:py-2 me-0 md:me-2'></input>
        <input value={input.days} onChange={(e) => setInput((input) => { return { ...input, days: e.target.value } })} type='number' placeholder='Days to Spend' className='bg-slate-700 text-slate-100 rounded-md w-full md:w-fit mb-4 md:mb-0  p-4 md:px-4 md:py-2 me-0 md:me-2'></input>
        <button onClick={handleGetItinerary} className="bg-slate-800 hover:bg-slate-900 border-2 border-blue-600 rounded-lg p-3 text-blue-200 hover:text-blue-600 w-full md:w-fit md:text-sm">Generate</button>
      </div>

      {/* Response */}
      {isRunning ?
        <div className='text-slate-100 w-[98%] md:w-3/4 bg-slate-900 p-2 rounded-md'>
          {sucess ? <h2 className='text-start font-semibold text-md md:text-xl'>Generated Itinerary of {input.place} for {input.days} Days</h2> : ""}
          <div className='bg-slate-500 rounded-md text-slate-900 p-4 mt-4 w-full max-h-80 overflow-y-scroll'>
            <div className='w-full flex justify-end'>
              <IconContext.Provider value={{ color: "#0F172A", size: "1.5em", className: "global-class-name" }}>
                <span onClick={handleCopy} className='cursor-pointer'><IoCopy /></span>
              </IconContext.Provider>
            </div>

            {loading ? <Loader /> :
              <MarkdownEditor handleGetItinerary={handleGetItinerary} targetRef={targetRef} sucess={sucess} />
            }
          </div>
        </div> :
        <div className='bg-slate-700 rounded-md text-slate-300 text-sm text-center p-2 w-3/4'>
          Click Generate to see response here
        </div>
      }

      {/* Download as a pdf button */}
      <div className='my-2 text-green-500'>
        {showDownloadBtn && <button className='p-4 border-2 border-green-500 hover:bg-green-500 hover:border-slate-900 hover:text-black rounded-xl' onClick={() => downloadPdf(targetRef)}>Download as PDF</button>}
      </div>
    </div>
  );
}

export default Travel;
