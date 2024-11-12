import React, { useState } from "react";
import "./Scapii.css";
import { auth, db } from "../../../../FirebaseConfig";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";
import { ref, update } from "firebase/database";

export default function Scapii({ data, sectionId, dataIndex }) {
  const { title, content } = data;
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

        // Fix: Ensure the path points to the correct index in the paragraphs array
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${index}/${elementType}`;

        // Dynamically build the path using template literals and variables
        updates[path] = editedText; // The text you're editing (either h2 or p content)

        // Update the database
        await update(ref(db), updates);

        console.log("Text saved to Firebase:", editedText);

        // Reset edit state
        setEditingIndex(null);
        setEditedText(""); // Clear edited text after save
        setElementType(""); // Clear elementType after save
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
    <section id="values" className="scapii">
      <div className="container">
        <div className="section-title" data-aos="fade-right">
          <h2>{title}</h2>
        </div>
        <div className="row counters">
          {content[0].paragraphs.map((paragraph, index) => (
            <div key={index} className="col-lg-4 col-6 text-center">
              {editingIndex === index ? (
                <div className="editable-container">
                  {/* Editable Text Area for h2 */}
                  {elementType === "h2" ? (
                    <TextareaAutosize
                      value={editedText}
                      onChange={handleTextChange}
                      className="editable-textarea"
                      minRows={1}
                    />
                  ) : (
                    <h1>
                      <span>{paragraph.h2.charAt(0)}</span>
                      {paragraph.h2.slice(1)}
                    </h1>
                  )}

                  {/* Editable Text Area for p */}
                  {elementType === "p" ? (
                    <TextareaAutosize
                      value={editedText}
                      onChange={handleTextChange}
                      className="editable-textarea"
                      minRows={3}
                    />
                  ) : (
                    <p>{paragraph.p}</p>
                  )}

                  <div className="editable-buttons">
                    <button
                      className="save-btn"
                      onClick={() => handleSave(index)} // Ensure you're saving the correct paragraph index
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
                  {/* Display h2 and p content */}
                  <h1>
                    <span>{paragraph.h2.charAt(0)}</span>
                    {paragraph.h2.slice(1)}
                    {isAuthorized && (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditClick(index, paragraph.h2, "h2")
                        }
                      >
                        <EditIcon className="edit-btn-icon" />
                      </button>
                    )}
                  </h1>
                  <p>
                    {paragraph.p}
                    {isAuthorized && (
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(index, paragraph.p, "p")}
                      >
                        <EditIcon className="edit-btn-icon" />
                      </button>
                    )}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
