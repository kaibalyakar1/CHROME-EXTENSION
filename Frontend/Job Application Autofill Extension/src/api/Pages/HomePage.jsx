import React, { useState, useEffect } from "react";
import "./Home.css"; // CSS file for styling the homepage

const images = [
  {
    src: "https://via.placeholder.com/600x400/ff7f7f/ffffff?text=Job+Search+1",
  },
  {
    src: "https://via.placeholder.com/600x400/7f7fff/ffffff?text=Job+Search+2",
  },
  {
    src: "https://via.placeholder.com/600x400/7fff7f/ffffff?text=Job+Search+3",
  },
];

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        handleNextImage(); // Automatically slide images when not hovered
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isHovered]); // Re-run effect if isHovered changes

  return (
    <div className="container">
      <div className="hero-text">
        <h1>Meet Your AI Copilot for the Job Search</h1>
        <p>
          Simplify helps you autofill job applications, tailor resumes, and
          automatically track applications you submit - all for free.
        </p>
        <button className="get-extension-button">
          Get the Extension - It's Free!
        </button>
        <div className="ratings">
          ★★★★★★★★★★ 30,000,000+ applications submitted
        </div>
      </div>
      <div
        className="image-slider"
        onMouseEnter={() => setIsHovered(true)} // Set hover state
        onMouseLeave={() => setIsHovered(false)} // Reset hover state
      >
        <img src={images[currentImageIndex].src} alt="Slide" />
        <div className="slider-buttons">
          <button className="slider-button" onClick={handlePreviousImage}>
            Previous
          </button>
          <button className="slider-button" onClick={handleNextImage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
