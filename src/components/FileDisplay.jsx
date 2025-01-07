import React from 'react'

export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props
  return (
    <main className='flex-1 p-4 flex flex-col text-center gap-3 sm:gap-4  justify-center pb-20 min-w-72 max-w-full mx-auto'>
      <h1 className='font-semibold sm:text-5xl md:text-6xl text-4xl'>Your <span className='text-blue-400 bold'>File</span></h1>
      <div className='flex flex-col text-left my-4'>
        <h3 className='font-semibold'>Name</h3>
        <p>{file ? file?.name : 'Custom Audio'}</p>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button className='text-slate-400 hover:text-blue-400 duration-200' onClick={handleAudioReset}>Reset</button>
        <button className='specialButton text-sm px-3 py-2 rounded-lg text-blue-400 flex items-center gap-3 flex-row'>
          <p>Transcribe</p>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    </main>
  )
}
