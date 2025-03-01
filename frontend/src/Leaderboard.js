import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/leaderboard").then((res) => setUsers(res.data));
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px", overflowX: "scroll", padding: "20px" }}>
      {users.map((user) => (
        <Card key={user.id} sx={{ background: "#4caf50", color: "#fff", minWidth: 150 }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">Points: {user.points}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Leaderboard;
