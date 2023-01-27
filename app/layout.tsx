import FallingCat from "./(components)/FallingCat";
import "./global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script async src="https://snack.expo.dev/embed.js"></script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            </head>
            <body style={{ margin: 0 }}>
                <FallingCat />
                {children};
            </body>
        </html>
    );
}
