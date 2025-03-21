import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SubcategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState([]);

    const navigate = useNavigate();

    const fetchCategoryData = async () => {
        try {
            const response = await axiosInstance.get("/api/category");
            if (response.data && Array.isArray(response.data.data)) {
                setCategoryData(response.data.data);
            } else {
                console.log("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/api/category/${categoryId}/subcategory`
            );

            if (response.data && Array.isArray(response.data.data)) {
                setCategories(response.data.data);
                setError(null);
            } else {
                setError("Unexpected response format");
            }
        } catch (error) {
            setError("Error fetching subcategories");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        if (selectedCategory) {
            fetchSubcategories(selectedCategory);
        } else {
            setCategories([]); // Clear subcategories if no category is selected
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/category/${category}/subcategory/${id}`);
            if (category) fetchSubcategories(category); // Refresh the subcategory list
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    return (
        <Box p={2} mt={5}>
            <Typography variant="h4" gutterBottom>
                Subcategory List
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
                    onClick={() => navigate("/add-subcategory")}
                >
                    Add Subcategory
                </Button>
            </Box>

            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                    label="Category"
                    sx={{ mb: 2 }}
                >
                    {categoryData.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {error ? (
                <Typography color="error">{error}</Typography>
            ) : categories.length === 0 ? (
                <Typography mt={2}>
                    No subcategories found for the selected category.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="categories table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Subcategory Name</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((subcategory, index) => (
                                <TableRow key={subcategory._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ width: '100px' }}>
                                        <img
                                            src={subcategory.image}
                                            alt={subcategory.name}
                                            style={{
                                                width: '100%',
                                                objectFit: "cover",
                                                borderRadius: 4,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {subcategory.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                navigate(`/edit-subcategory/${subcategory._id}`)
                                            }
                                            sx={{ mr: "15px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(subcategory._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default SubcategoryList;
