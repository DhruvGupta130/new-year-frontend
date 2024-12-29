import PropTypes from 'prop-types';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';

const ImageCard = ({ imageUrl, title, onButtonClick }) => {
    return (
        <div className="image-card">
            <Card onClick={onButtonClick}>
                <CardMedia
                    component="img"
                    className="image-card-media"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent className="image-card-content">
                    <Typography className="image-card-title" gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

ImageCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func,
};


export default ImageCard;
