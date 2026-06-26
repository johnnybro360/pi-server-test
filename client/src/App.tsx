import { useEffect, useState } from "react";
import { getUsers } from "./api";
import Form from "./Form";

type User = {
  id: number;
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    getUsers().then(setUsers);
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Pi App
        </h1>
        <Form onUserCreated={fetchUsers} />
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user?.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
