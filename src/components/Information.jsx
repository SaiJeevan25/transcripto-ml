import Transcription from "./Transcription"

export default function Information(props) {
    const { output } = props

    const finalText = output.map(val => val.text)

    function handleCopy() {
        navigator.clipboard.writeText(finalText);
    }

    function handleDownload() {
        const element = document.createElement('a')
        const file = new Blob([finalText], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download =`Transcripto_${new Date().toString()}.txt`
        document.body.appendChild(element)
        element.click()
    }

    return (
        <main className='flex-1 flex flex-col text-center gap-3 sm:gap-4 justify-center max-w-prose w-full mx-auto p-2 rounded px-4'>
            <h1 className='font-semibold sm:text-5xl md:text-6xl text-4xl whitespace-nowrap'>Your <span className='text-blue-400 bold capitalize duration-200 '>Transcription</span></h1>
            <div className='grid grid-cols-2 mx-auto bg-white shadow-lg rounded-full overflow-hidden items-center '>
            </div>
            <div className="my-8 flex flex-col border-[2px] shadow-lg border-solid p-2 py-5 rounded-lg hover:border-blue-400 duration-150">
                    <Transcription finalText={finalText} />
            </div>

            <div className="flex items-center gap-4 mx-auto text-base">
                <button onClick={handleCopy} title="Copy" className="text-lg text-blue-400 hover:text-blue-800 duration-200 rounded px-2 aspect-square grid place-items-center  ">
                    <i className="fa-regular fa-copy"></i>
                </button>
                <button title="Download" onClick={handleDownload} className="text-md text-blue-400 hover:text-blue-800 rounded px-2  duration-200aspect-square grid place-items-center  ">
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
        </main>
    )
}
