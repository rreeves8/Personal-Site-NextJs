"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "reactstrap";

const Game = ({ quit }: { quit: () => void }) => {
    const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
        loaderUrl: "Build2/export.loader.js",
        dataUrl: "Build2/export.data",
        frameworkUrl: "Build2/export.framework.js",
        codeUrl: "Build2/export.wasm",
    });

    useEffect(() => {
        const gameQuit = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            quit();
        };
        const restart = async () => {
            await unload();
            quit();
        };

        window.addEventListener("quit", gameQuit);
        window.addEventListener("restart", restart);

        return () => {
            window.removeEventListener("quit", gameQuit);
            window.removeEventListener("restart", restart);
        };
    });

    return <Unity unityProvider={unityProvider} style={{ width: "969px", height: "510px" }} />;
};

export default function Asteriods() {
    const [gameRunning, setGameRunning] = useState(false);

    const changeGameState = (state: boolean) => {
        if (state) {
            setGameRunning(true);
        } else {
            window.dispatchEvent(new CustomEvent("restart"));
        }
    };

    const stop = () => {
        setGameRunning(false);
    };

    return (
        <div style={{ width: "969px", height: "510px", backgroundColor: "black" }}>
            <div style={{ position: "absolute", marginLeft: "auto" }}>
                <Button
                    color="primary"
                    size="small"
                    onClick={() => {
                        changeGameState(!gameRunning);
                    }}
                >
                    {gameRunning ? "restart" : "start"}
                </Button>

                <text style={{ color: "white", marginLeft: "1vw" }} className="font">
                    Use WASD to move, and Space to fire
                </text>
            </div>
            {gameRunning ? <Game quit={stop} /> : <></>}
        </div>
    );
}
