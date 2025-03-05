import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance";
import {
    Box, Typography, CircularProgress, Alert,
    Card, CardContent, Button
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axiosInstance.get("/api/contact");
            setContacts(response.data.data || []);
            setError(null);
        } catch (err) {
            setError("Failed to fetch contacts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (contactId) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
            await axiosInstance.delete(`/api/contact/${contactId}`);
            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
        } catch (err) {
            alert("Failed to delete contact. Please try again.");
        }
    };

    return (
        <Box p={2} mt={5}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Contact List
            </Typography>

            {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && contacts.length === 0 && (
                <Alert severity="info">No contacts available.</Alert>
            )}

            {!loading &&
                contacts.map((contact) => (
                    <Card key={contact._id} sx={{ mb: 2, boxShadow: 2 }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {contact.firstName} {contact.lastName}
                                </Typography>
                                <Typography variant="body1">
                                    📝 {contact.message ? contact.message : 'No message available'}
                                </Typography>
                                <Typography variant="body1">
                                    📧 {contact.email}
                                </Typography>
                                <Typography variant="body1">
                                    📞 {contact.phoneNumber}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "gray" }}>
                                    Created At: {new Date(contact.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    sx={{ mt: 1, border: 'none', bgcolor: '#fff', borderRadius: '50px', boxShadow: 'none' }}
                                    onClick={() => handleDelete(contact._id)}
                                >
                                    <DeleteOutlineIcon sx={{ color: 'red' }} />
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
        </Box>
    );
};

export default Contact;
