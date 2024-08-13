import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../state/app.context';
import { getUserByHandle } from '../../services/user.services';
import './AuthorDetails.css';

export default function AuthorDetails() {
  const { user, isLoading } = useContext(AppContext);
  const { handle } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!isLoading) {
        if (!user) {
          navigate('/login');
        } else {
          const data = await getUserByHandle(handle);
          if (data) {
            setAuthorData(data);
          } else {
            console.error(`No user found with handle: ${handle}`);
          }
        }
      }
    };

    fetchAuthorData();
  }, [handle, isLoading, user, navigate]);

  if (isLoading) {
    return <p>Loading author details...</p>;
  }

  if (!authorData) {
    return <p>No author found with the handle: {handle}</p>;
  }

  return (
    <div className="author-details-container">
      <h2>Author Details</h2>
      <div className="author-details">
        <p><strong>Username:</strong> {authorData.handle}</p>
        <p><strong>First Name:</strong> {authorData.firstName}</p>
        <p><strong>Last Name:</strong> {authorData.lastName}</p>
        <p><strong>Email:</strong> {authorData.email}</p>
        <p><strong>Phone Number:</strong> {authorData.phoneNumber || 'Not Provided'}</p>
        <p><strong>Account Created On:</strong> {authorData.createdOn}</p>
        <p><strong>Admin Status:</strong> {authorData.isAdmin ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
