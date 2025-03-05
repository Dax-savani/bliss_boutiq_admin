import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, CircularProgress, TextField } from '@mui/material';
import axiosInstance from '../../Instance';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Fetching data from the API
    useEffect(() => {
        axiosInstance
            .get('/api/user')
            .then((response) => {
                setUsers(Array.isArray(response.data.data) ? response.data.data : []);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching users');
                setLoading(false);
            });
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(
        (user) =>
            user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box p={2} mt={5}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                Users List
            </Typography>

            {/* Search Input */}
            <TextField
                label="Search User Name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 4 }}
            />

            <Grid container spacing={4}>
                {filteredUsers.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user._id}>
                        <Card sx={{ maxWidth: '100%', boxShadow: 3, p: 3 }}>
                            {/* User Name */}
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold', color: '#3f51b5' }} // Blue color for the name
                            >
                                {user.first_name} {user.last_name}
                            </Typography>

                            {/* Date of Birth */}
                            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                🗓️ DOB: {new Date(user.dob).toLocaleDateString()}
                            </Typography>

                            {/* Email */}
                            <Typography variant="body2" sx={{ marginTop: 1, color: '#1976d2' }}>
                                📧 {user.email}
                            </Typography>

                            {/* Phone Number */}
                            <Typography variant="body2" sx={{ marginTop: 1, color: '#388e3c' }}>
                                📞 {user.phone_number}
                            </Typography>

                            {/* Address */}
                            <Typography
                                variant="body2"
                                sx={{
                                    marginTop: 1,
                                    color:
                                        user.address_details?.address_1 && user.address_details?.address_2
                                            ? '#000'
                                            : '#f44336', // Red if address not available
                                }}
                            >
                                🏠{" "}
                                {user.address_details?.address_1 && user.address_details?.address_2
                                    ? `${user.address_details?.address_1}, ${user.address_details?.address_2}`
                                    : 'Address not available'}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        user.address_details?.city &&
                                        user.address_details?.state &&
                                        user.address_details?.country &&
                                        user.address_details?.zipcode
                                            ? '#000'
                                            : '#f44336', // Red if address details are missing
                                }}
                            >
                                {user.address_details?.city &&
                                user.address_details?.state &&
                                user.address_details?.country &&
                                user.address_details?.zipcode
                                    ? `${user.address_details?.city}, ${user.address_details?.state}, ${user.address_details?.country} - ${user.address_details?.zipcode}`
                                    : 'Address not available'}
                            </Typography>

                            {/* Role */}
                            <Typography variant="body2" sx={{ marginTop: 1, color: '#8e24aa' }}>
                                💼 Role: {user.role}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Users;
