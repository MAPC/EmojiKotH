import EmojiMap from "./components/Map";
import "./App.css";
import { createContext, useState } from "react";
import EmojiModal from "./components/Modal";
import styled from "styled-components";

export const ModalContext = createContext();

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  const [muni, setMuni] = useState("N/A");

  const BorderDiv = styled.div`
    position: absolute;
    pointer-events: auto;
    width: 100vw;
    height: 100vh;
    /* border-color: rgb(14, 21, 35);
    border-style: solid;
    border-width: 3.75rem 2rem 2rem; */

    --border-size: 1.5rem;
    --border-size-wide: 3rem;
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
    /*
    the border-color can now be set through the background property
    which means we could even have corner-gradients borders
  */
    background: lime;
  `;

  const TitleDiv = styled.div`
    position: absolute;
    left: 3rem;
    top: 0.25rem;
    width: 12rem;
    text-align: left;
  `;

  const Titleh1 = styled.h2`
    margin-bottom: 0.5rem;
  `;

  const Titleh4 = styled.h4`
    color: floralwhite;
    font-weight: bold;
  `;

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "rgb(19 78 120)" }}>
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
          }}
        >
          <EmojiModal muni={muni} />
          <EmojiMap />
        </ModalContext.Provider>
      </header>
    </div>
  );
}

export default App;
