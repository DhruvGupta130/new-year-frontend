import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaRegSmileBeam } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import fireworksSound from '../assets/fireworks-29629.mp3';
import { BsShare } from 'react-icons/bs';
import { Create, Visibility } from "@mui/icons-material";  // Add Visibility icon for viewing resolutions

const HomePage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState('');

    // Play fireworks sound on page load
    useEffect(() => {
        setTimeout(playAudio, 100);
        startCountdown();
    }, []);

    const handleNavigateToResolutionPage = () => {
        navigate("/add-resolution");
    };

    const playAudio = () => {
        const audio = new Audio(fireworksSound);
        audio.play().then(r => r);
    };

    const handleShare = () => {
        // Implement sharing functionality (e.g., using navigator.share on mobile)
        if (navigator.share) {
            navigator.share({
                title: 'Happy New Year 2025!',
                text: 'Start your year with a positive resolution.',
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Sharing not supported on this device.');
        }
    };

    const startCountdown = () => {
        const targetDate = new Date('2025-01-01T00:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown('Happy New Year 2025!');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
    };

    return (
        <div className="home-page-container">
            {/* Confetti Animation */}
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} />

            {/* Greeting Section */}
            <motion.div
                className="greeting-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="greeting"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <FaRegSmileBeam className="greeting-icon" /> Happy New Year 2025!
                </motion.h1>
                <motion.p
                    className="subheading"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    Start the year with a positive resolution!
                </motion.p>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, marginX: 0.5 }}
                    onClick={handleNavigateToResolutionPage}
                    startIcon={<Create />}  // Icon added here
                >
                    Make Your Resolution
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, marginX: 0.5 }}
                    onClick={()=> navigate("/resolutions")}
                    startIcon={<Visibility />}  // Icon added for "View Others Resolutions"
                >
                    View Others Resolutions
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2, marginX: 0.5 }}
                    onClick={handleShare}
                    startIcon={<BsShare className="share-icon" />}  // Share icon kept
                >
                    Share the Love
                </Button>
            </motion.div>

            {/* Fireworks Animation */}
            <div className="fireworks-container">
                <div className="firework firework-1" />
                <div className="firework firework-2" />
                <div className="firework firework-3" />
            </div>

            {/* Snowfall Effect */}
            <div className="snowfall">
                {[...Array(50)].map((_, index) => (
                    <div className="snowflake" key={index} />
                ))}
            </div>

            {/* Countdown Timer */}
            <div className="countdown-container">
                <motion.div
                    className="countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <h3>Countdown to 2025:</h3>
                    <div id="countdown">{countdown}</div>
                </motion.div>
            </div>

            {/* Background Image */}
            <div className="background-image-container" />
        </div>
    );
};

export default HomePage;
