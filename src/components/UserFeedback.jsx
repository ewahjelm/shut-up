const UserFeedback = ({ feedback }) => {
  if (!feedback) return null; 

  return (
    <div>
      {feedback}
    </div>
  );
};

export default UserFeedback;
