import React, { useState } from "react";
import { auth, db } from "../../../../FirebaseConfig";
import { ref, update } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";

export default function Approach({ data, sectionId, dataIndex }) {
  const { title, content } = data;
  const { paragraphs } = content[0];

  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditClick = (index, currentText) => {
    setEditingIndex(index);
    setEditedText(currentText);
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSave = async (index) => {
    if (editedText) {
      try {
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${index}/p`; // Firebase path to update the paragraph text
        await update(ref(db), { [path]: editedText });
        console.log("Text saved to Firebase:", editedText);
        setEditingIndex(null); // Reset editing state
        setEditedText(""); // Clear edited text
      } catch (error) {
        console.error("Error saving text to Firebase:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedText(""); // Clear text when canceled
  };

  const renderEditableParagraph = (index) => {
    return editingIndex === index ? (
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
        {paragraphs[index]?.p || "Content not available"}{" "}
        {isAuthorized && (
          <button
            className="edit-btn"
            onClick={() => handleEditClick(index, paragraphs[index]?.p)}
          >
            <EditIcon className="edit-btn-icon" />
          </button>
        )}
      </p>
    );
  };

  return (
    <section
      id="approach"
      className="about approach-section"
      style={{ backgroundColor: "#e98a2f" }} // Ensure styles are handled externally
    >
      <div className="container">
        <div className="row content">
          <div className="col-lg-3" data-aos="fade-right" data-aos-delay="100">
            <div className="section-title" data-aos="fade-right">
              <h2 className="section-title-text">{title}</h2>
            </div>
          </div>
          <div
            className="col-lg-9 pt-4 pt-lg-0"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {renderEditableParagraph(0)}
          </div>
        </div>
      </div>
    </section>
  );
}
