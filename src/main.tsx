import React from "react";
import ReactDOM from "react-dom/client";
import { Player } from "./player";
import Scene from "./scene";
import { BrowserRouter, Route, Routes } from "react-router";
import { Albums } from "./components/albums";
import TMI from "./components/tmi";

const root = document.getElementById("scene")!;
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Player />} /> */}
            {/* <Route path="album/:albumId" element={<Scene />} /> */}
            <Route path="/" element={<Albums />} />
            <Route path="/tmi" element={<TMI />} />
        </Routes>
    </BrowserRouter>
);
