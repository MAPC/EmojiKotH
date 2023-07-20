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
  const [mapShake, setMapShake] = useState(false);
  const [emojiShake, setEmojiShake] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "rgb(32,59,77)" }}>
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
            mapShake,
            setMapShake,
            emojiShake,
            setEmojiShake,
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
