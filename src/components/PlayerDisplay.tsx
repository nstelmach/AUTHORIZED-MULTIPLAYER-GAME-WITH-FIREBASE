import React from "react";
import useUser from "../hooks/useUser";
import useJoinRoom from "../hooks/useJoinRoom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import useRoom from "../hooks/useRoom";

export type PlayerDisplayProps = {
  player: "X" | "O";
};

function PlayerDisplay({ player }: PlayerDisplayProps) {
  const currentUser = useAuth();
  const { isFetching, room } = useRoom();
  const playerId = player === "X" ? room?.playerXId : room?.playerOId;
  const { user } = useUser(playerId);

  const navigate = useNavigate();
  const { isJoining, joinRoom } = useJoinRoom();

  if (isFetching) return <h1>Loading Room...</h1>;
  if (!room) return <h1>Room Not Found</h1>;

  return (
    <div>
      Player {player}:
      {user ? (
        <div>{user.displayName}</div>
      ) : currentUser.user ? (
        <div onClick={() => joinRoom(player, currentUser.user!.uid)}>
          Join{isJoining ? "ing" : ""}
        </div>
      ) : (
        <div
          onClick={() => {
            navigate(`/login?r_${room.id}`);
          }}
        >
          Login to Join
        </div>
      )}
    </div>
  );
}

export default PlayerDisplay;
