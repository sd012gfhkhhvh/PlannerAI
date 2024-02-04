/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

export const Card = ({ title, description }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        switch (title) {
            case "Travel Itinerary":
                navigate("/travel");
                break;

            default:
                break;
        }
    }

    return (
        <>
            <div onClick={handleClick} className="bg-slate-800 p-4 m-4 rounded-md border-slate-700 border-2 cursor-pointer w-64 flex flex-col justify-center hover:bg-slate-700">
                <div className="mb-3"> 
                    <h1 className="text-slate-50 text-xl font-semibold">{title}</h1>
                </div>
                <div>
                    <p className="text-slate-200 text-sm font-light">{description}</p>
                </div>
            </div>
        </>
    )
}
