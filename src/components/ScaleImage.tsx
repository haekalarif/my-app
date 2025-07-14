import React from "react";

const ScaleImage = () => {
    const imageStyle = {
        width: "300px",
        height: "200px",
        transition: "transform 0.3s ease-in-out",
    };

    const imageContainerStyle = {
        overflow: "hidden", // Mencegah gambar melampaui batas
        display: "inline-block",
    };

    return (
        <div style={imageContainerStyle}>
            <img
                src="https://via.placeholder.com/300x200"
                alt="Example"
                style={imageStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />

            <div onClick={() => {
                // window.location.href = "https://www.youtube.com";
                window.location.replace("https://www.youtube.com");
            }}> youtube </div>
        </div>
    );
};

export default ScaleImage;
