import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums, type Album } from "../albums";
import Video from "./video";
import { useState } from "react";
import { useMediaRemote, useMediaStore } from "@vidstack/react";
import "../document.css";

export const Albums = () => {
    const remote = useMediaRemote();
    const { played } = useMediaStore();
    const [index, setIndex] = useState(24);
    const [volume, setVolume] = useState(0.1);
    const selectAlbum = (index: number) => {
        setIndex(24 - index);
        setTimeout(() => {
            setVolume(0.5);
        }, 500);
    };

    return (
        <div style={{ overscrollBehavior: "none", overflow: "hidden" }}>
            <Info album={albums[index]} />
            <div className="following-element">
                {/* <div style={{ position: "absolute", top: 0, left: 0 }}></div> */}
                <Video
                    index={index}
                    volume={volume}
                    startTime={albums[index].startTime}
                />
            </div>
            <Canvas
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                onPointerMissed={() => (albumState.clicked = null)}
            >
                <Items w={0.7} gap={0.15} selectAlbum={selectAlbum} />
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
                paddingTop: "100px",
                width: "100%",
                justifyContent: "center",
            }}
        >
            {props.album.albumTitle}
        </div>
    );
};
