import * as THREE from "three";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";
import { albums } from "./albums";

const material = new THREE.LineBasicMaterial({ color: "white" });
const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -0.5, 0),
    new THREE.Vector3(0, 0.5, 0),
]);
export const albumState: { clicked: number | null; urls: string[] } = proxy({
    clicked: null,
    urls: albums.map((a) => a.cover).reverse(),
    // urls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((u) => `/covers/${u}.webp`),
});

function Item({
    index,
    position,
    scale,
    c = new THREE.Color(),
    ...props
}: {
    index: number;
    position: [number, number, number];
    scale: [number, number];
    c?: THREE.Color;
    selectAlbum: (index: number) => void;
    url: string;
}) {
    const ref = useRef() as RefObject<
        THREE.Mesh<
            THREE.BufferGeometry<THREE.NormalBufferAttributes>,
            THREE.Material | THREE.Material[],
            THREE.Object3DEventMap
        >
    >;
    const scroll = useScroll();
    const { clicked, urls } = useSnapshot(albumState);
    const [hovered, hover] = useState(false);
    const width = useThree((state) => state.viewport);
    const click = () => {
        albumState.clicked = index === clicked ? null : index;
        //@ts-expect-error
        scroll.scroll.current = index / (urls.length - 1);
        props.selectAlbum(index);
        // console.log(scroll.el.scrollLeft);
        // console.log(index, scroll.scroll.current);
    };
    const over = () => hover(true);
    const out = () => hover(false);

    useFrame((state, delta) => {
        if (ref.current === undefined || ref.current === null) return;
        const y = scroll.curve(
            index / urls.length - 1.5 / urls.length,
            4 / urls.length
        );
        easing.damp3(
            ref.current?.scale ?? new THREE.Vector3(),
            [
                clicked === index ? 7.1 : scale[0],
                clicked === index ? 4 : 3 + y,
                1,
            ],
            0.15,
            delta
        );
        //@ts-expect-error
        ref.current.material.scale = [ref.current.scale.x, ref.current.scale.y];
        if (clicked !== null && index < clicked)
            easing.damp(
                ref.current.position,
                "x",
                position[0] - 3.5,
                0.15,
                delta
            );
        if (clicked !== null && index > clicked)
            easing.damp(
                ref.current.position,
                "x",
                position[0] + 3.5,
                0.15,
                delta
            );
        if (clicked === null || clicked === index)
            easing.damp(ref.current.position, "x", position[0], 0.15, delta);
        easing.damp(
            ref.current.material,
            "grayscale",
            hovered || clicked === index ? 0 : Math.max(0, 1 - y),
            0.15,
            delta
        );
        easing.dampC(
            //@ts-expect-error
            ref.current.material.color,
            hovered || clicked === index ? "white" : "#aaa",
            hovered ? 0.3 : 0.15,
            delta
        );
    });
    return (
        <Image
            ref={ref}
            {...props}
            position={position}
            scale={scale}
            onClick={click}
            onPointerOver={over}
            onPointerOut={out}
        />
    );
}

export function Items(props: {
    w: number;
    gap: number;
    selectAlbum: (index: number) => void;
}) {
    // export function Items(props:{ w: 0.7, gap = 0.15  }) {
    const { urls } = useSnapshot(albumState);
    const { width } = useThree((state) => state.viewport);
    const xW = props.w + props.gap;
    return (
        <ScrollControls
            horizontal
            damping={0.1}
            pages={(width - xW + urls.length * xW) / width}
        >
            {/* <Minimap /> */}
            <Scroll>
                {
                    urls.map((url, i) =>
                        <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[props.w, 4]} url={url} selectAlbum={props.selectAlbum} />
                    ) /* prettier-ignore */
                }
            </Scroll>
        </ScrollControls>
    );
}

export const Test = () => (
    <Canvas
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        onPointerMissed={() => (albumState.clicked = null)}
    >
        <Items w={0.7} gap={0.15} selectAlbum={(index) => console.log(index)} />
    </Canvas>
);
