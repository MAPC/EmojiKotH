import React from "react";
import { useState, useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import styled from "styled-components";
import { ModalContext } from "../App";
import * as Airtable from "airtable";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

function EmojiModal() {
  const {
    toggleModal,
    setToggleModal,
    muni,
    setMuni,
    mappedEmojis,
    setMappedEmojis,
    windowDimensions,
    setWindowDimensions,
    mapShake,
    setMapShake,
  } = useContext(ModalContext);
  const [toggleEmoji, setToggleEmoji] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState(undefined);

  async function loadParticles(options) {
    await loadFull(tsParticles);

    await tsParticles.load(options);
  }

  const configs = {
    duration: 4.5,
    fullScreen: {
      zIndex: 1,
    },
    emitters: [
      {
        position: {
          x: 0,
          y: 30,
        },
        rate: {
          quantity: 3,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-right",
            outModes: {
              top: "none",
              left: "none",
              default: "destroy",
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 30,
        },
        rate: {
          quantity: 3,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-left",
            outModes: {
              top: "none",
              right: "none",
              default: "destroy",
            },
          },
        },
      },
    ],
    particles: {
      color: {
        value: ["#ffffff", "#FF0000"],
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true,
        },
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 10,
          max: 50,
        },
      },
      number: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 30,
        },
      },
      size: {
        value: {
          min: 0,
          max: 2,
        },
        animation: {
          enable: true,
          startValue: "min",
          count: 1,
          speed: 16,
          sync: true,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
      shape: {
        type: "character",
        options: {
          character: {
            fill: true,
            font: "Verdana",
            style: "",
            weight: 400,
            particles: {
              size: {
                value: 8,
              },
            },
            value: [currentEmoji !== undefined ? currentEmoji["emoji"] : "👑"],
          },
        },
      },
    },
  };

  const handleEmoji = (event) => {
    setCurrentEmoji(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth_token = process.env.EMOJI_TOKEN;

    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    let upperName = [];

    if (currentEmoji !== undefined && currentEmoji["names"].length > 1) {
      currentEmoji["names"][1].split(" ").forEach((element) => {
        upperName.push(element[0].toUpperCase() + element.slice(1, element.length));
      });
    } else if (currentEmoji !== undefined && currentEmoji["names"].length <= 1) {
      upperName.push(
        currentEmoji["names"][0][0].toUpperCase() + currentEmoji["names"][0].slice(1, currentEmoji["names"][0].length)
      );
    }

    let data = {
      records: [
        {
          fields: {
            Municipality: muni[0] + muni.slice(1, muni.length).toLowerCase(),
            Emoji:
              currentEmoji !== undefined
                ? currentEmoji["emoji"]
                : mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
                ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][0].match(/\p{Emoji}+/gu)[0]
                : "❔",
            Explanation: formDataObj.explanation,
          },
        },
      ],
    };

    const auth = {
      apiKey: "patKlQHXCDpnAOJ2p.53d3f8636793a87b7967e0560734bc42213551cab6625fda7343e2c01545e177",
    };

    var base = new Airtable(auth).base("app7invLG3BPCqc6o");

    base("Table 1").create(data["records"], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        loadParticles(configs);
        setMapShake(true);
      });
    });

    setToggleModal(false);
  };

  function handleToggleEmoji(e) {
    setToggleEmoji(!toggleEmoji);
  }

  const EmojiButton = styled(Button)`
    padding: 0.25rem 1rem;
  `;

  const EmojiPickerAbs = styled(EmojiPicker)`
    position: absolute;
    top: 5rem;
  `;

  const EmojiModalDiv = styled(Modal)`
    height: 100vh;
    width: 100vw;
    /* margin-left: 2rem; */
  `;
  console.log(currentEmoji);
  console.log(mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()]);
  return (
    <EmojiModalDiv
      show={toggleModal}
      onHide={() => {
        setCurrentEmoji(undefined);
        setToggleModal(false);
      }}
      centered={true}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{muni}'S EMOJI</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="pt-3">
          <Form.Group controlId="formFile" id="contribute-submit-form">
            <Form.Label className="mb-1 text-start modal-form-label">Emoji: </Form.Label>
            <Form.Control
              type="text"
              placeholder={"Choose an emoji!"}
              className="mb-3"
              name="emoji"
              defaultValue={
                currentEmoji !== undefined
                  ? currentEmoji["emoji"]
                  : mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
                  ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][0].match(/\p{Emoji}+/gu)[0]
                  : null
              }
              readOnly={true}
            />
            <EmojiButton onClick={handleToggleEmoji} type="button">
              {toggleEmoji ? "close emoji picker" : "open emoji picker"}
            </EmojiButton>
            {toggleEmoji && (
              <EmojiPickerAbs
                onEmojiClick={handleEmoji}
                width={"100%"}
                height={"25rem"}
                lazyLoad={true}
                lazyLoadEmojis={true}
              />
            )}
            <br /> <br />
            <Form.Label className="mb-1 text-start modal-form-label">Explanation:</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Explain why you chose that emoji"}
              className="mb-3"
              name="explanation"
              defaultValue={
                mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
                  ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][2]
                  : null
              }
            />
          </Form.Group>
          <Button
            variant="secondary"
            onClick={() => {
              setToggleModal(false);
            }}
            type="button"
          >
            Close
          </Button>
          <Button type="submit" id="contribute-submit-button" variant="primary">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </EmojiModalDiv>
  );
}

export default EmojiModal;
