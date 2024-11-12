import React, { useState } from "react";
import { auth, db } from "../../../../FirebaseConfig";
import { ref, update } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";

export default function Community({ data, sectionId, dataIndex }) {
  const { title, content } = data;
  const { paragraphs } = content[0];

  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [elementType, setElementType] = useState(""); // Track element type for saving

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
        setElementType("");
      } catch (error) {
        console.error("Error saving text to Firebase:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedText(""); // Clear edited text after cancel
    setElementType(""); // Clear elementType after cancel
  };

  return (
    <section id="community" className="about">
      <div className="container">
        <div className="row content">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <div className="section-title" data-aos="fade-right">
              <h2>{title}</h2>
            </div>

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
              <p>
                {paragraphs[0].p}{" "}
                {isAuthorized && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(0, paragraphs[0].p)}
                  >
                    <EditIcon className="edit-btn-icon" />
                  </button>
                )}
              </p>
            )}

            {editingIndex === 1 ? (
              <div className="editable-container">
                <TextareaAutosize
                  value={editedText}
                  onChange={handleTextChange}
                  className="editable-textarea"
                  minRows={3}
                />
                <div className="editable-buttons">
                  <button className="save-btn" onClick={() => handleSave(1)}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>
                {paragraphs[1].p}{" "}
                {isAuthorized && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(1, paragraphs[1].p)}
                  >
                    <EditIcon className="edit-btn-icon" />
                  </button>
                )}
              </p>
            )}
          </div>

          <div
            className="col-lg-6 pt-4 pt-lg-0"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {editingIndex === 2 ? (
              <div className="editable-container">
                <TextareaAutosize
                  value={editedText}
                  onChange={handleTextChange}
                  className="editable-textarea"
                  minRows={3}
                />
                <div className="editable-buttons">
                  <button className="save-btn" onClick={() => handleSave(2)}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>
                {paragraphs[2].p}{" "}
                {isAuthorized && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(2, paragraphs[2].p)}
                  >
                    <EditIcon className="edit-btn-icon" />
                  </button>
                )}
              </p>
            )}

            {editingIndex === 3 ? (
              <div className="editable-container">
                <TextareaAutosize
                  value={editedText}
                  onChange={handleTextChange}
                  className="editable-textarea"
                  minRows={3}
                />
                <div className="editable-buttons">
                  <button className="save-btn" onClick={() => handleSave(3)}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>
                {paragraphs[3].p}{" "}
                {isAuthorized && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(3, paragraphs[3].p)}
                  >
                    <EditIcon className="edit-btn-icon" />
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
