import { Container, Stack, Paper, Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import DescriptionCard from "../../Components/Card";

const MainSection = () => {
  const tabs = ["Resources", "Requests", "Users"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [resources, setResources] = useState([]);

  const handleTabChange = (index) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
  };

  const getResourcesList = () => {
    fetch(
      "https://media-content.ccbp.in/website/react-assignment/resources.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      });
  };

  const checkVisible = (tag) => {
    if (selectedIndex === 0) return true;
    else if (selectedIndex === 1 && tag === "request") return true;
    else if (selectedIndex === 2 && tag === "user") return true;
    else return false;
  };
  useEffect(() => {
    getResourcesList();
  }, []);

  return (
    <Container
      sx={{
        padding: "50px  10px",
        margin: "0",
        width: "100%",
      }}
      disableGutters
    >
      <Grid sx={{ height: "65px", display: "flex", justifyContent: "center" }}>
        <Stack
          direction="row"
          spacing={0}
          width="60%"
          minWidth="300px"
          alignItems="center"
          justifyContent="center"
          height="24px"
        >
          {tabs.map((tab, index) => (
            <Button
              key={index}
              sx={{
                width: "100%",
                backgroundColor:
                  selectedIndex === index ? "#0B69FF" : "#D7DFE9",
                color: selectedIndex === index ? "white" : "#171F46",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "0px",
                textTransform: "none",
                ":hover": {
                  bgcolor: "#D7DFE93D",
                  color: "#171F46", // theme.palette.primary.main
                },
              }}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Grid
        container
        item
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        {resources.map((resource, index) => {
          if (!checkVisible(resource.tag)) return;
          return <DescriptionCard key={index} resource={resource} />;
        })}
      </Grid>
    </Container>
  );
};

export default MainSection;
