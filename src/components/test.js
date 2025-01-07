import { pipeline } from '@huggingface/transformers';

// Create a text-to-speech pipeline
const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { dtype: 'fp32' });

// Generate speech
const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
const result = await synthesizer('Hello, my dog is cute', { speaker_embeddings });
console.log(result);
// {
//   audio: Float32Array(26112) [-0.00005657337896991521, 0.00020583874720614403, ...],
//   sampling_rate: 16000
// }

