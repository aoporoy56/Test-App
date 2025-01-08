import React, { useState } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";

function TShirtCustomizer() {
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveFinalImage = () => {
    const element = document.getElementById("tshirt-container");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "custom-tshirt.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      <div
        id="tshirt-container"
        style={{
          position: "relative",
          width: "400px",
          height: "500px",
          background: `url('/t-shirt.png') no-repeat center/contain`,
          margin: "20px auto",
        }}
      >
        {logo && (
          <Draggable>
            <img
              src={logo}
              alt="Uploaded Logo"
              style={{
                position: "absolute",
                maxWidth: "100px",
                maxHeight: "100px",
                cursor: "move",
              }}
            />
          </Draggable>
        )}
      </div>
      <button onClick={saveFinalImage}>Save Final Image</button>
    </div>
  );
}

export default TShirtCustomizer;
