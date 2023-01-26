"use client";
import { Parallax, Background } from "react-parallax";
import BreakComponent from "../(components)/BreakView";
import Image from "next/image";
import space from "../../public/imgs/space.jpg";
import { useEffect, useRef } from "react";
import BoardComponent from "./(chess)/Chess";
import Asteriods from "./(asteriods)/Asteriods";

const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : ({} as URLSearchParams);

export default function Projects() {
    const chessRef = useRef(null);

    useEffect(() => {
        if (params.has("game")) {
            if (params.get("game") === "chess") {
                //@ts-ignore
                //chessRef.current.scrollIntoView();
            }
        }
    });

    return (
        <>
            <BreakComponent
                marginTop="8vh"
                height="fit-content"
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <div className="black-line" />
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>My Projects</text>
                        <div className="black-line" />
                    </div>
                }
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "11vh" }}>
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", width: "50vw" }}>
                        Here&apos;s a collection of projects I&apos;ve worked on in the past. Using a Unity webpack compiler, virtualized IOS
                        simulators, and React; I&apos;ve collected some of my favourite projects to showcase. Checkout my github at:
                    </text>
                    <a style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque Regular, sans-serif" }} href="https://github.com/rreeves8">
                        rreeves8
                    </a>
                </div>
            </BreakComponent>

            <Parallax className="image" strength={400} style={{ height: "65vh" }} contentClassName="fit-parent">
                <Background>
                    <Image src={space} alt="personal photo" />
                </Background>
                <BreakComponent extraDelay={500} height="fit-content" marginTop="5vh">
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10vw",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "5vh" }}>
                            <text
                                style={{
                                    alignSelf: "flex-start",
                                    fontSize: "xx-large",
                                    fontFamily: "Brandon Grotesque Regular, sans-serif",
                                    width: "25vw",
                                    color: "white",
                                }}
                            >
                                Asteriods
                            </text>
                            <text
                                style={{
                                    fontSize: "x-large",
                                    fontFamily: "Brandon Grotesque Regular, sans-serif",
                                    width: "25vw",
                                    color: "white",
                                }}
                            >
                                Using Unity in my second year of school I created a simple Asteroids game in C#. For use on this site I created a
                                simple event management system between javascript and the unity webgl engine.
                            </text>
                        </div>
                        <Asteriods />
                    </div>
                </BreakComponent>
            </Parallax>

            <BreakComponent
                marginTop="2.5vh"
                height="fit-content"
                header={
                    <div ref={chessRef} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xxx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>Chess</text>
                    </div>
                }
            >
                <div
                    ref={chessRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20vw",
                    }}
                >
                    <text
                        style={{
                            fontSize: "x-large",
                            fontFamily: "Brandon Grotesque Regular, sans-serif",
                            width: "25vw",
                        }}
                    >
                        Using React I&apos;ve created a chess game where two people can play against eachother. Using webRTC people can play against
                        eachother virtually. I am currently developing a decision tree algorithim so players can play against my AI
                    </text>

                    <BoardComponent size="55vh" />
                </div>
            </BreakComponent>
        </>
    );
}
