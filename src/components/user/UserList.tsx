function UserList({ users, onClick }) {
  return (
    <>
      <div className="absolute w-full rounded-lg bg-neutral-800 overflow-hidden">
        {users.map((user) => (
          <div
            onClick={() => onClick(user)}
            className="cursor-pointer border-b border-neutral-700 hover:bg-neutral-600 w-full"
            key={user.uid}
          >
            <div className="flex items-center px-3 py-1 justify-start">
              <div className="w-10 mr-4 bg-neutral-700 flex items-center justify-center text-3xl font-semibold h-10 rounded-full">
                {user.username[0]}
              </div>
              <p>{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
