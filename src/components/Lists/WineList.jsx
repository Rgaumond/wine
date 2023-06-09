import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
//type WineObj = { id_: String, name: string }[];
// const groups = [
//   { id_: 0, name: "Rouge" },
//   { id_: 1, name: "Blanc" },
//   { id_: 2, name: "Rosé" },
//   { id_: 3, name: "Mousseux" },
//   { id_: 4, name: "Champagne" },
//   { id_: 4, name: "All" },
// ];

const WineList = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [wines, setWines] = useState([]);
  const [wineGroup, setWineGroup] = React.useState("All");
  const [dataIsReturned, setDataReturned] = useState(false);
  const [group, setGroup] = useState("All");
  const params = useParams();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const sortByMillesime = (wines) => {
    const filtered = wines.filter(inStock);

    filtered.sort((a, b) => (a.millesime > b.millesime ? 1 : -1));
    return filtered;
  };

  const inStock = (wines) => {
    if (!params.view || params.view !== "all") return wines.qty > 0;
    else return wines;
  };

  const filteredWine = wines.filter((wine) => {
    if (searchValue === "") {
      if (wineGroup === "All") return wine;
      else if (wine.group === wineGroup) return wine;
    } else {
      if (wineGroup === "All") {
        if (wine.name.toLowerCase().includes(searchValue.toLowerCase()))
          return wine;
      } else if (
        wine.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        wine.group === wineGroup
      )
        return wine;
    }
  });

  const fetchData = () => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(sortByMillesime(data.obj));
        setDataReturned(true);
      });
  };

  const filterRed = (e) => {
    setWineGroup(e.target.value);
    // setGroup(e.target.value);
    setSearchValue(searchValue);
    setGroup(e.target.value);
  };

  const editWine = (id) => {
    window.location.href = "./Capture/" + id;
  };
  //Called once after the render (component is mounted) - the array is the dependency array basically the parameters which trigger the function is they are changed
  useEffect(() => {
    fetchData();
  }, []);

  if (dataIsReturned) {
    return (
      <>
        <div
          style={{
            backgroundColor: "#fff ",
            position: "sticky ",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", flexGrow: 1, backgroundColor: "#fff " }}
          >
            <Input
              id="wineName"
              message="Nom du vin"
              label=""
              hasLabel="false"
              handleChange={handleInputChange}
            ></Input>
          </div>
          <div style={{ display: "flex", right: 0 }}>
            <Select
              handleChange={filterRed}
              defaultValue={group}
              list="type"
              name="Type"
            />
          </div>
        </div>

        {filteredWine.map((wine) => {
          if (wine.rating !== undefined)
            return (
              <div
                className={"list-item-container"}
                onClick={() => {
                  editWine(wine._id);
                }}
              >
                <div className={""} style={{ position: "relative" }}>
                  {wine.name} {wine.millesime}&nbsp;qt:{wine.qty}&nbsp;&nbsp;
                  <div
                    style={{ position: "absolute", right: "10px", top: "1px" }}
                  >
                    {wine.rating}
                    <FaRegStar
                      style={{ color: "#ecc609", fontSize: "1.5em" }}
                    />
                  </div>
                </div>
              </div>
            );
          else
            return (
              <div
                className={"list-item-container"}
                onClick={() => {
                  editWine(wine._id);
                }}
              >
                <div className={""} style={{ position: "relative" }}>
                  {wine.name} {wine.millesime}&nbsp;qt:{wine.qty}&nbsp;&nbsp;
                  <div
                    style={{ position: "absolute", right: "10px", top: "1px" }}
                  ></div>
                </div>
              </div>
            );
        })}
      </>
    );
  }
};

export default WineList;
