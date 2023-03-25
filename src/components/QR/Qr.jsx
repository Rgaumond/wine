import React from "react";

export default function Qr() {
  let theImage = process.env.REACT_APP_S_PATH + "qr.png";
  return (
    <div className={"qr"}>
      <img src={theImage} className={"qr-img"} alt="label"></img>
    </div>
  );
}
