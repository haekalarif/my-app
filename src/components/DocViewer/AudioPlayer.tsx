import React, { useEffect, useRef } from 'react';

interface IAudioPlayer {
    src: string,
    style?: Object
}

const AudioPlayer: React.FunctionComponent<IAudioPlayer> = (props) => {
    const src: string = props.src;
    const style = props?.style;
    const audioRef: any = useRef();

    useEffect(() => {
        audioRef?.current?.load();
    }, [src]);
    return (
        <audio ref={audioRef} style={style} controls>
            <source src={src} />
        </audio>
    );
}

export default AudioPlayer;