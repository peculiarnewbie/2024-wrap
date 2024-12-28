import React from "react";
import ReactDOM from "react-dom/client";
import { Player } from "./player";
import Scene from "./scene";
import { BrowserRouter, Route, Routes } from "react-router";
import { Test } from "./test";
import { Albums } from "./components/Albums";

const root = document.getElementById("scene")!;
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Player />} /> */}
            <Route path="album/:albumId" element={<Scene />} />
            <Route path="/" element={<Albums />} />
        </Routes>
    </BrowserRouter>
);
