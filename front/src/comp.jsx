import axios from "axios";
import React, { useEffect, useState } from "react";

const Comp = () => {
  const [name, setName] = useState("");
  const [fetcheddata, setFetchedData] = useState({ title: "", text: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api");
        setFetchedData(result.data);
      } catch {}
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api", { name });
    } catch {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api");
    } catch {}
  };

  return (
    <div>
      <h1>{fetcheddata.title}</h1>
      <p>{fetcheddata.text}</p>
      <input
        type="text"
        placeholder="Enter your name"
        data-testid="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button data-testid="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button data-testid="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Comp;
