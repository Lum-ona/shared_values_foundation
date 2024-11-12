import React, { useState } from "react";
import "./About.css";
import { auth, db } from "../../../../FirebaseConfig";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";
import { ref, update } from "firebase/database";
import { Link } from "react-router-dom";

export default function About({ data, sectionId, dataIndex }) {
  const { title, content } = data || {}; // Add fallback to prevent undefined errors
  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [elementType, setElementType] = useState(""); // Track element type for saving

  // Edit button handler
  const handleEditClick = (index, currentText, type) => {
    setEditingIndex(index);
    setEditedText(currentText);
    setElementType(type); // Store element type for later reference
  };

  // Textarea change handler
  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  // Save handler with Firebase integration
  const handleSave = async (index) => {
    if (elementType) {
      try {
        // Get the reference to the specific paragraph, heading, or image within the correct content section
        const updates = {};
        const path = `pages/${dataIndex}/sections/${sectionId}/content/${index}/paragraphs/${editingIndex}/${elementType}`;

        // Dynamically build the path using template literals and variables
        updates[path] = editedText; // The text you're editing (either p, h2, or img content)

        // Update the database
        await update(ref(db), updates);

        console.log("Text saved to Firebase:", editedText);

        // Reset edit state
        setEditingIndex(null);
      } catch (error) {
        console.error("Error saving text to Firebase:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <section id={sectionId} className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{title}</h2>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center w-60">
          {content?.map((section, index) => (
            <div key={index}>
              {section.paragraphs.map((paragraph, paraIndex) => (
                <div key={paraIndex} className="content-area text-center">
                  {editingIndex === paraIndex ? (
                    <div className="editable-container">
                      <TextareaAutosize
                        value={editedText}
                        onChange={handleTextChange}
                        className="editable-textarea"
                        minRows={3}
                      />
                      <div className="editable-buttons">
                        <button
                          className="save-btn"
                          onClick={() => handleSave(index)}
                        >
                          Save Changes
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {paragraph.p && (
                        <p className="editable-text text-center mb-5">
                          {paragraph.p}
                          {isAuthorized && (
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEditClick(paraIndex, paragraph.p, "p")
                              }
                            >
                              <EditIcon className="edit-btn-icon" />
                            </button>
                          )}
                        </p>
                      )}
                      {paragraph.h2 && (
                        <h2 className="editable-text text-center mb-5">
                          {paragraph.h2}
                          {isAuthorized && (
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEditClick(paraIndex, paragraph.h2, "h2")
                              }
                            >
                              <EditIcon className="edit-btn-icon" />
                            </button>
                          )}
                        </h2>
                      )}
                      {paragraph.img && (
                        <div className="editable-image-container">
                          <img
                            src={paragraph.img}
                            alt="Content visual"
                            className="content-image"
                          />
                          {isAuthorized && (
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEditClick(paraIndex, paragraph.img, "img")
                              }
                            >
                              <EditIcon className="edit-btn-icon" />
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <Link to="/about" className="btn-learn-more">
            More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
