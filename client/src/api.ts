const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
    const res = await fetch(`${API_URL}/api/users`);
    return res.json();
  }

export async function createUser(name: string){
    const res = await fetch(`${API_URL}/api/users`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })

    return res.json()
}