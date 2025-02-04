import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {
  const { setAudioStream, setFile } = props
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const mimeType = 'audio/webm'

  async function startRecording() {
    let tempStream;
    console.log('Starting recording');

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
      tempStream = streamData
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus('recording');

    const media = new MediaRecorder(tempStream, { type: mimeType })
    mediaRecorder.current = media;
    mediaRecorder.current.start()
    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return
      localAudioChunks.push(event.data);
    }

    setAudioChunks(localAudioChunks)
  }

  async function stopRecording() {
    setRecordingStatus('inactive');
    console.log('Stopped Recording');

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      setAudioStream(audioBlob);
      setAudioChunks([])
      setDuration(0);
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') return
    const interval = setInterval(() => {
      setDuration(curr => curr + 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <main className='flex-1 p-4 flex flex-col text-center gap-3 sm:gap-4 justify-center'>
      <h1 className='font-semibold sm:text-5xl md:text-7xl text-5xl'>Tran<span className='text-blue-400 bold'>Script</span>o</h1>
      <h3 className='font-medium md:text-lg'>Record <span className='text-blue-400'>&rarr;</span> Transcribe </h3>
      <button className='flex items-center specialButton rounded-xl px-4 py-2 text-base justify-between gap-4 mx-auto w-72 max-w-full my-4' onClick={recordingStatus === 'recording' ? stopRecording : startRecording}>
        <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop Recording`}</p>
        <div className='flex items-center gap-2'>
          {duration !== 0 && (
            <p className='text-sm text-blue-400'>{duration}s</p>
          )}
          <i className={"fa-solid fa-microphone duration-200 " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
        </div>

      </button>
      <p className='text-base '>Or
        <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration 150'> Upload
          <input onChange={(e) => {
            const tempFile = e.target.files[0]
            setFile(tempFile)
          }} className='hidden' type='file' accept='.mp3,.wave,.flac' />
        </label> a mp3 file
      </p>
      
    </main>
  )
}
