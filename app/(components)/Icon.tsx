"use client";
import { useState } from "react";

export const Icon = ({ name, size, style, disableHover }: { name: string; size?: number; style?: any; disableHover?: boolean }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                height: "fit-content",
                width: "fit-content",
                borderRadius: 20,
                ...(style ? style : {}),
                ...(hover && disableHover !== true
                    ? {
                          backgroundColor: "#A0A0A0",
                      }
                    : {}),
            }}
        >
            <span className="material-symbols-outlined" style={{ fontSize: size ? size : 200 }}>
                {name}
            </span>
        </div>
    );
};
