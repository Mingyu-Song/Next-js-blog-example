import "../styles/global.css";
import darkModeContext from "../context/darkMode";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(true);

  return (
    <darkModeContext.Provider value={[dark, setDark]}>
      <Component {...pageProps} />
    </darkModeContext.Provider>
  );
}
