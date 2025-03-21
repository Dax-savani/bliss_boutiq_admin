import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance";
import {
    Box, Typography, CircularProgress, Alert,
    Card, CardContent, Button
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import toast, { Toaster } from "react-hot-toast";

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

    const handleDelete = (contactId) => {
        toast(
            (t) => (
                <div>
                    <p>Are you sure you want to delete this contact?</p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button onClick={() => confirmDelete(contactId, t.id)} style={buttonStyle}>Yes</button>
                        <button onClick={() => toast.dismiss(t.id)} style={buttonStyle}>No</button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                position: "top-center",
            }
        );
    };

    const confirmDelete = async (contactId, toastId) => {
        toast.dismiss(toastId);
        try {
            await axiosInstance.delete(`/api/contact/${contactId}`);
            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
            toast.success("Contact deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete contact. Please try again.");
        }
    };

    const buttonStyle = {
        background: "#000",
        color: "#fff",
        padding: "5px 10px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    };

    // Function to format date to dd/mm/yy hh:mm:ss AM/PM
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear().toString().slice(0); // last two digits of the year

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'
        
        // Format as dd/mm/yy hh:mm:ss AM/PM
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    return (
        <Box p={2} mt={5}>
            <Toaster position="top-center" reverseOrder={false} />
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
                                    Created At: {formatDate(contact.createdAt)}
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
