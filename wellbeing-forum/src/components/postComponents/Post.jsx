import PropTypes from 'prop-types'

export default function Post({ title, content, author, date, likes }) {


    return (
      <div className="post">
        <h2>{title}</h2>
        <p>{content}</p>
        <small>Posted by {author} on {date}</small>
        <div>
          <span>{likes} Likes</span>
          {/* LikeButton */}
        </div>
      </div>
    );
  }

Post.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
};