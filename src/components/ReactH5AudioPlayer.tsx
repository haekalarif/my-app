import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function ReactH5AudioPlayer(props) {
    return (
        <AudioPlayer
            autoPlay
            // src="https://sample-videos.com/audio/mp3/crowd-cheering.mp3"
            // src="https://download.samplelib.com/wav/sample-3s.wav"
            src="https://getsamplefiles.com/download/aac/sample-1.aac"
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    )
}

export default ReactH5AudioPlayer;