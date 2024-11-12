import React, { useState } from "react";
import { auth, db } from "../../../../FirebaseConfig";
import { ref, update, get } from "firebase/database";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon here
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Swal from "sweetalert2";
import "./Partners.css";
import axios from "axios";

export default function Partners({ data, sectionId, dataIndex }) {
  const { title, content } = data;
  const { paragraphs } = content[0];

  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);
  console.log(isAuthorized);

  // const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState(false);
  const [paragraphText, setParagraphText] = useState(paragraphs[0].p);
  const [isAddNewPartnerForm, setIsAddNewPartnerForm] = useState(false);
  const [newPartnerDetails, setNewPartnerDetails] = useState({
    image: "",
    name: "",
  });

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Size",
        text: "The image file is too large. Please select an image under 5MB.",
      });
      return;
    }

    // Validate file type (e.g., only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPEG, JPG, or PNG images are allowed.",
      });
      return;
    }

    // setEditingIndex(index);

    // Show SweetAlert loading animation
    Swal.fire({
      title: "Uploading Image...",
      html: "Please wait while the image is being uploaded.",
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    try {
      // Upload the image to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      const newImageUrl = response.data.secure_url;

      // Construct the Firebase path
      const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/1/images/${index}/image_url`;

      await update(ref(db), { [path]: newImageUrl });

      // Success notification
      Swal.fire({
        icon: "success",
        title: "Image Updated",
        text: "Image uploaded and saved successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // setEditingIndex(null);
    } catch (error) {
      console.error("Error uploading image:", error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading the image. Please try again.",
      });
    }
  };

  const handleTextEdit = () => {
    setEditingText(true);
  };

  const handleTextSave = async () => {
    const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/0/text`;

    try {
      await update(ref(db), { [path]: paragraphText });

      Swal.fire({
        icon: "success",
        title: "Text Updated",
        text: "Paragraph text updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setEditingText(false);
    } catch (error) {
      console.error("Error updating text:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the text. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setEditingText(false);
    setParagraphText(paragraphs[0].p); // Revert to original text
  };

  const handleSaveParagraph = () => {
    handleTextSave(); // Call the save function when saving the paragraph
  };

  const handleNewPartnerDetailsChange = (field, value) => {
    setNewPartnerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewPartner = async (paragraphIndex) => {
    const { name, image } = newPartnerDetails;
    if (!name || !image) {
      Swal.fire("Please fill in all Partners details and upload an image.");
      return;
    }

    // Show SweetAlert loading animation
    Swal.fire({
      title: "Uploading Image...",
      html: "Please wait while the image is being uploaded.",
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );

      // Upload the image to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      const newImageUrl = response.data.secure_url;

      // Path for adding new member to Firebase
      const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${paragraphIndex}/images`;
      const snapshot = await get(ref(db, path));
      const lastIndex = snapshot.exists()
        ? Object.keys(snapshot.val()).length
        : 0;

      // Set the path with the new index number
      await update(ref(db), {
        [`${path}/${lastIndex}`]: { image_url: newImageUrl, name },
      });

      Swal.fire("Success", "New member added successfully!", "success");

      // Clear form
      setNewPartnerDetails({ name: "", role: "", desc: "", image: null });
    } catch (error) {
      console.error("Error adding new member:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the member.",
      });
    }
  };

  return (
    <section id="partners" className="partners section-bg">
      <div className="container">
        <div className="section-title">
          <h2>{title}</h2>
        </div>

        {isAuthorized && editingText ? (
          <div className="editable-container">
            <TextareaAutosize
              value={paragraphText}
              onChange={(e) => setParagraphText(e.target.value)}
              onBlur={handleTextSave}
              className="editable-textarea"
            />
            <div className="editable-buttons">
              <button className="save-btn" onClick={handleSaveParagraph}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>
            {paragraphText}
            {isAuthorized && (
              <button
                className="edit-btn"
                onClick={handleTextEdit} // Allow edit when authorized
              >
                <EditIcon className="edit-btn-icon" />
              </button>
            )}
          </p>
        )}

        <div className="row" data-aos="zoom-in">
          {paragraphs[1].images.map(({ image_url }, index) => (
            <>
              <div
                key={index}
                className="col-lg-3  col-md-4 col-6 d-flex align-items-center justify-content-center"
              >
                <img
                  src={image_url}
                  className="img-fluid"
                  alt={`Partner ${index + 1}`}
                />
                {isAuthorized && (
                  <label htmlFor={`file-input-${index}`}>
                    <AddPhotoIcon
                      style={{
                        fontSize: "28px",
                        marginTop: "10px",
                        color: "#b82556",
                        cursor: "pointer",
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id={`file-input-${index}`}
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </label>
                )}
              </div>
            </>
          ))}
          {isAuthorized && isAddNewPartnerForm ? (
            <div>
              <h4>Add New Partners and Collaborators</h4>
              <input
                type="file"
                onChange={(e) =>
                  handleNewPartnerDetailsChange("image", e.target.files[0])
                }
              />
              <input
                type="text"
                placeholder="Name"
                value={newPartnerDetails.name}
                onChange={(e) =>
                  handleNewPartnerDetailsChange("name", e.target.value)
                }
              />

              <button
                className="save-btn"
                onClick={() => handleAddNewPartner(1)}
              >
                Add New Partner
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsAddNewPartnerForm(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            isAuthorized && (
              <button
                className="save-btn"
                onClick={() => setIsAddNewPartnerForm(true)}
              >
                Add New Partner
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
