import EmojiMap from "./components/Map";
import "./App.css";
import { createContext, useState, useEffect } from "react";
import EmojiModal from "./components/Modal";
import styled from "styled-components";
import * as d3 from "d3";

export const ModalContext = createContext();

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [toggleModal, setToggleModal] = useState(false);
  const [mappedEmojis, setMappedEmojis] = useState({});
  const [muni, setMuni] = useState("N/A");
  const [munis, setMunis] = useState(
    new Set([
      "Acton",
      "Arlington",
      "Ashland",
      "Bedford",
      "Bellingham",
      "Belmont",
      "Beverly",
      "Bolton",
      "Boston",
      "Boxborough",
      "Braintree",
      "Brookline",
      "Burlington",
      "Cambridge",
      "Canton",
      "Carlisle",
      "Chelsea",
      "Cohasset",
      "Concord",
      "Danvers",
      "Dedham",
      "Dover",
      "Duxbury",
      "Essex",
      "Everett",
      "Foxborough",
      "Framingham",
      "Franklin",
      "Gloucester",
      "Hamilton",
      "Hanover",
      "Hingham",
      "Holbrook",
      "Holliston",
      "Hopkinton",
      "Hudson",
      "Hull",
      "Ipswich",
      "Lexington",
      "Lincoln",
      "Littleton",
      "Lynn",
      "Lynnfield",
      "Malden",
      "Manchester",
      "Marblehead",
      "Marlborough",
      "Marshfield",
      "Maynard",
      "Medfield",
      "Medford",
      "Medway",
      "Melrose",
      "Middleton",
      "Milford",
      "Millis",
      "Milton",
      "Nahant",
      "Natick",
      "Needham",
      "Newton",
      "Norfolk",
      "North Reading",
      "Norwell",
      "Norwood",
      "Peabody",
      "Pembroke",
      "Quincy",
      "Randolph",
      "Reading",
      "Revere",
      "Rockland",
      "Rockport",
      "Salem",
      "Saugus",
      "Scituate",
      "Sharon",
      "Sherborn",
      "Somerville",
      "Southborough",
      "Stoneham",
      "Stoughton",
      "Stow",
      "Sudbury",
      "Swampscott",
      "Topsfield",
      "Wakefield",
      "Walpole",
      "Waltham",
      "Watertown",
      "Wayland",
      "Wellesley",
      "Wenham",
      "Weston",
      "Westwood",
      "Weymouth",
      "Wilmington",
      "Winchester",
      "Winthrop",
      "Woburn",
      "Wrentham",
    ])
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const BorderDiv = styled.div`
    position: absolute;
    pointer-events: auto;
    width: 100vw;
    height: 100vh;
    top: 0;

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
    left: ${(props) => (props.width < 505 ? "3.25rem" : "1.5rem")};
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

        <TitleDiv width={windowDimensions["width"]}>
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
            windowDimensions,
            setWindowDimensions,
            munis,
            setMunis,
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
