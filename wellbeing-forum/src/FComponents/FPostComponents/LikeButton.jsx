import { useState } from "react";
import PropTypes from 'prop-types'
export default function LikeButton({ likes, onLike }) {
    const [liked, setLiked] = useState(false);
  
    const handleLike = () => {
      setLiked(!liked);
      onLike(!liked);
    };
  
    return (
      <button onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'} ({likes})
      </button>
    );
  }

  LikeButton.propTypes = {
    likes: PropTypes.number.isRequired,
    onLike: PropTypes.func.isRequired
};