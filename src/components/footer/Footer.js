import React, { useState } from "react";
import "./Footer.css";
import Swal from "sweetalert2";
import { db, auth } from "../../FirebaseConfig";
import { ref, push, set } from "firebase/database"; // Import Firebase database methods
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/userSlice";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import the signInWithEmailAndPassword function

export default function Footer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  // Authorized emails from .env
  const authorizedEmails = process.env.REACT_APP_AUTHORIZED_EMAILS.split(",");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Check if the email is already authorized (if applicable)
    if (authorizedEmails.includes(email)) {
      setIsAuthorized(true);
      setEmail(email);
      Swal.fire({
        icon: "info",
        title: "Enter Password",
        text: "This email requires login.",
      });
    } else {
      // Add subscriber to Firebase if email is not authorized
      const subscribersRef = ref(db, "subscribers");
      const newSubscriberRef = push(subscribersRef);

      try {
        await set(newSubscriberRef, email); // Save the email directly
        setEmail("");
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "Thank you for subscribing.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Subscription Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Dispatch Redux login action
      dispatch(login({ userId: user.uid, email: user.email }));

      // Clear input fields and reset state
      setEmail("");
      setPassword("");
      setIsAuthorized(false);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in.",
      });
    } catch (error) {
      // Error handling for failed login
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout()); // Dispatch the logout action
      console.log("user is logged out");
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message,
      });
    }
  };
  return (
    <footer id="footer" className="footer dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-5 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">SVF Contact Center</span>
              </a>
              <div className="footer-contact pt-3">
                <p>United Bible Societies Building,1st Floor</p>
                <p>Ndemi Road, Kilimani,</p>
                <p>P.O. Box 13985-00800,</p>
                <p>Nairobi, Kenya</p>
                <p className="mt-3">
                  <strong>Phone:</strong>{" "}
                  <span>+254 722 828 926 / +254 729 111 175</span>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <span>info@sharedvaluesfoundation.org</span>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right"></i> <a href="#"> Home</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#"> About us</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#"> Scapii</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#"> Programmes and Interventions</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="#"> Partners and Collaborators</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Subscribe to our newsletter and receive the latest news!</p>
              <form
                onSubmit={
                  user
                    ? handleLogout
                    : isAuthorized
                    ? handleLogin
                    : handleSubscribe
                }
                className="php-email-form"
              >
                {/* <div className="newsletter-form">
                  {!isAuthorized ? (
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isAuthorized}
                    />
                  ) : (
                    <input
                      className="pass-input"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  )}
                  <input
                    type="submit"
                    value={isAuthorized ? "Log in" : "Subscribe"}
                  />
                </div> 
                */}

                <div className="newsletter-form">
                  {!isAuthorized && !user ? (
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  ) : isAuthorized ? (
                    <input
                      className="pass-input"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  ) : null}
                  <input
                    type="submit"
                    value={
                      user ? "Logout" : isAuthorized ? "Log in" : "Subscribe"
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
