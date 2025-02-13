// import React, { useState, useEffect } from "react";
// import upload_area from "../assets/images/addProduct/upload_area1.svg";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   TextareaAutosize,
//   Typography,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../Instance";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const AddProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     size_options: [],
//     category: "",
//     subcategory: "",
//     gender: "",
//     price: { orignal_price: "", discounted_price: "" },
//     color_options: [],
//     other_info: [],
//     instruction: [],
//     product_images: [],
//     stock: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const fetchCategoryData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/category");
//       if (response.data && Array.isArray(response.data.data)) {
//         setCategories(response.data.data);
//       } else {
//         console.error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSubcategories = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/api/category/${formData.category}/subcategory`
//       );
//       if (response.data && Array.isArray(response.data.data)) {
//         setSubcategories(response.data.data);
//       } else {
//         console.error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryData();
//     if (formData.category) fetchSubcategories();
//     if (id) {
//       setIsLoading(true);
//       axiosInstance
//         .get(`/api/product/${id}`)
//         .then((response) => {
//           const product = response.data;
//           setFormData({
//             ...product,
//             price: {
//               orignal_price: product.price?.orignal_price || "",
//               discounted_price: product.price?.discounted_price || "",
//             },
//             product_images: product.product_images || [],
//             category: product.category._id,

//             instruction: product.instruction || [],
//           });
//         })
//         .catch((error) => {
//           toast.error("Failed to fetch product details");
//           console.error("Error fetching product:", error);
//         })
//         .finally(() => setIsLoading(false));
//     }
//   }, [id, formData.category]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       product_images: [...prev.product_images, ...files],
//     }));
//   };

//   const handlePriceChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       price: {
//         ...prev.price,
//         [name]: value,
//       },
//     }));
//   };

//   const handleAddSize = () => {
//     setFormData((prev) => ({
//       ...prev,
//       size_options: [...prev.size_options, { size: "", stock: "" }],
//     }));
//   };

//   const handleAddOtherInfo = () => {
//     setFormData((prev) => ({
//       ...prev,
//       other_info: [...prev.other_info, { titel: "", description: "" }],
//     }));
//   };

//   const handleAddColor = () => {
//     setFormData((prev) => ({
//       ...prev,
//       color_options: [...prev.color_options, { color: "", hex: "" }],
//     }));
//   };

//   const handleAddIntruction = () => {
//     setFormData((prev) => ({
//       ...prev,
//       instruction: [...prev.instruction, ""],
//     }));
//   };

//   const handleSizeChange = (e, index) => {
//     const newSizeOptions = [...formData.size_options];
//     newSizeOptions[index] = {
//       ...newSizeOptions[index],
//       [e.target.name]: e.target.value,
//     };
//     setFormData((prev) => ({ ...prev, size_options: newSizeOptions }));
//   };

//   const handleColorChange = (e, index) => {
//     const newColorOptions = [...formData.color_options];
//     newColorOptions[index] = {
//       ...newColorOptions[index],
//       [e.target.name]: e.target.value,
//     };
//     setFormData((prev) => ({ ...prev, color_options: newColorOptions }));
//   };

//   const handleOtherInfoChange = (e, index) => {
//     const newOtherInfoOptions = [...formData.other_info];
//     newOtherInfoOptions[index] = {
//       ...newOtherInfoOptions[index],
//       [e.target.name]: e.target.value,
//     };
//     setFormData((prev) => ({ ...prev, other_info: newOtherInfoOptions }));
//   };

//   const handleIntructionChange = (e, index) => {
//     const newIntructionOptions = [...formData.instruction];
//     newIntructionOptions[index] = e.target.value;
//     setFormData({
//       ...formData,
//       instruction: newIntructionOptions,
//     });
//   };

//   const handleRemoveColor = (index) => {
//     const updatedOtherInfo = [...formData.color_options];
//     updatedOtherInfo.splice(index, 1);
//     setFormData({
//       ...formData,
//       color_options: updatedOtherInfo,
//     });
//   };
//   const handleRemoveSize = (index) => {
//     const updatedOtherInfo = [...formData.size_options];
//     updatedOtherInfo.splice(index, 1);
//     setFormData({
//       ...formData,
//       size_options: updatedOtherInfo,
//     });
//   };
//   const handleRemoveOtherInfo = (index) => {
//     const updatedOtherInfo = [...formData.other_info];
//     updatedOtherInfo.splice(index, 1);
//     setFormData({
//       ...formData,
//       other_info: updatedOtherInfo,
//     });
//   };

