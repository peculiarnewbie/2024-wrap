import { useState } from "react";

export default function TMI() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 18,
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100vh",
            }}
        >
            <HoveredText
                initText="favorite game"
                hoveredText="1000XResist"
                link="https://store.steampowered.com/app/1675830/1000xRESIST/"
            />
            <HoveredText
                initText="favorite movie"
                hoveredText="Flow"
                link="https://letterboxd.com/film/flow-2024/"
            />
            <HoveredText
                initText="favorite youtube video"
                hoveredText="The Games Behind Your Government's Next War"
                link="https://www.youtube.com/watch?v=lYaDXZ2MI-k"
            />
            <HoveredText
                initText="favorite board game (that i bought this year)"
                hoveredText="Stella"
                link="https://boardgamegeek.com/boardgame/329845/stella-dixit-universe"
            />
            <HoveredText
                initText="favorite book (that i read this year)"
                hoveredText="Slaughterhouse-Five"
                link="https://www.goodreads.com/book/show/4981.Slaughterhouse_Five"
            />
        </div>
    );
}

const HoveredText = (props: {
    initText: string;
    hoveredText: string;
    link: string;
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={props.link}
            target="_blank"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ width: "100%", padding: "5px" }}
        >
            {hovered ? props.hoveredText : props.initText} →
        </a>
    );
};
