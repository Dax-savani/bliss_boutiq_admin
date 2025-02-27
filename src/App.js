// import React from "react";
// import Header from "./components/global/Header/Header";
// import Home from "./pages/Home/Home";
// import { Route, Routes } from "react-router-dom";
// import AddProduct from "./pages/AddProduct";
// import { Box, CssBaseline, styled } from "@mui/material";
// import Sidebar from "./components/sidebar/Sidebar";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Login from "./pages/Login";
// import Category from "./components/Category/Category";
// import CategoryList from "./components/Category/CategoryList";
// import Subcategory from "./components/Subcategory/Subcategory";
// import SubcategoryList from "./components/Subcategory/SubcategoryList";
// import AddProduct1 from "./pages/AddProduct1";
// import Order from "./pages/Order";

// const drawerWidth = 250;

// const App = () => {
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const [isClosing, setIsClosing] = React.useState(false);
//     const [open, setOpen] = React.useState(true);

//     const handleDrawerClose = () => {
//         setIsClosing(true);
//         setMobileOpen(false);
//     };
//     const handleDrawerToggle = () => {
//         if (!isClosing) {
//             setMobileOpen(!mobileOpen);
//         }
//     };
//     const handleDrawerTransitionEnd = () => {
//         setIsClosing(false);
//     };
//     const Main = styled("main", {
//         shouldForwardProp: (prop) => prop !== "open",
//     })(({ theme, open }) => ({
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: `-${drawerWidth}px`,
//         ...(open && {
//             transition: theme.transitions.create("margin", {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//             marginLeft: 0,
//         }),
//     }));
//     return (
//         <Box sx={{ display: "flex" }}>
//             <CssBaseline />
//             <ToastContainer />


//             <Header open={open} />
//             <Box
//                 component="nav"
//                 sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//                 aria-label="mailbox folders"
//             >
//                 <Sidebar
//                     open={open}
//                     handleDrawerClose={handleDrawerClose}
//                     window={window}
//                     handleDrawerToggle={handleDrawerToggle}
//                     mobileOpen={mobileOpen}
//                     handleDrawerTransitionEnd={handleDrawerTransitionEnd}
//                     setOpen={setOpen}
//                 />
//             </Box>

//             <Routes>
//                 <Route path="/login" element={<Login />} />
//             </Routes>
        

//             <Main open={open}>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/add-product" element={<AddProduct1 />} />
//                     <Route path="/edit-product/:productId" element={<AddProduct1 />} />
//                     <Route path="/category" element={<CategoryList />} />
//                     <Route path="/add-category" element={<Category />} />
//                     <Route path="/edit-category/:id" element={<Category />} />
//                     <Route path="/subcategory" element={<SubcategoryList />} />
//                     <Route path="/add-subcategory" element={<Subcategory />} />
//                     <Route path="/edit-subcategory/:id" element={<Subcategory />} />
//                     <Route path='/order' element={<Order />} />
//                 </Routes>
//             </Main>
//         </Box>
//     );
// };
// export default App;


import React from "react";
import Header from "./components/global/Header/Header";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct1 from "./pages/AddProduct1";
import { Box, CssBaseline, styled } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./components/Category/Category";
import CategoryList from "./components/Category/CategoryList";
import Subcategory from "./components/Subcategory/Subcategory";
import SubcategoryList from "./components/Subcategory/SubcategoryList";
import Order from "./pages/Order";

const drawerWidth = 250;

const App = ({ isLoggedIn, onLogout }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const Main = styled("main", {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ToastContainer />

            {/* ✅ Sidebar aur Header sirf jab logged in ho tab dikhai de */}
            {isLoggedIn && <Header open={open} />}
            {isLoggedIn && (
                <Box component="nav" sx={{ width: { md: drawerWidth, xs: 0 }, flexShrink: { sm: 0 }, boxShadow: "0 2px 48px 0 rgba(0,0,0,.08)", }}>
                    <Sidebar
                        open={open}
                        handleDrawerClose={handleDrawerClose}
                        window={window}
                        handleDrawerToggle={handleDrawerToggle}
                        mobileOpen={mobileOpen}
                        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                        setOpen={setOpen}
                    />
                </Box>
            )}


            <Main open={isLoggedIn && open}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-product" element={<AddProduct1 />} />
                    <Route path="/edit-product/:productId" element={<AddProduct1 />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route path="/add-category" element={<Category />} />
                    <Route path="/edit-category/:id" element={<Category />} />
                    <Route path="/subcategory" element={<SubcategoryList />} />
                    <Route path="/add-subcategory" element={<Subcategory />} />
                    <Route path="/edit-subcategory/:id" element={<Subcategory />} />
                    <Route path="/order" element={<Order />} />
                </Routes>
            </Main>
        </Box>
    );
};

export default App;
