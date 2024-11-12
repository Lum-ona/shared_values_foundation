import React, { useEffect } from "react";
import "./Hero.css";
import enviroImage from "../../../../assets/img/environment.jpeg";
import educImage from "../../../../assets/img/education.jpg";
import liveImage from "../../../../assets/img/livelihoods.jpeg";

export default function Hero() {
  useEffect(() => {
    // Initialize carousel indicators
    const heroCarouselIndicators = document.getElementById(
      "hero-carousel-indicators"
    );
    const heroCarouselItems = document.querySelectorAll(
      "#heroCarousel .carousel-item"
    );

    heroCarouselItems.forEach((_, index) => {
      const indicator = document.createElement("li");
      indicator.setAttribute("data-bs-target", "#heroCarousel");
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) indicator.classList.add("active");
      heroCarouselIndicators.appendChild(indicator);
    });

    // Automatically move to the next slide every 5 seconds
    const intervalId = setInterval(() => {
      const nextButton = document.querySelector(
        "#heroCarousel .carousel-control-next"
      );
      if (nextButton) nextButton.click();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="hero">
      <div className="hero-container">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <ol
            id="hero-carousel-indicators"
            className="carousel-indicators"
          ></ol>

          <div className="carousel-inner" role="listbox">
            <div
              className="carousel-item active"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/2883380/pexels-photo-2883380.jpeg?auto=compress&cs=tinysrgb&w=800)`,
              }}
            >
              <div className="carousel-container">
                <div className="container">
                  <p
                    className="animate__animated animate__fadeInUp"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Shared Values Foundation
                  </p>
                  <a
                    href="#about"
                    className="btn-get-started scrollto animate__animated animate__fadeInUp"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div
              className="carousel-item"
              style={{ backgroundImage: `url(${educImage})` }}
            >
              <div className="carousel-container">
                <div className="container">
                  <h2
                    className="animate__animated animate__fadeInDown"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    Quality and Equitable Education
                  </h2>
                  <p
                    className="animate__animated animate__fadeInUp"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Education
                  </p>
                  <a
                    href="#about"
                    className="btn-get-started scrollto animate__animated animate__fadeInUp"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div
              className="carousel-item"
              style={{ backgroundImage: `url(${enviroImage})` }}
            >
              <div className="carousel-container">
                <div className="container">
                  <h2
                    className="animate__animated animate__fadeInDown"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Basic Health and Wellbeing
                  </h2>
                  <p
                    className="animate__animated animate__fadeInUp"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    Health
                  </p>
                  <a
                    href="#about"
                    className="btn-get-started scrollto animate__animated animate__fadeInUp"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div
              className="carousel-item"
              style={{ backgroundImage: `url(${liveImage})` }}
            >
              <div className="carousel-container">
                <div className="container">
                  <h2
                    className="animate__animated animate__fadeInDown"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Social economic empowerment
                  </h2>
                  <p
                    className="animate__animated animate__fadeInUp"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    Livelihoods
                  </p>
                  <a
                    href="#about"
                    className="btn-get-started scrollto animate__animated animate__fadeInUp"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#heroCarousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bi bi-chevron-left"
              aria-hidden="true"
            ></span>
          </a>

          <a
            className="carousel-control-next"
            href="#heroCarousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bi bi-chevron-right"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </div>
    </section>
  );
}
