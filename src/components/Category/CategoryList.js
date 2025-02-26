import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFetchData = () => {
    axiosInstance
      .get("/api/category")
      .then((response) => {
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching categories");
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete("/api/category/" + id)
      .then((res) => handleFetchData())
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2} mt={5}>
      <Typography variant="h4" gutterBottom>
        Category List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{
            // width: "100%",
            mb: "20px",
            textTransform: "unset",
            border: "1px solid black",
            padding: "6px 24px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "0px",
            backgroundColor: '#000',
            color: '#fff',
            "&:hover": {
                backgroundColor: '#fff',
                color: '#000',
            },
        }}
          onClick={() => navigate("/add-category")}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No.</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{width:'100px'}}>
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      width:'100%',
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit-category/${category._id}`)}
                    sx={{ mr: "15px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryList;
