type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = ({ params }: UserPageProps) => {
  const username = params.username;

  return <div>{username}</div>;
};

export default UserPage;
