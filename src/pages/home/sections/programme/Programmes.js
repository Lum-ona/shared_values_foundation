import React, { useState } from "react";
import { auth, db } from "../../../../FirebaseConfig";
import { ref, update } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";
import "./Programmes.css";
import { Link } from "react-router-dom";

export default function Programmes({ data, sectionId, dataIndex }) {
  const { title, content } = data;
  const { paragraphs } = content[0];

  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Edit button handler
  const handleEditClick = (index, currentText) => {
    setEditingIndex(index);
    setEditedText(currentText);
  };

  // Textarea change handler
  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  // Save handler with Firebase integration
  const handleSave = async (index) => {
    if (editedText) {
      try {
        // Path to the specific paragraph that we are editing
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${index}/p`; // We are editing the 'p' text here

        // Update the database with the new text
        await update(ref(db), {
          [path]: editedText,
        });

        console.log("Text saved to Firebase:", editedText);

        // Reset the editing state
        setEditingIndex(null);
        setEditedText("");
      } catch (error) {
        console.error("Error saving text to Firebase:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedText(""); // Clear edited text after cancel
  };

  const renderAccordionItem = (index) => (
    <li key={index}>
      <a
        data-bs-toggle="collapse"
        data-bs-target={`#accordion-list-${index}`}
        className={index === 1 ? "collapse show" : "collapsed"}
      >
        <span>{paragraphs[index].span}</span> {paragraphs[index].h2}
        <i className="bx bx-chevron-down icon-show"></i>
        <i className="bx bx-chevron-up icon-close"></i>
      </a>
      <div
        id={`accordion-list-${index}`}
        className="collapse"
        data-bs-parent=".accordion-list"
      >
        {editingIndex === index ? (
          <div className="editable-container">
            <TextareaAutosize
              value={editedText}
              onChange={handleTextChange}
              className="editable-textarea"
              minRows={3}
            />
            <div className="editable-buttons">
              <button className="save-btn" onClick={() => handleSave(index)}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>
            {paragraphs[index].p}{" "}
            {isAuthorized && (
              <button
                className="edit-btn"
                onClick={() => handleEditClick(index, paragraphs[index].p)}
              >
                <EditIcon className="edit-btn-icon" />
              </button>
            )}
          </p>
        )}
        <Link to={`/${paragraphs[index].route}`}>
          <button className="btn-learn-more">Learn More</button>
        </Link>
      </div>
    </li>
  );

  return (
    <section id="programmes" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="section-title" data-aos="fade-right">
          <h2>{title}</h2>
          <p>
            {editingIndex === 0 ? (
              <div className="editable-container">
                <TextareaAutosize
                  value={editedText}
                  onChange={handleTextChange}
                  className="editable-textarea"
                  minRows={3}
                />
                <div className="editable-buttons">
                  <button className="save-btn" onClick={() => handleSave(0)}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              paragraphs[0].p
            )}{" "}
            {isAuthorized && (
              <button
                className="edit-btn"
                onClick={() => handleEditClick(0, paragraphs[0].p)}
              >
                <EditIcon className="edit-btn-icon" />
              </button>
            )}
          </p>

          <a href="./assets/img/program.pdf" target="_blank">
            <button className="btn-learn-more">Ongoing Programmes</button>
          </a>
        </div>
        <div className="row">
          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
            <div className="accordion-list">
              <ul>
                {Array.from({ length: 3 }, (_, i) =>
                  renderAccordionItem(i + 1)
                )}
              </ul>
            </div>
          </div>
          <div
            className="col-lg-4 align-items-stretch order-1 order-lg-2 img"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvb5k0lsj/image/upload/v1731124371/programmes_pwhpms.png)`,
            }}
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <em>Sustainable Development Goals.</em>
          </div>
        </div>
      </div>
    </section>
  );
}
