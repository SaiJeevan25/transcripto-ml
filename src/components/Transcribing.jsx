import React from 'react'

export default function Transcribing(props) {
    const { downloading } = props
    return (
        <div className='flex flex-1 items-center flex-col justify-center gap-10 md:gap-14 py-24 p-4'>
            <div className='flex flex-col gap-2 sm:gap-4'>
            <h1 className='font-semibold sm:text-5xl md:text-6xl text-4xl whitespace-nowrap'>Your <span className='text-blue-400 bold capitalize duration-200 '>Transcription</span></h1>
            </div>
            <div className='flex flex-col gap-2 max-w-[400px] mx-auto w-full sm:gap-4'>
                {
                    [0, 1, 2].map(val => {
                        return (
                            <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading  ' + `loading${val}`}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
