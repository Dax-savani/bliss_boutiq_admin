// import {
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     IconButton,
// } from "@mui/material";
// import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import axiosInstance from "../../Instance";
//
// const Home = () => {
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();
//
//     const handleFetchData = () => {
//         axiosInstance
//             .get("/api/product")
//             .then((res) => setData(res.data.data))
//             .catch((err) => console.log(err));
//     };
//
//     const handleDelete = (id) => {
//         axiosInstance
//             .delete("/api/product/" + id)
//             .then((res) => handleFetchData())
//             .catch((err) => console.log(err));
//     };
//
//     useEffect(() => {
//         handleFetchData();
//     }, []);
//
//     return (
//         <Box mt={5} p={2}>
//             <Typography variant="h4" gutterBottom>
//                 Product List
//             </Typography>
//             <TableContainer component={Paper}>
//                 <Table sx={{minWidth: 650}}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Sr No.</TableCell>
//                             <TableCell>Image</TableCell>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Stock</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell>Sub Category</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data.map((item, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>
//                                     <img
//                                         src={item.product_images[0]}
//                                         alt="Product"
//                                         width="60"
//                                         height="60"
//                                     />
//                                 </TableCell>
//                                 <TableCell>{item.title}</TableCell>
//                                 <TableCell>{item.price.discounted_price}</TableCell>
//                                 <TableCell>{item.stock}</TableCell>
//                                 {/* <TableCell>{item.category}</TableCell> */}
//                                 <TableCell>{item.sub_category}</TableCell>
//                                 <TableCell>
//                                     <IconButton
//                                         variant="contained"
//                                         color="primary"
//                                         sx={{marginRight: 1}}
//                                         onClick={() => navigate(`/edit-product/${item._id}`)}
//                                     >
//                                         <EditIcon/>
//                                     </IconButton>
//                                     <IconButton
//                                         variant="contained"
//                                         onClick={() => handleDelete(item._id)}
//                                         sx={{color: "red"}}
//                                     >
//                                         <DeleteOutlineIcon/>
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };
//
// export default Home;


import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Collapse,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axiosInstance from "../../Instance";

const Home = () => {
    const [data, setData] = useState([]);
    const [openRow, setOpenRow] = useState(null);
    const navigate = useNavigate();

    const handleFetchData = () => {
        axiosInstance
            .get("/api/product")
            .then((res) => setData(res.data.data))
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axiosInstance
            .delete("/api/product/" + id)
            .then(() => handleFetchData())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <Box mt={5} p={2}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <React.Fragment key={item._id}>
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <img
                                            src={item.color_options[0]?.product_images[0]}
                                            alt="Product"
                                            width="60"
                                            height="60"
                                        />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.color_options[0]?.price.discounted_price}</TableCell>
                                    <TableCell>{item.color_options[0]?.size_options[0]?.stock}</TableCell>
                                    <TableCell>{item.category?.name}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => navigate(`/edit-product/${item._id}`)}
                                            sx={{color: "gray"}}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(item._id)}
                                            sx={{color: "red"}}
                                        >
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() =>
                                                setOpenRow(openRow === index ? null : index)
                                            }
                                        >
                                            {openRow === index ? (
                                                <KeyboardArrowUpIcon/>
                                            ) : (
                                                <KeyboardArrowDownIcon/>
                                            )}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                {openRow === index && (
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                                                <Box sx={{margin: 2}}>
                                                    <Typography variant="h6" gutterBottom>
                                                        Color Options
                                                    </Typography>
                                                    {item.color_options.map((color, colorIndex) => (
                                                        <Box key={colorIndex} mb={2}>
                                                            <Typography>
                                                                <strong>Color:</strong> {color.color}
                                                            </Typography>
                                                            <Typography>
                                                                <strong>Hex:</strong> {color.hex}
                                                            </Typography>
                                                            <Typography>
                                                                <strong>Images:</strong>
                                                            </Typography>
                                                            <Box>
                                                                {color.product_images.map((img, imgIndex) => (
                                                                    <img
                                                                        key={imgIndex}
                                                                        src={img}
                                                                        alt="Color Option"
                                                                        width="60"
                                                                        height="60"
                                                                        style={{marginRight: 5}}
                                                                    />
                                                                ))}
                                                            </Box>
                                                            <Typography>
                                                                <strong>Sizes:</strong>
                                                            </Typography>
                                                            {color.size_options.map((size, sizeIndex) => (
                                                                <Typography key={sizeIndex}>
                                                                    Size: {size.size}, Stock: {size.stock}
                                                                </Typography>
                                                            ))}
                                                            <Typography>
                                                                <strong>Price:</strong> Original: {color.price.original_price},
                                                                Discounted: {color.price.discounted_price}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                    <Typography variant="h6" gutterBottom>
                                                        Instructions
                                                    </Typography>
                                                    {item.instruction.map((inst, instIndex) => (
                                                        <Typography key={instIndex}>{inst}</Typography>
                                                    ))}
                                                    <Typography variant="h6" gutterBottom>
                                                        Other Info
                                                    </Typography>
                                                    {item.other_info.map((info, infoIndex) => (
                                                        <Typography key={infoIndex}>
                                                            <strong>{info.title}:</strong> {info.description}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Home;
