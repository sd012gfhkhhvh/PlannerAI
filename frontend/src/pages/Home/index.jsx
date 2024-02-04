/* eslint-disable no-unused-vars */
import { Data } from "../../utils/Data"
import { Card } from "../../components/cards"
import { useEffect, useState } from "react"

//icons
import { IconContext } from "react-icons";
import { TfiSearch } from "react-icons/tfi";

export const Home = () => {
  const [newList, setNewList] = useState(Data)
  const [input, setInput] = useState("")

  useEffect(() => {
    const filteredList = Data.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()))
    setNewList(filteredList)
  }, [input])

  return (
    <div className="bg-slate-900 md:h-screen w-full px-4 flex flex-col justify-center items-center">
      {/* Heading */}
      <div className="heading text-center pt-32">
        <h1 className="text-slate-200 uppercase font-bold text-3xl">Choose a pre-built template to start with</h1>
      </div>
      {/* Searchbox */}
      <div className="m-4 mt-10  flex justify-center items-center w-full">
        <div className="bg-slate-600 flex justify-between items-center w-[90%] sm:w-1/3 pe-4 rounded-lg border-2 border-slate-900 hover:border-slate-400">
          <IconContext.Provider value={{ color: "#CBD5E1", size: "1.5em", className: "global-class-name" }}>
            <input onChange={(e) => setInput(e.target.value)} className="p-4 w-[95%] rounded-lg bg-slate-600 outline-none caret-white text-slate-100" placeholder="Search templates" />
            <TfiSearch />
          </IconContext.Provider>
        </div>
      </div>
      {/* cards */}
      <div className="template-card p-4 w-full text-white flex flex-row flex-wrap justify-center">
        {newList.map((card, index) => { return <Card key={index} title={card.title} description={card.description} /> })}
      </div>
    </div>
  )
}
