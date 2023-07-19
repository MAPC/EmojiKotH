import EmojiMap from "./components/Map";
import "./App.css";
import { createContext, useState } from "react";
import EmojiModal from "./components/Modal";
import styled from "styled-components";

export const ModalContext = createContext();

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  const [mappedEmojis, setMappedEmojis] = useState({});
  const [muni, setMuni] = useState("N/A");

  const BorderDiv = styled.div`
    position: absolute;
    pointer-events: auto;
    width: 100vw;
    height: 100vh;

    --border-size: 1.5rem;
    --border-size-wide: 2.25rem;
    clip-path: polygon(
      evenodd,
      0 0,
      100% 0,
      100% 100%,
      0% 100%,
      0 0,
      var(--border-size) var(--border-size-wide),
      calc(100% - var(--border-size)) var(--border-size-wide),
      calc(100% - var(--border-size)) calc(100% - var(--border-size)),
      var(--border-size) calc(100% - var(--border-size)),
      var(--border-size) var(--border-size-wide)
    );

    /* background: rgb(14, 21, 35); */
    background: linear-gradient(to bottom, rgb(243 248 255) 2.25rem, rgb(14, 21, 35) 2.25rem);
  `;

  const TitleDiv = styled.div`
    position: absolute;
    left: 1.5rem;
    top: 0rem;
    width: 30rem;
    text-align: left;
    color: rgb(39, 82, 162);
  `;

  const Titleh1 = styled.h3`
    margin-bottom: 0.5rem;
  `;

  const Titleh4 = styled.h3`
    position: absolute;
    top: 0.15rem;
    left: 10rem;
    font-weight: bold;
  `;

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "rgb(32,59,77)" }}>
        <BorderDiv />

        <TitleDiv>
          <Titleh1>〽️🅰️🅿️🗜️</Titleh1>
          <Titleh4>MUNI EMOJI</Titleh4>
        </TitleDiv>
        <ModalContext.Provider
          value={{
            toggleModal,
            setToggleModal,
            muni,
            setMuni,
            mappedEmojis,
            setMappedEmojis,
          }}
        >
          <EmojiModal />
          <EmojiMap />
        </ModalContext.Provider>
      </header>
    </div>
  );
}

export default App;
