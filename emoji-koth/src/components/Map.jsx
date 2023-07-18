import React from "react";
import * as d3 from "d3";
import { useState, useEffect, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { ModalContext } from "../App";
import geoData from "../data/ma-munis.json";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function EmojiMap() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { toggleModal, setToggleModal, muni, setMuni } = useContext(ModalContext);

  useEffect(() => {
    renderMap();
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleModal, windowDimensions]);

  const aspect = windowDimensions["width"] / windowDimensions["height"];
  const adjustedHeight = Math.ceil(windowDimensions["width"] / aspect);

  const Mapsize = styled.div`
    width: 100vw;
    height: 100vh;
  `;

  const renderMap = () => {
    const projection = d3
      .geoAlbers()
      .scale(80000)
      .rotate([71.057, 0])
      .center([-0.021, 42.38])
      .translate([windowDimensions["width"] / 2, windowDimensions["height"] / 2]);

    const emojiMap = d3.select("svg");
    const path = d3.geoPath().projection(projection);
    // emojiMap.append("g").attr("class", "test");
    emojiMap
      .append("g")
      .attr("class", "munis")
      .selectAll("path")
      .data(geoData["features"])
      .enter()
      .append("path")
      .attr("fill", "#bad7f7")
      .attr("stroke", "#5064b7")
      .attr("d", path)
      .on("click", (d) => {
        console.log(d.target.__data__.properties);
        setMuni(String(d.target.__data__.properties.town));
        setToggleModal(true);
      });
  };

  return (
    <Mapsize>
      <svg
        style={{ overflow: "visible" }}
        className={"emoji-map"}
        preserveAspectRatio={"xMinYMin slice"}
        viewBox={`0 0 ${windowDimensions["width"]} ${adjustedHeight}`}
      ></svg>
    </Mapsize>
  );
}

export default EmojiMap;
