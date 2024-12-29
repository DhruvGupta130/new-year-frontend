import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {Button} from "@mui/material";
import ImageCard from "./ImageCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import axios from "axios";
import {api} from "../api.js"; // Import axios for API calls

const Resolutions = () => {
    const navigate = useNavigate();

    // State variables to store data
    const [resolutions, setResolutions] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [efforts, setEfforts] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    // Fetch resolutions data from API
    useEffect(() => {
        const fetchResolutions = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${api}/get`);
                setResolutions(response.data);
                console.log(response.data);
                if (response.data.length > 0) {
                    setBackgroundImage(`${api}/image?id=${response.data[0].imageUrl}`);
                    setName(response.data[0].name);
                    setLocation(response.data[0].location);
                    setTitle(response.data[0].title);
                    setDescription(response.data[0].description);
                    setTime(response.data[0].timeFrame);
                    setEfforts(response.data[0].effortsAndSacrifices);
                } else {
                    setIsEmpty(true);
                }
            } catch (error) {
                console.error("Error fetching resolutions:", error);
                setError("Error fetching resolutions.");
            } finally {
                setLoading(false);
            }
        };

        fetchResolutions();
    }, []);

    // Slider settings
    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            const newResolution = resolutions[next];
            setBackgroundImage(`${api}/image?id=${newResolution.imageUrl}`);
            setName(newResolution.name);
            setLocation(newResolution.location);
            setTitle(newResolution.title);
            setDescription(newResolution.description);
            setTime(newResolution.timeFrame);
            setEfforts(newResolution.effortsAndSacrifices);
        },
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loader"/>}
            {isEmpty && <div className="empty-message">
                No Resolutions Available Now
                <Button variant="contained" color="secondary" sx={{m: 0.5}}
                        onClick={() => navigate("/add-resolution")}>
                    Create a Resolution Now
                </Button>
            </div>}
            {!isEmpty && !error && !loading && <div
                className="images-box"
                style={{
                    background: `url(${backgroundImage}) no-repeat center center/cover`,
                    minHeight: "100vh",
                    transition: "background-image 0.5s ease-in-out",
                }}
            >
                <motion.div
                    className="image-details"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                >
                    <motion.h5
                        className="title"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {title}
                    </motion.h5>
                    <motion.p
                        className="description"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {description}
                    </motion.p>
                    <div className="details-section">
                        <motion.div
                            className="detail-item"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.3}}
                        >
                            <strong>Name: </strong>
                            <span>{name}</span>
                        </motion.div>
                        <motion.div
                            className="detail-item"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.4}}
                        >
                            <strong>Location: </strong>
                            <span>{location}</span>
                        </motion.div>
                        <motion.div
                            className="detail-item"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.5}}
                        >
                            <strong>Time: </strong>
                            <span>{time}</span>
                        </motion.div>
                        <motion.div
                            className="detail-item"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.6}}
                        >
                            <strong>Efforts & Sacrifices: </strong>
                            <span>{efforts}</span>
                        </motion.div>
                    </div>
                    <motion.div
                        className="button-group"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1, delay: 0.7}}
                    >
                        <Button variant="contained" color="secondary" sx={{m: 0.5}}
                                onClick={() => navigate("/add-resolution")}>
                            Add Yours
                        </Button>
                    </motion.div>
                </motion.div>
                <div className="images">
                    {resolutions.length>1 && <Slider {...settings} className="slider">
                        {resolutions.map((resolution) => (
                            <ImageCard
                                key={resolution.id}
                                imageUrl={`${api}/image?id=${resolution.imageUrl}`}
                                title={resolution.title}
                                description={resolution.description}
                                onButtonClick={() => {
                                    setBackgroundImage(`${api}/image?id=${resolution.imageUrl}`);
                                    setName(resolution.name);
                                    setLocation(resolution.location);
                                    setTitle(resolution.title);
                                    setDescription(resolution.description);
                                    setTime(resolution.timeFrame);
                                    setEfforts(resolution.effortsAndSacrifices);
                                }}
                            />
                        ))}
                    </Slider>}
                    {resolutions.length<2 && <ImageCard
                        key={resolutions[0].id}
                        imageUrl={`${api}/image?id=${resolutions[0].imageUrl}`}
                        title={resolutions[0].title}
                        description={resolutions[0].description}
                        onButtonClick={() => {
                            setBackgroundImage(`${api}/image?id=${resolutions[0].imageUrl}`);
                            setName(resolutions[0].name);
                            setLocation(resolutions[0].location);
                            setTitle(resolutions[0].title);
                            setDescription(resolutions[0].description);
                            setTime(resolutions[0].timeFrame);
                            setEfforts(resolutions[0].effortsAndSacrifices);
                        }}
                    />}
                </div>
            </div>}
        </div>
    );
};

export default Resolutions;
