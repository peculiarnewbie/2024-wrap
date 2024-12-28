import { Canvas } from "@react-three/fiber";
import { albumState, Items } from "../test";
import { albums } from "../albums";

export const Albums = () => {
    const selectAlbum = (index: number) => {
        console.log(albums[24 - index]);
    };

    return (
        <Canvas
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            onPointerMissed={() => (albumState.clicked = null)}
        >
            <Items w={0.7} gap={0.15} selectAlbum={selectAlbum} />
        </Canvas>
    );
};
