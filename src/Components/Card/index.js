import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  CardContent,
  Link,
} from "@mui/material";

const DescriptionCard = ({ resource }) => {
  return (
    <Card sx={{ width: "330px", borderRadius: "4px", margin: "30px" }}>
      <CardHeader
        avatar={
          <Avatar src={resource.icon_url} alt="Icon" sx={{ borderRadius: 0 }} />
        }
        title={
          <Typography
            sx={{ fontWeight: "600", fontSize: "16px", color: "#171F46" }}
          >
            {resource.title}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              color: "#7E858E",
              lineHeight: "16px",
            }}
          >
            {resource.category}
          </Typography>
        }
      />
      <CardContent>
        <Link
          href={resource.link}
          underline="none"
          sx={{
            color: "#0B69FF",
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: "400",
          }}
        >
          {resource.link}
        </Link>
        <Typography
          sx={{
            color: "#7E858E",
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: "400",
          }}
        >
          {resource.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