//   const handleRemoveIntruction = (index) => {
//     const updatedIntruction = [...formData.instruction];
//     updatedIntruction.splice(index, 1);
//     setFormData({
//       ...formData,
//       instruction: updatedIntruction,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const formDataPayload = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key === "category") return;
//       if (
//         key === "price" ||
//         key === "size_options" ||
//         key === "color_options" ||
//         key === "other_info" ||
//         key === "instruction"
//       ) {
//         formDataPayload.append(key, JSON.stringify(formData[key]));
//       } else if (
//         key === "product_images" &&
//         formData.product_images.length > 0
//       ) {
//         formData.product_images.forEach((image) => {
//           if (image instanceof File) {
//             formDataPayload.append(key, image);
//           } else {
//             formDataPayload.append(key, image);
//           }
//         });
//       } else {
//         formDataPayload.append(key, formData[key]);
//       }
//     });

//     try {
//       const url = id ? `/api/product/${id}` : "/api/product";
//       const method = id ? "put" : "post";

//       const response = await axiosInstance({
//         method,
//         url,
//         data: formDataPayload,
//         headers: {
//           "Content-Type": "multipart/form-data",
//           token: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         toast.success(`Product ${id ? "updated" : "added"} successfully!`);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error);
//       toast.error(`Failed to ${id ? "update" : "add"} product!`);
//     }
//   };

//   if (isLoading) {
//     return <Typography>Loading product details...</Typography>;
//   }

