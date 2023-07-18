import React from "react";
import * as d3 from "d3";
import { useState, useEffect, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { ModalContext } from "../App";
import geoData from "../data/ma-munis.json";
import pointData from "../data/MA_Town_Halls.json";

import * as Airtable from "airtable";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function EmojiMap() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [mappedEmojis, setMappedEmojis] = useState({});
  const [currentMuni, setCurrentMuni] = useState("N/A");
  const { toggleModal, setToggleModal, muni, setMuni } = useContext(ModalContext);

  useEffect(() => {
    renderMap();
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    renderEmojis();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleModal, windowDimensions, currentMuni]);

  const aspect = windowDimensions["width"] / windowDimensions["height"];
  const adjustedHeight = Math.ceil(windowDimensions["width"] / aspect);

  const Mapsize = styled.div`
    width: 100vw;
    height: 100vh;
  `;

  const InstructionsDiv = styled.div`
    width: 17rem;
    height: 14rem;
    background-color: rgb(243 248 255);
    position: absolute;
    right: 3rem;
    top: 3.75rem;
    border-radius: 0.25rem;
    color: rgb(39, 82, 162);
    padding: 1.5rem 1.5rem;
    font-weight: bold;
  `;

  const InstructionsUl = styled.ul`
    padding: 1rem;
  `;

  const InstructionsLi = styled.li`
    font-size: 16px;
    margin-bottom: 0.75rem;
    text-align: left;
    list-style-type: "✔️";
  `;

  const TooltipDiv = styled.div`
    width: 17rem;
    height: 7rem;
    background-color: rgb(243 248 255);
    position: absolute;
    right: 3rem;
    bottom: 3rem;
    border-radius: 0.25rem;
    color: rgb(39, 82, 162);
    padding: 1.5rem 1.5rem;
    font-weight: bold;
    text-align: left;
  `;

  const munis = new Set([
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
  ]);

  const projection = d3
    .geoAlbers()
    .scale(56000)
    .rotate([71.057, 0])
    .center([-0.021, 42.378])
    .translate([windowDimensions["width"] / 2.95, windowDimensions["height"] / 2]);

  const renderMap = () => {
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
      .attr("fill", (d) => {
        if (munis.has(d.properties.town[0] + d.properties.town.slice(1, d.properties.town.length).toLowerCase())) {
          return "#bad7f7";
        } else {
          return "rgb(32,59,77)";
        }
      })
      .attr("stroke", "#5064b7")
      .attr("d", path)
      .on("mouseover", function (d) {
        if (
          munis.has(
            d.target.__data__.properties.town[0].toUpperCase() +
              d.target.__data__.properties.town.slice(1, d.target.__data__.properties.town.length).toLowerCase()
          )
        ) {
          setCurrentMuni(d.target.__data__.properties.town);
          d3.select(this).attr("fill", "rgb(255,206,134)");
        }
      })
      .on("click", (d) => {
        if (
          munis.has(
            d.target.__data__.properties.town[0].toUpperCase() +
              d.target.__data__.properties.town.slice(1, d.target.__data__.properties.town.length).toLowerCase()
          )
        ) {
          setMuni(String(d.target.__data__.properties.town));
          setToggleModal(true);
        }
      })
      .on("mouseout", function (d) {
        if (
          munis.has(
            d.target.__data__.properties.town[0].toUpperCase() +
              d.target.__data__.properties.town.slice(1, d.target.__data__.properties.town.length).toLowerCase()
          )
        ) {
          setCurrentMuni("N/A");
          d3.select(this).attr("fill", "#bad7f7");
        }
      });
  };

  const renderEmojis = () => {
    const auth_token = {
      apiKey: "patKlQHXCDpnAOJ2p.53d3f8636793a87b7967e0560734bc42213551cab6625fda7343e2c01545e177",
    };

    var base = new Airtable(auth_token).base("app7invLG3BPCqc6o");

    base("Table 1")
      .select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            if (
              mappedEmojis[record.get("Municipality")] === undefined ||
              mappedEmojis[record.get("Municipality")][1] < record.get("Autonumber")
            ) {
              mappedEmojis[record.get("Municipality")] = [
                record.get("Emoji"),
                record.get("Autonumber"),
                record.get("Explanation"),
              ];
            }
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
    console.log(mappedEmojis);

    const emojiMapPoints = d3.select("svg");

    const filteredMunicipalities = pointData.features.filter((municipality) =>
      munis.has(
        municipality.properties.muni[0] +
          municipality.properties.muni.slice(1, municipality.properties.muni.length).toLowerCase()
      )
    );

    emojiMapPoints
      .append("g")
      .attr("class", "emoji-map__sites")
      .selectAll("circle")
      .data(filteredMunicipalities)
      .enter()
      .append("text")
      .attr("class", "muni-site")
      .style("pointer-events", "none")
      .text(function (d) {
        // console.log(mappedEmojis);
        if (
          mappedEmojis[d.properties.muni[0] + d.properties.muni.slice(1, d.properties.muni.length).toLowerCase()] !==
          undefined
        ) {
          return mappedEmojis[
            d.properties.muni[0] + d.properties.muni.slice(1, d.properties.muni.length).toLowerCase()
          ][0].match(/\p{Emoji}+/gu)[0];
        } else {
          return "❔";
        }
      })
      .attr("id", (d) => `muni-pt-${d.properties.muni}`)
      .attr("x", (d) => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0])
      .attr("y", (d) => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1]);

    setMappedEmojis(mappedEmojis);
  };

  return (
    <Mapsize>
      <svg
        style={{ overflow: "visible" }}
        className={"emoji-map"}
        preserveAspectRatio={"xMinYMin slice"}
        viewBox={`0 0 ${windowDimensions["width"]} ${adjustedHeight}`}
      ></svg>

      <InstructionsDiv>
        INSTRUCTIONS
        <InstructionsUl>
          <InstructionsLi>See MAPC Munis' Emojis!</InstructionsLi>
          <InstructionsLi>Select Your Muni</InstructionsLi>
          <InstructionsLi>Make your Emoji the King of the Muni!</InstructionsLi>
        </InstructionsUl>
      </InstructionsDiv>

      <TooltipDiv>
        <h6 style={{ marginBottom: 4 }}>MUNICIPALITY 👑:</h6>
        <h2>{currentMuni + (mappedEmojis[currentMuni] !== undefined ? mappedEmojis[currentMuni] : "")}</h2>
      </TooltipDiv>
    </Mapsize>
  );
}

export default EmojiMap;
