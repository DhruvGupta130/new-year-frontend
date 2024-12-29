import { useState } from "react";
import { Button, TextField, Typography, CircularProgress, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from "axios";
import {api} from "../api.js";

const NewYearWishesForm = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [effortsAndSacrifices, setEffortsAndSacrifices] = useState("");
    const [frequency, setFrequency] = useState("");
    const [effortsError, setEffortsError] = useState("");
    const MIN_WORDS = 50;

    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(Boolean).length;
    };

    const handleEffortsChange = (e) => {
        const value = e.target.value;
        setEffortsAndSacrifices(value);

        // Check the word count and set error message if less than MIN_WORDS
        const wordCount = countWords(value);
        if (wordCount < MIN_WORDS) {
            setEffortsError(`Please enter at least ${MIN_WORDS} words. You have ${wordCount} words.`);
        } else {
            setEffortsError("");
        }
    };

    const handleGetLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

                    fetch(geocodingUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.address) {
                                const city = data.address.city || data.address.town || data.address.village;
                                const state = data.address.state;
                                setLocation(`${city}, ${state}`);
                            } else {
                                setLocation("Unable to retrieve location details.");
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching location:", error);
                            setLocation("Unable to fetch location.");
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    setLocation("Unable to retrieve location.");
                    setLoading(false);
                }
            );
        } else {
            setLocation("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("title", title);
        formData.append("location", location);
        formData.append("efforts", effortsAndSacrifices);
        formData.append("time", frequency);

        if (!image) {
            alert("Please upload an image");
            return;
        }
        formData.append("file", image);

        try {
            const response = await axios.post(`${api}/create`, formData);
            if (response.status === 200) {
                alert("Your Resolution has been created!");
                setName("");
                setDescription("");
                setTitle("");
                setLocation("");
                setImage(null);
                setEffortsAndSacrifices("");
                setFrequency("");
            }
        } catch (error) {
            console.error("There was an error submitting the form:", error);
            alert("There was an error creating your resolution.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="form-container">
            <div className={"container"}>
                <Typography variant="h4" className="title" sx={{ marginBottom: 2 }}>
                    Add Your New Year Resolution
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        className="input"
                        sx={{
                            marginY: 1,
                            color: 'white',
                            '& .MuiInputBase-root': {
                                color: 'white',
                            }
                        }}
                    />
                    {/* Image Upload Input */}
                    <Box sx={{ marginY: 2 }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="image-upload"
                        />
                        <label htmlFor="image-upload">
                            <Button variant="outlined" component="span" fullWidth color="default">
                                Choose Wallpaper Image
                            </Button>
                            <p className="helper-text" style={{ color: 'wheat', fontSize: 'small', background: '#333', borderRadius: '3px', padding: '4px', margin: '1px' }}>*Please choose a high quality image</p>
                        </label>
                        {/* Display Image Preview */}
                        {image && (
                            <Box sx={{ marginTop: 2 }}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </Box>
                        )}
                    </Box>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        required
                        className="input"
                        sx={{
                            marginY: 1,
                            color: 'white',
                            '& .MuiInputBase-root': {
                                color: 'white',
                            }
                        }}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        className="input"
                        required
                        sx={{
                            marginY: 1,
                            color: 'white',
                            '& .MuiInputBase-root': {
                                color: 'white',
                            }
                        }}
                    />
                    <TextField
                        label="Your Efforts and Sacrifices"
                        value={effortsAndSacrifices}
                        onChange={handleEffortsChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        className="input"
                        error={Boolean(effortsError)} // Show error if word count is less than MIN_WORDS
                        helperText={effortsError} // Display error message
                        sx={{
                            marginY: 1,
                            color: 'white',
                            '& .MuiInputBase-root': {
                                color: 'white',
                            }
                        }}
                    />
                    <FormControl fullWidth sx={{ marginY: 1 }} className="input">
                        <InputLabel>Time</InputLabel>
                        <Select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            label="Time"
                            required
                            sx={{
                                color: 'white',
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                }
                            }}
                        >
                            <MenuItem value="DAILY">Daily</MenuItem>
                            <MenuItem value="WEEKLY">Weekly</MenuItem>
                            <MenuItem value="MONTHLY">Monthly</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        className="location-button"
                        onClick={handleGetLocation}
                        color="success"
                        sx={{ marginY: 1 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : <MyLocationIcon />}
                    </Button>
                    <TextField
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                        margin="normal"
                        className="input"
                        required
                        helperText="*Location based on your current GPS coordinates."
                        sx={{
                            marginY: 1,
                            color: 'white',
                            '& .MuiInputBase-root': {
                                color: 'white',
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'wheat',
                            }
                        }}
                        slotProps={{
                            htmlInput: {
                                readOnly: true,
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ marginY: 1 }}
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Create Resolution"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewYearWishesForm;