//   return (
//     <Box
//       component="section"
//       sx={{
//         mt: "50px",
//         p: 4,
//         backgroundColor: "rgba(240, 248, 255, 0.2)",
//         width: "100%",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: "bold", pb: 2, textTransform: "uppercase" }}
//         >
//           {id ? "Edit Product" : "Add Product"}
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Box>
//               <Typography variant="body1">Upload Product Images</Typography>
//               <label htmlFor="product_images">
//                 <img
//                   src={upload_area}
//                   alt="Upload Preview"
//                   style={{
//                     height: 100,
//                     cursor: "pointer",
//                     objectFit: "cover",
//                   }}
//                 />
//               </label>
//               <input
//                 type="file"
//                 id="product_images"
//                 name="product_images"
//                 onChange={handleFileChange}
//                 hidden
//                 multiple
//               />
//             </Box>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body1">Selected Images</Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {formData.product_images.map((image, index) => {
//                 const imageUrl =
//                   image instanceof File ? URL.createObjectURL(image) : image;
//                 return (
//                   <img
//                     key={index}
//                     src={imageUrl}
//                     alt={`Uploaded Image ${index + 1}`}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       objectFit: "cover",
//                       borderRadius: 4,
//                     }}
//                   />
//                 );
//               })}
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Title"
//               variant="outlined"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Enter product title"
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Stock"
//               variant="outlined"
//               name="stock"
//               value={formData.stock}
//               onChange={handleInputChange}
//               placeholder="Enter Stock"
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextareaAutosize
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter product description"
//               minRows={4}
//               style={{
//                 width: "100%",
//                 border: "1px solid rgba(0, 0, 0, 0.23)",
//                 padding: "8px",
//                 borderRadius: "4px",
//                 outline: "none",
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 label="Category"
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category._id} value={category._id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>subcategory</InputLabel>
//               <Select
//                 name="subcategory"
//                 value={formData.subcategory}
//                 onChange={handleInputChange}
//                 label="sub-Category"
//               >
//                 {subcategories.map((subcategories) => (
//                   <MenuItem key={subcategories._id} value={subcategories._id}>
//                     {subcategories.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Gender</InputLabel>
//               <Select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 label="Gender"
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Unisex">Unisex</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Original Price"
//               variant="outlined"
//               name="orignal_price"
//               value={formData.price.orignal_price}
//               onChange={handlePriceChange}
//               placeholder="Enter original price"
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Discounted Price"
//               variant="outlined"
//               name="discounted_price"
//               value={formData.price.discounted_price}
//               onChange={handlePriceChange}
//               placeholder="Enter discounted price"
//               fullWidth
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Size Options</Typography>
//             {formData.size_options.map((option, index) => (
//               <Grid container spacing={2} key={index}>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Size"
//                     variant="outlined"
//                     name="size"
//                     value={option.size}
//                     onChange={(e) => handleSizeChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Stock"
//                     variant="outlined"
//                     name="stock"
//                     value={option.stock}
//                     onChange={(e) => handleSizeChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <IconButton onClick={() => handleRemoveSize(index)}>
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             ))}
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleAddSize}
//               sx={{ mt: 2 }}
//             >
//               Add Size Option
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Color Options</Typography>
//             {formData.color_options.map((option, index) => (
//               <Grid container spacing={2} key={index}>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Color"
//                     variant="outlined"
//                     name="color"
//                     value={option.color}
//                     onChange={(e) => handleColorChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Hex"
//                     variant="outlined"
//                     name="hex"
//                     value={option.hex}
//                     onChange={(e) => handleColorChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <IconButton onClick={() => handleRemoveColor(index)}>
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             ))}
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleAddColor}
//               sx={{ mt: 2 }}
//             >
//               Add Color Option
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Other Info</Typography>
//             {formData.other_info.map((info, index) => (
//               <Grid container spacing={2} key={index}>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Title"
//                     variant="outlined"
//                     name="titel"
//                     value={info.titel}
//                     onChange={(e) => handleOtherInfoChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField
//                     label="Description"
//                     variant="outlined"
//                     name="description"
//                     value={info.description}
//                     onChange={(e) => handleOtherInfoChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <IconButton onClick={() => handleRemoveOtherInfo(index)}>
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             ))}
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleAddOtherInfo}
//               sx={{ mt: 2 }}
//             >
//               Add Other Info
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Instructions</Typography>
//             {formData.instruction.map((instruction, index) => (
//               <Grid container spacing={2} key={index}>
//                 <Grid item xs={10}>
//                   <TextField
//                     label="Instruction Detail"
//                     variant="outlined"
//                     name="detail"
//                     value={instruction}
//                     onChange={(e) => handleIntructionChange(e, index)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <IconButton onClick={() => handleRemoveIntruction(index)}>
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             ))}
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleAddIntruction}
//               sx={{ mt: 2 }}
//             >
//               Add Instruction
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               {id ? "Update Product" : "Add Product"}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default AddProduct;

