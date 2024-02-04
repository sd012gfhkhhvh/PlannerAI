/* eslint-disable no-unused-vars */
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useRef } from 'react';
import { downloadPdf } from '../helper/DownloadPdf';
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`
export const Test = () => {
    const targetRef = useRef(null)

  const load = () => {
    downloadPdf(targetRef)
  }
    return (
        <>
            <div ref={targetRef} className="no-tailwindcss list-disc">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                </Markdown>
            </div>
            <button onClick={load} className=''>Download</button>
        </>
    )
}
