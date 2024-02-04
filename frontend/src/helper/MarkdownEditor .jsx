/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { travelItinerary } from '../store/atoms';
import { useRecoilValue } from 'recoil';

//icons
import { IconContext } from "react-icons";
import { IoReload } from "react-icons/io5";

const MarkdownEditor = ({ handleGetItinerary, targetRef, sucess }) => {
    const itinerary = useRecoilValue(travelItinerary)
    return (
        <>
            {sucess ?
                <div ref={targetRef}>
                    <Markdown remarkPlugins={[remarkGfm]} className="md:px-6">
                        {itinerary}
                    </Markdown>
                </div> :
                <div>
                    <div className='flex justify-center items-center'>
                        <span className='me-2'>Failed to Load</span>
                        <span onClick={handleGetItinerary} className='cursor-pointer'>
                            <IconContext.Provider value={{ color: "#0F172A", size: "1.5em", className: "global-class-name" }}>
                                <IoReload />
                            </IconContext.Provider>
                        </span>
                    </div>

                </div>
            }
        </>
    );
};

export default MarkdownEditor;
