import React from 'react'

export default function Transcription(props) {
    const {finalText} = props
    return (
        <>
            <div className='text-lg'>
                {finalText}
            </div>
        </>

    )
}
