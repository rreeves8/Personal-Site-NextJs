"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { Parallax, Background } from "react-parallax";
import { Button } from "reactstrap";
import background from "../public/imgs/background2.png";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <Parallax className='image' strength={400}>
            <Background>
                <Image src={background} alt="personal photo" />
            </Background>

            <div
                style={{
                    position: "relative",
                    left: 1000,
                    top: 400,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.5vh",
                }}
            >
                <text
                    style={{
                        fontFamily: "Brandon Grotesque medium",
                        color: "black",
                        fontSize: "64px",
                    }}
                >
                    Hi I&apos;m Magnus
                </text>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        gap: "3vw",
                    }}
                >
                    <Button color="primary" size="lg" onClick={() => router.push("/personal")}>
                        About me
                    </Button>
                    <Button color="primary" size="lg" onClick={() => router.push("/projects")}>
                        My projects
                    </Button>
                </div>
            </div>
        </Parallax>
    );
}
