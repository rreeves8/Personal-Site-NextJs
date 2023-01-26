"use client";
import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

type BreakComponentProps = {
    header?: string | React.ReactNode;
    children?: React.ReactNode | string;
    height?: string;
    animatedDivStyle?: React.CSSProperties;
    headerColor?: string;
    extraDelay?: number;
    marginTop: string;
};

export default function BreakComponent({ header, height, children, animatedDivStyle, headerColor, extraDelay, marginTop }: BreakComponentProps) {
    const currentRef = useRef(null);
    const [isVisible, setVisible] = useState(false);
    const [styles, api] = useSpring(() => ({ opacity: 0 }));

    const [observer] = useState(() => {
        return typeof IntersectionObserver === "undefined"
            ? ({} as IntersectionObserver)
            : new IntersectionObserver(
                  ([entry]) => {
                      if (entry.isIntersecting) {
                          if (!isVisible) {
                              api.start({
                                  opacity: 1,
                                  delay: 500 + (extraDelay ? extraDelay : 0),
                              });
                              setVisible(true);
                          }
                      }
                  },
                  {
                      threshold: 0.7,
                  }
              );
    });

    useEffect(() => {
        observer.observe(currentRef.current as unknown as Element);
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={currentRef} style={{ width: "100%", height: height ? height : "25vh", textAlign: "center", marginTop: marginTop }}>
            {header ? (
                <>
                    {typeof header === "string" ? (
                        <text
                            style={{
                                fontSize: "xx-large",
                                fontFamily: "Brandon Grotesque Medium, sans-serif",
                                color: headerColor ? "white" : headerColor,
                            }}
                        >
                            {header}
                        </text>
                    ) : (
                        header
                    )}
                </>
            ) : (
                <></>
            )}
            <animated.div
                style={{
                    ...styles,
                    ...(animatedDivStyle ? animatedDivStyle : {}),
                    width: "100%",
                }}
            >
                {children ? children : <></>}
            </animated.div>
        </div>
    );
}
