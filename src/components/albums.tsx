import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums, type Album } from "../albums";
import Video from "./video";
import { useState } from "react";
import { useMediaRemote, useMediaStore } from "@vidstack/react";
import "../document.css";
import VolumeSlider from "./radix/slider";
import ProgressDemo from "./radix/progress";

export const Albums = () => {
    const remote = useMediaRemote();
    const { played } = useMediaStore();
    const [index, setIndex] = useState(24);
    const [updateIndex, setUpdateIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const selectAlbum = (index: number) => {
        setTransitioning(true);
        setIndex(24 - index);
        setTimeout(() => {
            setTransitioning(false);
        }, 500);
    };

    const nextIndex = () => {
        console.log(index);
        setUpdateIndex(24 - index + 1);
    };

    const setCurrentTime = (time: number) => {
        if (time > albums[index].endTime && !transitioning) {
            nextIndex();
        }
        const progress =
            (100 * (time - albums[index].startTime)) /
            (albums[index].endTime - 0.5 - albums[index].startTime);
        setProgress(progress);
    };

    return (
        <div style={{ overscrollBehavior: "none", overflow: "hidden" }}>
            <Info album={albums[index]} />

            <div className="following-element">
                <Video
                    index={index}
                    volume={volume}
                    startTime={albums[index].startTime}
                    setCurrentTime={setCurrentTime}
                />
            </div>

            <Controls progress={progress} onVolumeChange={setVolume} />
            <Canvas
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                // onPointerMissed={() => (albumState.clicked = null)}
            >
                <Items
                    w={0.7}
                    gap={0.15}
                    selectAlbum={selectAlbum}
                    updatedIndex={updateIndex}
                />
            </Canvas>
        </div>
    );
};

const Info = (props: { album: Album }) => {
    return (
        <div
            style={{
                display: "flex",
                position: "absolute",
                zIndex: 100,
                marginTop: "100px",
                width: "100%",
                justifyContent: "center",
                fontSize: "2rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <div>{props.album.artist + " - " + props.album.albumTitle}</div>
            </div>
        </div>
    );
};

const Controls = (props: {
    progress: number;
    onVolumeChange: (volume: number) => void;
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                zIndex: 100,
                bottom: "0",
                width: "100%",
                alignItems: "center",
                fontSize: "2rem",
            }}
        >
            <VolumeSlider onVolumeChange={props.onVolumeChange} />
            <ProgressDemo progress={props.progress} />
        </div>
    );
};
