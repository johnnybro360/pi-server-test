import type { SubmitEvent } from "react"
import { createUser } from "./api"

export default function Form({ onUserCreated }: { onUserCreated: () => void }){
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
    
        try {
          await createUser(name);
    
          // optional: clear input
          e.target.reset();
    
          onUserCreated(); // 🔥 refresh list
          // optional: force UI update (if parent state exists)
        } catch (err) {
          console.error("Failed to create user:", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    )
}