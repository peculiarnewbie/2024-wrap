import { useEffect, useState } from "react";
import { Player } from "./player";
import { Link, useParams } from "react-router";
import { albums } from "./albums";

export default function Scene() {
    const [nav, setNav] = useState([false, true]);
    const [albumData, setAlbumData] = useState(albums[0]);
    const params = useParams();

    useEffect(() => {
        setAlbumData(albums[parseInt(params.albumId ?? "0") - 1]);
        setNav([
            params.albumId !== "1",
            parseInt(params.albumId ?? "1") != albums.length,
        ]);
        console.log(albumData);
    }, [params.albumId]);

    return (
        <div>
            {params.albumId}
            <Player
                src={albumData.videoLink}
                volume={0.5}
                startTime={albumData.startTime}
            />
            {nav[0] && (
                <Link to={`/album/${parseInt(params.albumId ?? "0") - 1}`}>
                    prev
                </Link>
            )}
            {nav[1] && (
                <Link to={`/album/${parseInt(params.albumId ?? "0") + 1}`}>
                    next
                </Link>
            )}

            <img width={400} src={albumData.cover} />
        </div>
    );
}
