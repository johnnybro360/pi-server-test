export async function getUsers() {
    const res = await fetch("http://localhost:3001/api/users");
    return res.json();
  }

export async function createUser(name: string){
    const res = await fetch("http://localhost:3001/api/users",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })

    return res.json()
}