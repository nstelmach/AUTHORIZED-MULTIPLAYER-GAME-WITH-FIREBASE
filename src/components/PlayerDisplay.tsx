import React, { MouseEvent } from "react";
import useUser from "../hooks/useUser";
import useJoinRoom from "../hooks/useJoinRoom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import useRoom from "../hooks/useRoom";
import { SYMBOL } from "../types/types";
import { useCallback, useMemo, useEffect } from "react";
import useLeaveRoom from "../hooks/useLeaveRoom";
import useSearchParams from "../hooks/search-params/useSearchParams";

export type PlayerDisplayProps = {
  player: SYMBOL;
};

function PlayerDisplay({ player }: PlayerDisplayProps) {
  const auth = useAuth();
  const { isFetching, room } = useRoom();
  const navigate = useNavigate();
  const { isJoining, joinRoom } = useJoinRoom();
  const { isLeaving, leaveRoom } = useLeaveRoom();
  const { player: playerSearch } = useSearchParams();

  const playerId = useMemo(
    () => (player === "X" ? room?.playerXId : room?.playerOId),
    [player, room]
  );

  const { user } = useUser(playerId);

  useEffect(() => {
    if (!isFetching && room && !user && auth.user && playerSearch === player)
      joinRoom(player, auth.user.uid);
  }, [isFetching, room, user, auth.user, playerSearch, player, joinRoom]);

  const renderRemoveUser = useCallback(() => {
    function handleClick(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
      e.stopPropagation();
      leaveRoom(player);
    }

    if (auth.user?.uid === playerId || auth.user?.uid === room?.owner) {
      return (
        <div onClick={handleClick}>
          {auth.user?.uid === playerId
            ? `Leav${isLeaving ? "ing" : "e"}`
            : `Kick${isLeaving ? "ing" : ""}`}
        </div>
      );
    }
    return null;
  }, [auth.user, playerId, room, leaveRoom, player, isLeaving]);

  if (isFetching) return <h1>Loading Room...</h1>;
  if (!room) return <h1>Room Not Found</h1>;

  return (
    <div>
      Player {player}:
      {user ? (
        <div>
          {user.displayName} {renderRemoveUser()}
        </div>
      ) : auth.user ? (
        <div onClick={() => joinRoom(player, auth.user!.uid)}>
          Join{isJoining ? "ing" : ""}
        </div>
      ) : (
        <div
          onClick={() => {
            navigate(`/login?redirect=r_${room.id}&player=${player}`);
          }}
        >
          Login to Join
        </div>
      )}
    </div>
  );
}

export default PlayerDisplay;
