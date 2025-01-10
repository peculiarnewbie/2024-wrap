import { useEffect, useState } from "react";
import { Player } from "../player";
import { Link, useParams } from "react-router";
import { albums } from "../albums";

export default function Video(props: {
    index: number;
    volume: number;
    startTime: number;
    setCurrentTime: (time: number) => void;
}) {
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

    useEffect(() => {
        setAlbumData(albums[props.index]);
    }, [props.index]);

    return (
        <div>
            <Player
                src={albumData.videoLink}
                volume={props.volume}
                startTime={props.startTime}
                setCurrentTime={props.setCurrentTime}
            />
        </div>
    );
}
