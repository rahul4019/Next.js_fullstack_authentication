import React from 'react';

const UserProfile = ({ params }: any) => {
  return (
    <div>
      <h2>This is profile page of {params.id}</h2>
    </div>
  );
};

export default UserProfile;
