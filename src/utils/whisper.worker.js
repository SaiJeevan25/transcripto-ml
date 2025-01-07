import {pipeline} from '@xenova/transformers'

class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static model = 'openai/whisper-tiny.en'
    static instance = null
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null , {
                progress_callback
            })
        }

        return this.instance;
    }
}


self.addEventListener('message', async (event) => {
    const {type, audio} = event.data
    if(type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio)
    }
})


async function transcribe(audio) {
    sendLoadingMessage('Loading')

    let pipeline;

    try {
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback)
    } catch (err) {
        console.log(err.message)
    }

    sendLoadingMessage('success')

    const stribe_length_s = 5

    const generationTracker = new GenerationTracker(pipeline, stribe_length_s)
    await pipeline(audio, {
        top_k:0,
        do_sample: false,
        chunk_length: 30,
        stribe_length_s,
        return_timestamps: true,
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        chunk_callback: generationTracker.chunkCallBack.bind(generationTracker)
    })
    generationTracker.sendFinalResult()
}

async function load_model_callback(data) {
    const {status} = data
    if (status === 'progress') {
        const {file, progress, loaded, total} = data
        sendDownloadingMessage(file,progress,loaded,total)
    }
}

function sendLoadingMessage(message) {
    self.postMessage({type: MessageTypes.INFERENCE_PROGRESS, message})
}