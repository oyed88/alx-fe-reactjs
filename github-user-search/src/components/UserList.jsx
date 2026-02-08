import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
