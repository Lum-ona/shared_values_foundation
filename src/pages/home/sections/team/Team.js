import React, { useState } from "react";
import { auth, db } from "../../../../FirebaseConfig";
import { ref, update, get } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import Swal from "sweetalert2";
import "./Team.css";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function Team({ data, sectionId, dataIndex }) {
  const { content } = data;
  const teams = content?.[0]?.paragraphs?.map(
    ({ h2, p = "", members = [] }) => ({
      category: h2,
      description: p,
      members: members.map(({ image, name, role, desc }, memberIndex) => ({
        image: image,
        name,
        role,
        desc,
        memberIndex,
      })),
    })
  );

  const isAuthorized = process.env.REACT_APP_AUTHORIZED_EMAILS?.split(
    ","
  ).includes(auth.currentUser?.email);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [editedMemberDetails, setEditedMemberDetails] = useState({
    name: "",
    role: "",
    desc: "",
  });
  const [isAddNewMemberForm, setIsAddNewMemberForm] = useState(false);
  const [newMemberDetails, setNewMemberDetails] = useState({
    image: "",
    name: "",
    role: "",
    desc: "",
  });

  // const [imageFile, setImageFile] = useState(null); // New state for image upload

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleMemberDetailsChange = (field, value) => {
    setEditedMemberDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveParagraph = async (index) => {
    if (editedText) {
      try {
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${index}/p`;
        await update(ref(db), {
          [path]: editedText,
        });
        console.log("Text saved to Firebase:", editedText);
        setEditingIndex(null);
        setEditedText("");
      } catch (error) {
        console.error("Error saving text to Firebase:", error.message);
      }
    }
  };

  const handleSaveMember = async (paragraphIndex, memberIndex) => {
    const { name, role, desc } = editedMemberDetails;
    if (name || role || desc) {
      try {
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${paragraphIndex}/members/${memberIndex}`;
        await update(ref(db), {
          [`${path}/name`]:
            name || teams[paragraphIndex].members[memberIndex].name,
          [`${path}/role`]:
            role || teams[paragraphIndex].members[memberIndex].role,
          [`${path}/desc`]:
            desc || teams[paragraphIndex].members[memberIndex].desc,
        });
        console.log("Member details saved to Firebase:", { name, role, desc });
        setEditingMember(null);
        setEditedMemberDetails({ name: "", role: "", desc: "" });
      } catch (error) {
        console.error(
          "Error saving member details to Firebase:",
          error.message
        );
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedText("");
    setEditingMember(null);
    setEditedMemberDetails({ name: "", role: "", desc: "" });
  };

  // Image upload to Cloudinary with SweetAlert2 progress
  // Image upload to Cloudinary and update Firebase with new URL
  const handleImageChange = async (event, paragraphIndex, memberIndex) => {
    const file = event.target.files[0];
    if (file) {
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

      // setImageFile(file);

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
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );

      try {
        // Upload the image to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
          formData
        );

        const newImageUrl = response.data.secure_url;
        console.log("New Image URL:", newImageUrl); // Log the new image URL

        // Update Firebase with the new image URL
        const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${paragraphIndex}/members/${memberIndex}/image`;
        await update(ref(db), {
          [path]: newImageUrl,
        });

        // Notify the user that the image upload was successful
        Swal.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
          text: "The image has been successfully uploaded and replaced in Cloudinary.",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: `There was an error uploading the image. ${
            error.response?.data?.message || error.message || error
          }`,
        });
      }
    }
  };

  const handleAddNewMember = async (paragraphIndex) => {
    const { name, role, desc, image } = newMemberDetails;
    if (!name || !role || !desc || !image) {
      Swal.fire("Please fill in all member details and upload an image.");
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
      const path = `pages/${dataIndex}/sections/${sectionId}/content/0/paragraphs/${paragraphIndex}/members`;
      const snapshot = await get(ref(db, path));
      const lastIndex = snapshot.exists()
        ? Object.keys(snapshot.val()).length
        : 0;

      // Set the path with the new index number
      await update(ref(db), {
        [`${path}/${lastIndex}`]: { image: newImageUrl, name, role, desc },
      });

      Swal.fire("Success", "New member added successfully!", "success");

      // Clear form
      setNewMemberDetails({ name: "", role: "", desc: "", image: null });
    } catch (error) {
      console.error("Error adding new member:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the member.",
      });
    }
  };

  const handleNewMemberDetailsChange = (field, value) => {
    setNewMemberDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="section-title" data-aos="fade-right">
          <h2>The SVF Team</h2>
        </div>
        {teams?.map(({ category, description, members }, paragraphIndex) => (
          <div key={paragraphIndex}>
            <h2>{category}</h2>
            {editingIndex === paragraphIndex ? (
              <div className="editable-container">
                <TextareaAutosize
                  value={editedText}
                  onChange={handleTextChange}
                  className="editable-textarea"
                  minRows={1}
                />
                <div className="editable-buttons">
                  <button
                    className="save-btn"
                    onClick={() => handleSaveParagraph(paragraphIndex)}
                  >
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>
                {description}
                {isAuthorized && (
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingIndex(paragraphIndex);
                      setEditedText(description);
                    }}
                  >
                    <EditIcon className="edit-btn-icon" />
                  </button>
                )}
              </p>
            )}

            <div className="row mb-5">
              {members.map(({ image, name, role, desc, memberIndex }) => (
                <div className="col-lg-6" key={memberIndex}>
                  <div
                    className="member"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div className="pic">
                      <img src={image} className="img-fluid" alt={name} />
                      {isAuthorized && (
                        <label htmlFor={`upload-photo-${memberIndex}`}>
                          <AddAPhotoIcon
                            style={{
                              fontSize: "28px",
                              marginTop: "10px",
                              color: "#b82556",
                              cursor: "pointer",
                            }}
                          />
                          <input
                            type="file"
                            id={`upload-photo-${memberIndex}`}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleImageChange(e, paragraphIndex, memberIndex)
                            }
                          />
                        </label>
                      )}
                    </div>
                    <div className="member-info">
                      {editingMember === memberIndex ? (
                        <div className="editable-container">
                          <input
                            type="text"
                            value={editedMemberDetails.name}
                            onChange={(e) =>
                              handleMemberDetailsChange("name", e.target.value)
                            }
                            placeholder="Member Name"
                          />
                          <input
                            type="text"
                            value={editedMemberDetails.role}
                            onChange={(e) =>
                              handleMemberDetailsChange("role", e.target.value)
                            }
                            placeholder="Role"
                          />
                          <TextareaAutosize
                            value={editedMemberDetails.desc}
                            className="editable-textarea"
                            onChange={(e) =>
                              handleMemberDetailsChange("desc", e.target.value)
                            }
                            placeholder="Description"
                            minRows={3}
                          />
                          <div className="editable-buttons">
                            <button
                              className="save-btn"
                              onClick={() =>
                                handleSaveMember(paragraphIndex, memberIndex)
                              }
                            >
                              Save Changes
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4>{name}</h4>
                          <span>{role}</span>
                          <p>{desc}</p>
                          {isAuthorized && (
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setEditingMember(memberIndex);
                                setEditedMemberDetails({
                                  name,
                                  role,
                                  desc,
                                });
                              }}
                            >
                              <EditIcon className="edit-btn-icon" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isAuthorized && isAddNewMemberForm ? (
                <div>
                  <h4>Add New Member</h4>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleNewMemberDetailsChange("image", e.target.files[0])
                    }
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={newMemberDetails.name}
                    onChange={(e) =>
                      handleNewMemberDetailsChange("name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={newMemberDetails.role}
                    onChange={(e) =>
                      handleNewMemberDetailsChange("role", e.target.value)
                    }
                  />
                  <TextareaAutosize
                    placeholder="Description"
                    className="editable-textarea"
                    value={newMemberDetails.desc}
                    onChange={(e) =>
                      handleNewMemberDetailsChange("desc", e.target.value)
                    }
                  />

                  <button
                    className="save-btn"
                    onClick={() => handleAddNewMember(paragraphIndex)}
                  >
                    Add New Member
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsAddNewMemberForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                isAuthorized && (
                  <button
                    className="save-btn"
                    onClick={() => setIsAddNewMemberForm(true)}
                  >
                    Add New Member
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
