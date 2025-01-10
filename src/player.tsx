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
}) {
    let player = useRef<MediaPlayerInstance>(null);
    const remote = useMediaRemote(player);

    useEffect(() => {
        // Subscribe to state updates.
        return player.current!.subscribe(({ paused, viewType }) => {
            // console.log('is paused?', '->', state.paused);
            // console.log('is audio view?', '->', state.viewType === 'audio');
        });
    }, []);

    useEffect(() => {
        // console.log(player.current);
        setTimeout(() => {
            if (player.current) {
                remote.play();
                // player.current.setVolume(props.volume);
            }
        }, 500);

        setTimeout(() => {
            if (player.current) {
                remote.changeVolume(props.volume);
                remote.seek(props.startTime);
                // player.current.setVolume(props.volume);
            }
        }, 1000);
    }, [props.volume, props.src]);

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
        >
            <MediaProvider></MediaProvider>
            <VideoLayout />
        </MediaPlayer>
    );
}
