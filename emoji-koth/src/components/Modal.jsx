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

function EmojiModal(muni) {
  const { toggleModal, setToggleModal } = useContext(ModalContext);
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
    currentEmoji["names"][1].split(" ").forEach((element) => {
      upperName.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    let data = {
      records: [
        {
          fields: {
            Municipality: muni["muni"][0] + muni["muni"].slice(1, muni["muni"].length).toLowerCase(),
            Emoji: upperName.join(""),
            Explanation: formDataObj.explanation,
            State: "Massachusetts",
            Lat: null,
            Long: null,
          },
        },
      ],
    };
    console.log(data);
    const auth = {
      apiKey: "patKlQHXCDpnAOJ2p.53d3f8636793a87b7967e0560734bc42213551cab6625fda7343e2c01545e177",
    };

    var base = new Airtable(auth).base("app7invLG3BPCqc6o");

    console.log(base("Table 1").getField("Emoji"));

    // base("Table 1").create(data["records"], function (err, records) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   records.forEach(function (record) {
    //     console.log(record.getId());
    //   });
    // });

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
  `;

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
        <Modal.Title>{muni["muni"]}'S EMOJI</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="pt-3">
          <Form.Group controlId="formFile" id="contribute-submit-form">
            <Form.Label className="mb-1 text-start modal-form-label">Emoji: </Form.Label>
            <Form.Control
              type="text"
              placeholder={currentEmoji["emoji"]}
              className="mb-3"
              name="emoji"
              defaultValue={currentEmoji["emoji"]}
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
