import React, { useState } from "react";
import "./Objectives.css";
import { auth, db } from "../../../../FirebaseConfig";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";
import { ref, update } from "firebase/database";

export default function Objectives({ data, sectionId, dataIndex }) {
  const { title, content } = data || {};
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
        updates[path] = editedText; // The text you're editing (either h2 or p content)

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
    <section id="objectives" className="objectives">
      <div className="container">
        <div className="section-title" data-aos="fade-right">
          <h2>{title}</h2>
        </div>
        <div className="row d-flex align-items-stretch justify-content-around">
          <div className="col-lg-5 d-flex align-items-stretch vision">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div
                className="d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="icon-box mt-4 mt-xl-0">
                  <i className="bx bx-receipt"></i>
                  {editingIndex === 0 ? (
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
                          onClick={() => handleSave(0)}
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
                      <h3>
                        {content[0].paragraphs[0].h2}
                        {isAuthorized && (
                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEditClick(
                                0,
                                content[0].paragraphs[0].h2,
                                "h2"
                              )
                            }
                          >
                            <EditIcon className="edit-btn-icon" />
                          </button>
                        )}
                      </h3>
                      <p>
                        {content[0].paragraphs[0].p}
                        {isAuthorized && (
                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEditClick(
                                0,
                                content[0].paragraphs[0].p,
                                "p"
                              )
                            }
                          >
                            <EditIcon className="edit-btn-icon" />
                          </button>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-lg-5 d-flex align-items-stretch justify-content-between"
            data-aos="fade-right"
          >
            <div className="content">
              {editingIndex === 1 ? (
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
                <>
                  <h3>
                    {content[0].paragraphs[1].h2}
                    {isAuthorized && (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditClick(1, content[0].paragraphs[1].h2, "h2")
                        }
                      >
                        <EditIcon className="edit-btn-icon" />
                      </button>
                    )}
                  </h3>
                  <p>
                    {content[0].paragraphs[1].p}
                    {isAuthorized && (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditClick(1, content[0].paragraphs[1].p, "p")
                        }
                      >
                        <EditIcon className="edit-btn-icon" />
                      </button>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
