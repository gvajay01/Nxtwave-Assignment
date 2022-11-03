import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import image from "./../../images/resource.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputData = [
  {
    label: "Item Name",
    multiline: false,
    value: "name",
    limit: 24,
  },
  {
    label: "Link",
    multiline: false,
    value: "link",
    limit: 1000,
  },
  {
    label: "Resources Name",
    multiline: false,
    value: "resource",
    limit: 24,
  },
  {
    label: "Description",
    multiline: true,
    value: "description",
    limit: 200,
  },
];
const NewResource = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const [values, setValues] = useState({
    name: "",
    link: "",
    resource: "",
    description: "",
  });

  const notifyError = (errorMsg) => {
    toast.error(errorMsg, {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
    });
  };

  const notifySuccess = (successMsg) => {
    toast.success(successMsg, {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
    });
  };

  const containsOnlyNumbers = (str) => {
    return /^[0-9]+$/.test(str);
  };

  const isValidUrl = (urlString) => {
    let urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const checkFieldEmpty = (data) => {
    let index = 0;
    for (let value in data) {
      if (data[value].length === 0) {
        let errorMsg = `${inputData[index].label} is empty`;
        notifyError(errorMsg);
        return true;
      }
      index++;
    }

    return false;
  };

  const checkFieldLimit = (data) => {
    for (let field of inputData) {
      if (data[field.value].length > field.limit) {
        let errorMsg = `${field.label} is more than ${field.limit} characters`;
        notifyError(errorMsg);
        return true;
      }
    }
    return false;
  };

  const checkIfOnlyNumber = (data) => {
    let index = 0;
    for (let value in data) {
      if (containsOnlyNumbers(data[value])) {
        let errorMsg = `${inputData[index].label} contains only numbers`;
        notifyError(errorMsg);
        return true;
      }
      index++;
    }

    return false;
  };

  const checkLinkValid = (link) => {
    if (!isValidUrl(link)) {
      let errorMsg = `Link is not a valid url`;
      notifyError(errorMsg);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    let data = { ...values };

    // checking empty fields
    if (checkFieldEmpty(data)) return;

    // checking limit
    if (checkFieldLimit(data)) return;

    // check if fields contain only numbers
    if (checkIfOnlyNumber(data)) return;

    // check link
    if (!checkLinkValid(data.link)) return;

    // Calls API
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    fetch(
      "https://media-content.ccbp.in/website/react-assignment/add_resource.json",
      {
        // Adding method type
        method: "POST",
        mode: "no-cors",
        // Adding body or contents to send
        body: JSON.stringify(data),
        // Adding headers to the request
        headers: headers,
      }
    )
      // Converting to JSON
      .then((response) => notifySuccess("Successfully added new resource"))
      .catch((err) => notifyError("Internal server error"));
  };

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value.trim() });
  };

  // console.log("Re-rendered  ");
  return (
    <Container
      sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
      disableGutters
      maxWidth={false}
    >
      <Grid sx={{ width: "100%", padding: "20px" }}>
        <Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "24px",
              cursor: "pointer",
              width: "40px",
            }}
            onClick={navigateToHome}
          >
            <ArrowBackIosNewIcon sx={{ width: "14px", height: "12px" }} />
            <Typography sx={{ fontSize: "14px" }}> Users </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: "#171F46",
              textAlign: "center",
            }}
          >
            Item Details
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {inputData.map((input, index) => (
              <Input
                input={input}
                key={index}
                value={values[input.name]}
                handleChange={handleChange}
              />
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleSubmit}>
              CREATE
            </Button>
          </Box>
        </Grid>
        <ToastContainer />
      </Grid>
      <Grid sx={{ display: { xs: "none", md: "flex" } }}>
        <img src={image} alt="Img" loading="lazy" />
      </Grid>
    </Container>
  );
};

export default NewResource;
