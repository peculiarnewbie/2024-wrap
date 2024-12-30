import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums } from "../albums";
import Video from "./video";
import { useState } from "react";
import "../document.css";

export const Albums = () => {
    const [index, setIndex] = useState(24);
    const selectAlbum = (index: number) => {
        setIndex(24 - index);
    };

    console.log("heyyy");

    return (
        <div>
            <div
                className="following-element"
                style={{
                    display: "flex",
                    backgroundColor: "white",
                    padding: 10,
                    position: "absolute",
                }}
            >
                {/* <Video index={index} /> */}
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
