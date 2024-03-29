import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
const initialValues = {
  name: "",
  qty: "0",
  productor: "",
  millesime: "",
  grape: "",
  group: "",
  price: "",
  country: "",
  commentary: "",
  region: "",
  img: "",
  rating: 0,
};
const Capture = (props) => {
  const [currentWine, setCurrentWine] = useState({});
  const params = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWine({
      ...currentWine,
      [name]: value,
    });
  };

  const addWine = (values) => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      window.location.href = "./";
    });
  };

  const cloneWine = () => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentWine),
    }).then(() => {
      window.location.href = "./";
    });
  };

  const updateWine = (values, refreshPage) => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      if (refreshPage) window.location.reload();
      else window.location.href = "../";
    });
  };

  const fetchData = () => {
    if (params.wineid) {
      return fetch(
        process.env.REACT_APP_ENPOINT_URL + "/wines/" + params.wineid
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWine(data.obj[0]);
        });
    } else {
      setCurrentWine(initialValues);
    }
  };

  // let handleFocus = (event) => {
  //   event.target.select();
  // };
  const handleSubmit = (e) => {
    // console.log(values);
    if (params.wineid) updateWine(currentWine);
    else addWine(currentWine);
    e.preventDefault();
  };

  const handleSubmitRequest = (e) => {
    // console.log(values);
    if (params.wineid) updateWine(currentWine);
    else addWine(currentWine);
    e.preventDefault();
  };

  const handleDelete = (e) => {
    // console.log(values);
  };

  const displayButtons = () => {
    if (params.wineid) {
      document.getElementById("submitButton").innerHTML = "Modifier";
      document.getElementById("deleteButton").innerHTML = "Éliminer";
      document.getElementById("qty").readOnly = true;
      document.getElementById("qty").addEventListener("click", () => {
        window.location.href = "../Cellar/" + params.wineid;
      });
    } else {
      document.getElementById("submitButton").innerHTML = "Enregistrer";
      document.getElementById("deleteButton").innerHTML = "Annuler";
      document.getElementById("qty").readOnly = false;
      document.getElementById("qty").addEventListener("click", () => {
        return false;
      });
    }
  };

  const fileHandler = (e) => {
    return fileUploadHandler(e.target.files[0]);
  };

  const fileUploadHandler = (imgFile) => {
    const fd = new FormData();
    fd.append("image", imgFile, imgFile.name);
    axios.post(process.env.REACT_APP_ENPOINT_URL + "/file", fd).then((res) => {
      currentWine.img = imgFile.name;
      updateWine(currentWine, true);
    });
  };

  const imageFile = () => {
    if (currentWine.img !== undefined) {
      let theImage = process.env.REACT_APP_S_PATH + currentWine.img;
      return (
        <div className={"img-container"}>
          <img src={theImage} className={"label"} alt="label"></img>
        </div>
      );
    } else {
      return (
        <>
          <label for="img" class="img-btn img-empty">
            Ajouter photo
          </label>
          <Input
            id="img"
            type="file"
            label=""
            name="img"
            cssstyle="img-style"
            handleChange={fileHandler}
          ></Input>
        </>
      );
    }
  };

  const imageFileChange = (action) => {
    if (currentWine.img === undefined) {
      return <></>;
    } else {
      let labelValue = "Ajouter photo";
      if (action) labelValue = "Modifier photo";
      return (
        <>
          <label for="img" class="img-btn">
            {labelValue}
          </label>
          <Input
            id="img"
            type="file"
            label=""
            name="img"
            cssstyle="img-style"
            handleChange={fileHandler}
          ></Input>
        </>
      );
    }
  };
  const inventory = () => {
    if (currentWine.qty > 0 && currentWine._id !== undefined) {
      return (
        <Button
          id="inventoryButton"
          className={"wine-button"}
          variant="success"
          onClick={() => {
            window.location.href = "../Cellar/" + currentWine._id;
          }}
        >
          Inventaire {currentWine.qty}
        </Button>
      );
    } else {
      return (
        <Input
          id="qty"
          label="Qtée"
          type="number"
          name="qty"
          handleChange={handleChange}
          defaultValue={currentWine.qty}
        ></Input>
      );
    }
  };

  //Called once after the render (component is mounted) - the array is the dependency array basically the parameters which trigger the function is they are changed
  useEffect(() => {
    fetchData();
    displayButtons();
  }, []);

  return (
    <>
      <div className={"list-item-container"}>
        <Input
          id="wineName"
          type="text"
          message="Nom du vin"
          label="Nom"
          name="name"
          handleChange={handleChange}
          defaultValue={currentWine.name}
        ></Input>
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Raisin(s)/Région"
          name="grape"
          handleChange={handleChange}
          list="grapes"
          defaultValue={currentWine.grape}
        />
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Pays"
          name="country"
          handleChange={handleChange}
          list="country"
          defaultValue={currentWine.country}
        />
      </div>
      <div className={"lists-top-container"}>
        <div className={"lists-column-container"}>
          {inventory()}
          {imageFile()}
          {imageFileChange("mod")}
        </div>
        <div className={"lists-column-container"}>
          <div className={"list-item-container"}>
            <Select
              label="Type"
              name="group"
              handleChange={handleChange}
              list="type"
              defaultValue={currentWine.group}
            />
          </div>

          <div className={"list-item-container"}>
            <Select
              label="Millésime"
              name="millesime"
              handleChange={handleChange}
              list="millesime"
              defaultValue={currentWine.millesime}
            />
          </div>

          <div className={"list-item-container"}>
            <Input
              id="price"
              label="Coût"
              type="number"
              name="price"
              handleChange={handleChange}
              defaultValue={currentWine.price}
            ></Input>
          </div>
          <div className={"list-item-container"}>
            <Input
              id="rating"
              label="Notation"
              type="number"
              name="rating"
              handleChange={handleChange}
              defaultValue={currentWine.rating}
            ></Input>
          </div>
        </div>
      </div>
      <div className={"list-item-container"}>
        <Input
          id="comments"
          message="Commentaires"
          type="area"
          label="Commentaires"
          name="commentary"
          handleChange={handleChange}
          defaultValue={currentWine.commentary}
          cssstyle="comment-area"
        ></Input>
      </div>
      <div className={"button-container"}>
        <Button
          id="deleteButton"
          className={"wine-button"}
          variant="danger"
          onClick={handleDelete}
        >
          Annuler
        </Button>
        <Button
          id="submitButton"
          className={"wine-button"}
          variant="success"
          onClick={handleSubmitRequest}
        >
          Enregistrer
        </Button>
        <Button
          id="submitButton"
          className={"wine-button"}
          variant="success"
          onClick={cloneWine}
        >
          Clone
        </Button>
      </div>
    </>
  );
};

export default Capture;
