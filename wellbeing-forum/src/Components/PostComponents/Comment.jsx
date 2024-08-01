import PropTypes from "prop-types";

export default function Comment({ author, content, date, likes }) {
  return (
    <div className="comment">
      <p>{content}</p>
      <small>
        by {author} on {date}
      </small>
      <div>
        <span>{likes} Likes</span>
        {/* LikeButton */}
      </div>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};
