import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums } from "../albums";
import Video from "./video";
import { useEffect, useState, type WheelEvent } from "react";
import { useMediaRemote, useMediaStore } from "@vidstack/react";
import "../document.css";
import VolumeSlider from "./radix/slider";
import ProgressDemo from "./radix/progress";
import { useScroll } from "@react-three/drei";

export const Albums = () => {
    const remote = useMediaRemote();
    const [index, setIndex] = useState(25);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const [volume, setVolume] = useState(50);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [bgSrc, setBgSrc] = useState("");
    const selectAlbum = (index: number) => {
        setTransitioning(true);
        setProgress(0);
        setIndex(24 - index);
        setTimeout(() => {
            setBgSrc(albums[24 - index]?.cover ?? "");
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
        let progress =
            (100 * (time - albums[index].startTime)) /
            (albums[index].endTime - 0.5 - albums[index].startTime);
        if (progress > 100) progress = 100;
        else if (progress < 0) progress = 0;
        setProgress(progress);
    };

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

            <EndCard isAtEnd={isAtEnd} />

            <Controls
                progress={progress}
                onVolumeChange={setVolume}
                position={(index + 1).toString()}
            />
            <Canvas
                style={{ zIndex: 1 }}
                gl={{ antialias: false, alpha: true }}
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
                    onReachEnd={setIsAtEnd}
                />
            </Canvas>
            <img
                src={bgSrc}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: transitioning ? 0 : 0.15,
                    transition: "opacity 200ms ease-in-out",
                    filter: "blur(15px)",
                }}
            />
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
            {props.artist !== "" ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div>{props.artist}</div>
                    <div>{props.albumTitle}</div>
                </div>
            ) : (
                <div style={{ fontSize: 15 }}>select an album</div>
            )}
        </div>
    );
};

const Controls = (props: {
    progress: number;
    onVolumeChange: (volume: number) => void;
    position: string;
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
            <div
                style={{
                    fontSize: 50,
                    paddingBottom: "10vh",
                }}
            >
                {props.position === "26" ? "" : props.position}
            </div>
            <VolumeSlider onVolumeChange={props.onVolumeChange} />
            <ProgressDemo progress={props.progress} />
        </div>
    );
};

const EndCard = (props: { isAtEnd: boolean }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                zIndex: 100,
                top: "0",
                right: "0",
                height: "100%",
                alignItems: "end",
                pointerEvents: "none",
                opacity: props.isAtEnd ? 1 : 0,
                transition: "opacity 200ms ease-in-out",
            }}
            className="end-card"
        >
            <div
                style={{
                    pointerEvents: props.isAtEnd ? "all" : "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                }}
            >
                <a
                    style={{
                        pointerEvents: "inherit",
                    }}
                    href="https://www.youtube.com/playlist?list=PLQG7Jc1PJtPRE4s7G8oSL1a1V46ZjCHoA"
                    target="_blank"
                >
                    Full Playlist →
                </a>
                <a
                    style={{
                        pointerEvents: "inherit",
                    }}
                    href="/tmi"
                >
                    #TMI →
                </a>
                <a
                    style={{
                        pointerEvents: "inherit",
                    }}
                    href="https://peculiarnewbie.com"
                >
                    by Peculiarnewbie →
                </a>
                <p
                    style={{
                        marginBottom: 0,
                    }}
                    className="tools"
                >
                    created using{" "}
                    <a
                        style={{ fontWeight: "bold" }}
                        href="https://vidstack.io/"
                        target="_blank"
                    >
                        vidstack
                    </a>
                </p>

                <p
                    style={{
                        marginTop: 0,
                    }}
                    className="tools"
                >
                    and{" "}
                    <a
                        style={{ fontWeight: "bold" }}
                        href="https://r3f.docs.pmnd.rs/"
                        target="_blank"
                    >
                        react three fiber
                    </a>
                </p>
            </div>
        </div>
    );
};
