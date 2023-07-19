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

function EmojiModal() {
  const { toggleModal, setToggleModal, muni, setMuni, mappedEmojis, setMappedEmojis } = useContext(ModalContext);
  const [toggleEmoji, setToggleEmoji] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState("😃");

  const handleEmoji = (event) => {
    console.log(event);
    setCurrentEmoji(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth_token = process.env.EMOJI_TOKEN;

    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    let upperName = [];

    if (currentEmoji["names"].length > 1) {
      currentEmoji["names"][1].split(" ").forEach((element) => {
        upperName.push(element[0].toUpperCase() + element.slice(1, element.length));
      });
    } else if (currentEmoji["names"].length <= 1) {
      upperName.push(
        currentEmoji["names"][0][0].toUpperCase() + currentEmoji["names"][0].slice(1, currentEmoji["names"][0].length)
      );
    }
    console.log(upperName);
    let data = {
      records: [
        {
          fields: {
            Municipality: muni["muni"][0] + muni["muni"].slice(1, muni["muni"].length).toLowerCase(),
            Emoji: currentEmoji["emoji"] + upperName.join(" "),
            Explanation: formDataObj.explanation,
          },
        },
      ],
    };
    console.log(data);
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
        console.log(record.getId());
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
    width: 75vw;
    margin-left: 2rem;
  `;

  console.log(muni[0] + muni.slice(1, muni.length).toLowerCase());
  console.log(
    mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
      ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][2]
      : "N/A"
  );
  console.log(
    mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
      ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][0].match(/\p{Emoji}+/gu)[0]
      : "❔"
  );

  return (
    <EmojiModalDiv
      show={toggleModal}
      onHide={() => {
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
              placeholder={
                mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
                  ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][0].match(/\p{Emoji}+/gu)[0]
                  : "❔"
              }
              className="mb-3"
              name="emoji"
              defaultValue={
                mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()] !== undefined
                  ? mappedEmojis[muni[0] + muni.slice(1, muni.length).toLowerCase()][0].match(/\p{Emoji}+/gu)[0]
                  : "❔"
              }
            />
            <EmojiButton onClick={handleToggleEmoji} type="button">
              Choose an Emoji
            </EmojiButton>
            {toggleEmoji && (
              <EmojiPickerAbs onEmojiClick={handleEmoji} width={"100%"} height={"25rem"} lazyLoad={true} />
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
                  : "N/A"
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
