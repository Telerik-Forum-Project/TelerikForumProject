import PropTypes from 'prop-types'

export default function Post({ title, content, author, date, likes, comments }) {


    return (
      <div className="post">
        <h2>{title}</h2>
        <p>{content}</p>
        <small>Posted by {author} on {date}</small>
        <div>
          <span>{likes} Likes</span>
          {/* LikeButton */}
          <span>{comments} Comments</span>
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
    comments: PropTypes.number.isRequired,
};