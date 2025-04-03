import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Button,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    Container,
    TextField,
    InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Hotels from "../components/Hotels";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["About Us", "Contact Us"];
const settings = ["Profile", "My Bookings", "Logout"];

const Homepage = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);

    // 🔹 Search state
    const [search, setSearch] = useState({
        city: "",
        checkin: "",
        checkout: "",
        price: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        handleCloseUserMenu();
        navigate("/");
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // 🔹 Handle Search Inputs
    const handleSearchChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    // 🔹 Handle Search Button Click
    const handleSearch = () => {
        console.log("Searching for:", search);
        // TODO: Implement actual search logic (API Call)
    };

    return (
        <div>
            {/* 🔹 Full-Width Navbar */}
            <AppBar position="static" sx={{ width: "100vw", backgroundColor: "#333" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* 🔹 LOGO (Left Side) */}
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                            }}
                        >
                            LOGO
                        </Typography>

                        {/* 🔹 Pages (Centered) */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, flexGrow: 1, justifyContent: "center" }}>
                            {pages.map((page) => (
                                <Button key={page} sx={{ color: "white" }}>
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {/* 🔹 Profile (Right Side) */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {user ? (
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Button color="inherit" onClick={() => navigate("/login")}>
                                    Login/SignUp
                                </Button>
                            )}

                            {/* 🔹 Profile Dropdown Menu */}
                            <Menu
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={
                                            setting === "Logout" ? handleLogout : handleCloseUserMenu
                                        }
                                    >
                                        {setting}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* 🔹 Mobile Menu Icon (Visible on Small Screens) */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* 🔹 Search Bar */}
            <Container sx={{ mt: 2, mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        backgroundColor: "#f5f5f5",
                        padding: 2,
                        borderRadius: 20,
                    }}
                >
                    {/* City Input */}
                    <TextField
                        name="city"
                        label="Destination (City)"
                        variant="standard"
                        value={search.city}
                        onChange={handleSearchChange}
                        sx={{ width: "200px" }}
                    />

                    {/* Check-in Date */}
                    <TextField
                        name="checkin"
                        label="Check-in"
                        type="date"
                        variant="standard"
                        value={search.checkin}
                        onChange={handleSearchChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "150px" }}
                    />

                    {/* Check-out Date */}
                    <TextField
                        name="checkout"
                        label="Check-out"
                        type="date"
                        variant="standard"
                        value={search.checkout}
                        onChange={handleSearchChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "150px" }}
                    />

                    {/* Price Range */}
                    <TextField
                        name="price"
                        label="Max Price ($)"
                        variant="standard"
                        type="number"
                        value={search.price}
                        onChange={handleSearchChange}
                        sx={{ width: "150px" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                    {/* Search Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                        sx={{ height: "56px", borderRadius:20,backgroundColor: "#333" }}
                        
                    >
                        Search
                    </Button>
                </Box>
            </Container>

            {/* 🔹 Hotels List Below */}
            <div className="ListOf">
                <Typography variant="h5" >List Of All Hotels</Typography>
                <Hotels />
            </div>
        </div>
    );
};

export default Homepage;
