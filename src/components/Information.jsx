import { useState } from "react"
import React from 'react'
import Transcription from "./Transcription"
import Translation from "./Translation"

export default function Information() {
    const [tab, setTab] = useState('transcription')
    return (
        <main className='flex-1 p-4 flex flex-col text-center gap-3 sm:gap-4 justify-center  pb-20 max-w-prose w-full mx-auto'>
            <h1 className='font-semibold sm:text-5xl md:text-6xl text-4xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>
            <div className='grid grid-cols-2 mx-auto bg-white shadow-lg rounded-full overflow-hidden items-center '>
                <button onClick={() => setTab('transcription')} className={'px-4 py-1 font-medium duration-200 ' + (tab === 'transcription' ? 'bg-blue-400 text-white': 'text-blue-400 hover:text-blue-500')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 py-1 font-medium duration-200 ' + (tab === 'translation' ? 'bg-blue-400 text-white': 'text-blue-400 hover:text-blue-500')}>Translation</button>
            </div>
            {tab === 'translation' ? <Translation /> : <Transcription /> }
        </main>
    )
}
