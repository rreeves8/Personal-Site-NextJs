"use client";
import { Parallax, Background } from "react-parallax";
import BreakComponent from "../(components)/BreakView";
import Image from "next/image";
import space from "../../public/imgs/space.jpg";
import { useEffect, useRef } from "react";
import BoardComponent from "./(chess)/Chess";
import Asteriods from "./(asteriods)/Asteriods";
import github from "../../public/imgs/github.png";
import nextjs from "../../public/imgs/Nextjs.png";
import firebase from "../../public/imgs/firebase.png";
import react from "../../public/imgs/react.png";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";
import FallingCat from "../(components)/FallingCat";

const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : ({} as URLSearchParams);

export default function Projects() {
    const chessRef = useRef(null);
    const router = useRouter();
    useEffect(() => {
        if (params.has("game")) {
            if (params.get("game") === "chess") {
                //@ts-ignore
                chessRef.current.scrollIntoView();
            }
        }
    });

    return (
        <>
            <Button style={{ position: "absolute", top: "2.5vh", left: "2.5vh" }} color="primary" size="regular" onClick={() => router.replace("/")}>
                Back To Main
            </Button>

            <BreakComponent
                marginTop="5vh"
                height="fit-content"
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <div className="black-line" />
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>My Projects</text>
                        <div className="black-line" />
                    </div>
                }
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4vh", marginTop: "3vh" }}>
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", width: "50vw" }}>
                        Here&apos;s a collection of projects I&apos;ve worked on in the past. Using a Unity webpack compiler, virtualized IOS
                        simulators, and React; I&apos;ve collected some of my favourite projects to showcase. Checkout my github at:
                    </text>
                    <a style={{ marginTop: "4vh" }} href="https://github.com/rreeves8" target="_blank" rel="noreferrer">
                        <Image src={github} alt="sdf" width={70} />
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
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20vw",
                        marginBottom: "7vh",
                    }}
                >
                    <text
                        style={{
                            fontSize: "x-large",
                            fontFamily: "Brandon Grotesque Regular, sans-serif",
                            width: "25vw",
                            position: "relative",
                            top: "-2vh",
                        }}
                    >
                        Using React I&apos;ve created a chess game engine. Currently the computer selects a random position to play, however in the
                        future will utilize a decision tree and minimax algorithim to determine the best move. Currently the check system breaks when
                        the game scales in positions made, however will be fixed shortly.
                    </text>

                    <BoardComponent size="55vh" />
                </div>
            </BreakComponent>

            <Parallax className="image" strength={400} style={{ height: "75vh" }} contentClassName="fit-parent">
                <Background>
                    <Image src={space} alt="personal photo" />
                </Background>
                <BreakComponent
                    height="fit-content"
                    marginTop="5vh"
                    header={
                        <div style={{ position: "absolute", width: "100%" }}>
                            <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", color: "white" }}>
                                App Development
                            </text>
                        </div>
                    }
                >
                    <div
                        style={{
                            width: "100%",
                            height: "fit-content",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "18vw",
                        }}
                    >
                        <text
                            style={{
                                fontSize: "x-large",
                                fontFamily: "Brandon Grotesque Regular, sans-serif",
                                width: "30vw",
                                color: "white",
                            }}
                        >
                            Using React Native and Expo I built a mobile app for keeping track of tasks. Using a screen stack the user can navigate
                            between views of sorting tasks, adding tasks and modifing them. Using this simulator on the left you can try it out. I am
                            currently working on another mobile application that can be found on my github.
                        </text>
                        <div style={{ height: "fit-content", padding: "10px" }}>
                            <iframe
                                src="https://appetize.io/embed/t6x4h2ujrfog2twwwbfafvmkku?device=pixel4"
                                width="300px"
                                height="650px"
                                frameBorder="0"
                                scrolling="no"
                            ></iframe>
                        </div>
                    </div>
                </BreakComponent>
            </Parallax>

            <BreakComponent
                marginTop="2.5vh"
                height="fit-content"
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif" }}>Web Development</text>
                    </div>
                }
            >
                <div
                    style={{
                        marginTop: "8vh",
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6vw",
                        marginBottom: "11vh",
                    }}
                >
                    <text
                        style={{
                            fontSize: "x-large",
                            fontFamily: "Brandon Grotesque Regular, sans-serif",
                            width: "25vw",
                        }}
                    >
                        As a software engineer, my area of expertise is web development. I am very talenated at creating websites and I enjoy building
                        them during school and my free time. My go-to web stack consists of React for frontend, NextJs for backend, and Firebase for
                        hosting. This website is built using these tools and the repo can be found below.
                    </text>

                    <Image src={nextjs} alt="sdf" width={200} />
                    <Image src={react} alt="sdf" width={200} />
                    <Image src={firebase} alt="sdf" width={200} />
                </div>
            </BreakComponent>

            <BreakComponent marginTop="2.5vh" height="15vh" animatedDivStyle={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        backgroundColor: "black",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", color: "white" }}>
                        Check out the repo for this website here:{" "}
                        <a href="https://github.com/rreeves8/personal-site-nextjs" target="_blank" rel="noreferrer">
                            Repo
                        </a>
                    </text>
                </div>
            </BreakComponent>
        </>
    );
}
