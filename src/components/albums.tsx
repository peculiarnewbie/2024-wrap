import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums } from "../albums";
import Video from "./video";
import { useEffect, useState, type WheelEvent } from "react";
import { useMediaRemote, useMediaStore } from "@vidstack/react";
import "../document.css";
import VolumeSlider from "./radix/slider";
import ProgressDemo from "./radix/progress";

export const Albums = () => {
    const remote = useMediaRemote();
    const [index, setIndex] = useState(25);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const [volume, setVolume] = useState(50);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const selectAlbum = (index: number) => {
        setTransitioning(true);
        setProgress(0);
        setIndex(24 - index);
        setTimeout(() => {
            setTransitioning(false);
        }, 500);
    };

    let scrollTimer = 0;

    const nextIndex = () => {
        console.log(index);
        setUpdateIndex(24 - index + 1);
    };

    const setCurrentTime = (time: number) => {
        if (time > albums[index].endTime && !transitioning) {
            nextIndex();
        }
        let progress =
            (100 * (time - albums[index].startTime)) /
            (albums[index].endTime - 0.5 - albums[index].startTime);
        if (progress > 100) progress = 100;
        else if (progress < 0) progress = 0;
        setProgress(progress);
    };

    useEffect(() => {
        let scrollTimer = 0;

        const handleScroll = () => {
            document.documentElement.classList.add("scrolling");
            scrollTimer = setTimeout(() => {
                document.documentElement.classList.remove("scrolling");
            }, 100);
        };

        window.addEventListener("wheel", handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("wheel", handleScroll);
            clearTimeout(scrollTimer);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div style={{ overscrollBehavior: "none", overflow: "hidden" }}>
            <Info
                artist={albums[index]?.artist ?? ""}
                albumTitle={albums[index]?.albumTitle ?? ""}
            />

            <div className="following-element">
                <Video
                    index={index}
                    volume={volume}
                    startTime={albums[index]?.startTime ?? 0}
                    videoLink={albums[index]?.videoLink ?? ""}
                    setCurrentTime={setCurrentTime}
                />
            </div>

            <Controls progress={progress} onVolumeChange={setVolume} />
            <Canvas
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                onPointerMissed={() => {
                    albumState.clicked = null;
                    setIndex(25);
                    setProgress(0);
                }}
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

const Info = (props: { artist: string; albumTitle: string }) => {
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
                {props.artist !== "" ? (
                    <div>{props.artist + " - " + props.albumTitle}</div>
                ) : (
                    <div style={{ fontSize: 15 }}>select an album</div>
                )}
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
