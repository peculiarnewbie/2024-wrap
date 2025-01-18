import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef } from "react";

import styles from "./player.module.css";

import {
    isHLSProvider,
    MediaPlayer,
    MediaProvider,
    Poster,
    Track,
    useMediaRemote,
    useMediaState,
    type MediaCanPlayDetail,
    type MediaCanPlayEvent,
    type MediaPlayerInstance,
    type MediaProviderAdapter,
    type MediaProviderChangeEvent,
} from "@vidstack/react";

import { VideoLayout } from "./components/layouts/video-layout";

export function Player(props: {
    src: string;
    volume: number;
    startTime: number;
    setCurrentTime: (time: number) => void;
}) {
    let player = useRef<MediaPlayerInstance>(null);
    const remote = useMediaRemote(player);
    const time = useMediaState("currentTime", player);

    useEffect(() => {
        setTimeout(() => {
            if (player.current) {
                remote.play();
            }
        }, 500);

        setTimeout(() => {
            if (player.current) {
                // remote.changeVolume(props.volume);
                remote.seek(props.startTime);
            }
        }, 1000);
    }, [props.src]);

    useEffect(() => {
        console.log(props.volume);
    }, [props.volume]);

    useEffect(() => {
        props.setCurrentTime(time);
    }, [time]);

    function onProviderChange(
        provider: MediaProviderAdapter | null,
        nativeEvent: MediaProviderChangeEvent
    ) {
        // We can configure provider's here.
        if (isHLSProvider(provider)) {
            provider.config = {};
        }
    }

    // We can listen for the `can-play` event to be notified when the player is ready.
    function onCanPlay(
        detail: MediaCanPlayDetail,
        nativeEvent: MediaCanPlayEvent
    ) {
        // ...
    }

    return (
        <MediaPlayer
            className={`${styles.player} player`}
            title="Sprite Fight"
            src={props.src}
            crossOrigin
            playsInline
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}
            ref={player}
            volume={props.volume / 100}
        >
            <MediaProvider></MediaProvider>
            <VideoLayout />
        </MediaPlayer>
    );
}
