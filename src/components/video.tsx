import { useEffect, useState } from "react";
import { Player } from "../player";
import { Link, useParams } from "react-router";
import { albums } from "../albums";

export default function Video(props: {
    index: number;
    volume: number;
    startTime: number;
    videoLink: string;
    setCurrentTime: (time: number) => void;
}) {
    return (
        <div>
            {props.index < 25 && (
                <Player
                    src={props.videoLink ?? ""}
                    volume={props.volume}
                    startTime={props.startTime ?? 0}
                    setCurrentTime={props.setCurrentTime}
                />
            )}
        </div>
    );
}