import React, {useState, useEffect} from "react";
import upload_area from "../assets/images/addProduct/upload_area1.svg";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
    Typography,
    Grid,
    IconButton,
} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../Instance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AddProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        size_options: [],
        category: "",
        subcategory: "",
        gender: "",
        price: {orignal_price: "", discounted_price: ""},
        // color_options: [],
        color_options: [{color: "", hex: "", product_images: []}],
        other_info: [], // Changed from an array to an object
        instruction: [],
        // product_images: [],
        stock: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const fetchCategoryData = async () => {
        try {
            const response = await axiosInstance.get("/api/category");
            if (response.data && Array.isArray(response.data.data)) {
                setCategories(response.data.data);
            } else {
                console.error("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await axiosInstance.get(
                `/api/category/${formData.category}/subcategory`
            );
            if (response.data && Array.isArray(response.data.data)) {
                setSubcategories(response.data.data);
            } else {
                console.error("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
        if (formData.category) fetchSubcategories();
        if (id) {
            setIsLoading(true);
            axiosInstance
                .get(`/api/product/${id}`)
                .then((response) => {
                    const product = response.data;
                    setFormData({
                        ...product,
                        price: {
                            orignal_price: product.price?.orignal_price || "",
                            discounted_price: product.price?.discounted_price || "",
                        },
                        product_images: product.product_images || [],
                        category: product.category._id,

                        instruction: product.instruction || [],
                    });
                })
                .catch((error) => {
                    toast.error("Failed to fetch product details");
                    console.error("Error fetching product:", error);
                })
                .finally(() => setIsLoading(false));
        }
    }, [id, formData.category]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFileChange = (e, index) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setFormData((prevState) => {
            const updatedColorOptions = [...prevState.color_options];
            updatedColorOptions[index].product_images = [
                ...updatedColorOptions[index].product_images,
                ...files,
            ]; // Append new files
            return {...prevState, color_options: updatedColorOptions};
        });
    };


    const handlePriceChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            price: {
                ...prev.price,
                [name]: value,
            },
        }));
    };

    const handleAddSize = () => {
        setFormData((prev) => ({
            ...prev,
            size_options: [...prev.size_options, {size: "", stock: ""}],
        }));
    };

    const handleAddOtherInfo = () => {
        setFormData((prev) => ({
            ...prev,
            other_info: [...prev.other_info, {title: "", description: ""}],
        }));
    };

    const handleAddColor = () => {
        setFormData((prev) => ({
            ...prev,
            color_options: [
                ...prev.color_options,
                {color: "", hex: "", product_images: []},
            ],
        }));
    };

    const handleAddIntruction = () => {
        setFormData((prev) => ({
            ...prev,
            instruction: [...prev.instruction, ""],
        }));
    };

    const handleSizeChange = (e, index) => {
        const newSizeOptions = [...formData.size_options];
        newSizeOptions[index] = {
            ...newSizeOptions[index],
            [e.target.name]: e.target.value,
        };
        setFormData((prev) => ({...prev, size_options: newSizeOptions}));
    };

    const handleColorChange = (e, index) => {
        const newColorOptions = [...formData.color_options];
        newColorOptions[index] = {
            ...newColorOptions[index],
            [e.target.name]: e.target.value,
        };
        setFormData((prev) => ({...prev, color_options: newColorOptions}));
    };

    const handleOtherInfoChange = (e, index) => {
        const newOtherInfoOptions = [...formData.other_info];
        newOtherInfoOptions[index] = {
            ...newOtherInfoOptions[index],
            [e.target.name]: e.target.value,
        };
        setFormData((prev) => ({...prev, other_info: newOtherInfoOptions}));
    };

    const handleIntructionChange = (e, index) => {
        const newIntructionOptions = [...formData.instruction];
        newIntructionOptions[index] = e.target.value;
        setFormData({
            ...formData,
            instruction: newIntructionOptions,
        });
    };

    const handleRemoveColor = (index) => {
        const updatedColorOptions = [...formData.color_options];
        updatedColorOptions.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            color_options: updatedColorOptions,
        }));
    };

    const handleRemoveSize = (index) => {
        const updatedSize = [...formData.size_options];
        updatedSize.splice(index, 1);
        setFormData({
            ...formData,
            size_options: updatedSize,
        });
    };
    const handleRemoveOtherInfo = (index) => {
        const updatedOtherInfo = [...formData.other_info];
        updatedOtherInfo.splice(index, 1);
        setFormData({
            ...formData,
            other_info: updatedOtherInfo,
        });
    };

    const handleRemoveIntruction = (index) => {
        const updatedIntruction = [...formData.instruction];
        updatedIntruction.splice(index, 1);
        setFormData({
            ...formData,
            instruction: updatedIntruction,
        });
    };

    const handleRemoveImage = (colorIndex, imageIndex) => {
        setFormData((prev) => {
            const updatedColorOptions = [...prev.color_options];
            updatedColorOptions[colorIndex].product_images.splice(imageIndex, 1);
            return {...prev, color_options: updatedColorOptions};
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare the payload for the API
            const payload = {
                title: formData.title,
                description: formData.description,
                size_options: formData.size_options,
                category: formData.category,
                subcategory: formData.subcategory,
                gender: formData.gender,
                price: formData.price,
                color_options: formData.color_options.map((colorOption) => ({
                    color: colorOption.color,
                    hex: colorOption.hex,
                    product_images: colorOption.product_images.map((image) =>
                        image instanceof File ? URL.createObjectURL(image) : image
                    ),
                })),
                other_info: formData.other_info,
                instruction: formData.instruction,
                product_images: formData.product_images.map((image) =>
                    image instanceof File ? URL.createObjectURL(image) : image
                ),
                stock: formData.stock,
            };

            // Send the data to the API
            const response = await axiosInstance.post("/api/product", payload);
            console.log("Product data submitted:", response.data);
        } catch (error) {
            console.error("Error submitting product data:", error);
        }
    };


    if (isLoading) {
        return <Typography>Loading product details...</Typography>;
    }

    return (
        <Box
            component="section"
            sx={{
                mt: "50px",
                p: 4,
                backgroundColor: "rgba(240, 248, 255, 0.2)",
                width: "100%",
            }}
        >
            <form onSubmit={handleSubmit}>
                <Typography
                    variant="h6"
                    sx={{fontWeight: "bold", pb: 2, textTransform: "uppercase"}}
                >
                    {id ? "Edit Product" : "Add Product"}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter product title"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Stock"
                            variant="outlined"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="Enter Stock"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                            minRows={4}
                            style={{
                                width: "100%",
                                border: "1px solid rgba(0, 0, 0, 0.23)",
                                padding: "8px",
                                borderRadius: "4px",
                                outline: "none",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                value={formData.category}
                                onChange={handleInputChange}
                                name="category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {formData.category && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    label="Subcategory"
                                    value={formData.subcategory}
                                    onChange={handleInputChange}
                                    name="subcategory"
                                >
                                    {subcategories.map((subcategory) => (
                                        <MenuItem key={subcategory._id} value={subcategory._id}>
                                            {subcategory.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{mb: 1}}>
                            Price
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Original Price"
                                    variant="outlined"
                                    name="orignal_price"
                                    value={formData.price.orignal_price}
                                    onChange={handlePriceChange}
                                    placeholder="Enter original price"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Discounted Price"
                                    variant="outlined"
                                    name="discounted_price"
                                    value={formData.price.discounted_price}
                                    onChange={handlePriceChange}
                                    placeholder="Enter discounted price"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">Size Options</Typography>
                        {formData.size_options.map((option, index) => (
                            <Grid container spacing={2} key={index} mt={"8px"}>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Size"
                                        variant="outlined"
                                        name="size"
                                        value={option.size}
                                        onChange={(e) => handleSizeChange(e, index)}
                                        fullWidth
                                        onInput={(e) =>
                                            (e.target.value = e.target.value.toUpperCase())
                                        }
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Stock"
                                        variant="outlined"
                                        name="stock"
                                        value={option.stock}
                                        onChange={(e) => handleSizeChange(e, index)}
                                        fullWidth
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => handleRemoveSize(index)}
                                        color="error"
                                    >
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddSize}
                            sx={{mt: 2}}
                        >
                            Add Size
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">Color Options</Typography>

                        {formData.color_options.map((option, index) => (
                            <Grid container spacing={2} key={index} mt={"8px"}>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Color"
                                        variant="outlined"
                                        name="color"
                                        value={option.color}
                                        onChange={(e) => handleColorChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Hex"
                                        variant="outlined"
                                        name="hex"
                                        value={option.hex}
                                        onChange={(e) => handleColorChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => handleRemoveColor(index)}
                                        color="error"
                                    >
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddColor}
                            sx={{mt: 2}}
                        >
                            Add Color
                        </Button>
                    </Grid>

                    {/* Other Info section */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Other Info</Typography>
                        {formData.other_info.map((option, index) => (
                            <Grid container spacing={2} key={index} mt={"8px"}>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        name="title"
                                        value={option.title}
                                        onChange={(e) => handleOtherInfoChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        name="description"
                                        value={option.description}
                                        onChange={(e) => handleOtherInfoChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => handleRemoveOtherInfo(index)}
                                        color="error"
                                    >
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddOtherInfo}
                            sx={{mt: 2}}
                        >
                            Add Other Info
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">Instructions</Typography>
                        {formData.instruction.map((instruction, index) => (
                            <Grid container spacing={2} key={index} mt={"8px"}>
                                <Grid item xs={10}>
                                    <TextField
                                        label="Instruction Detail"
                                        variant="outlined"
                                        name="detail"
                                        value={instruction}
                                        onChange={(e) => handleIntructionChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => handleRemoveIntruction(index)}
                                        color="error"
                                    >
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddIntruction}
                            sx={{mt: 2}}
                        >
                            Add Instruction
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{mt: 2}}
                        >
                            {id ? "Update Product" : "Add Product"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProduct;
