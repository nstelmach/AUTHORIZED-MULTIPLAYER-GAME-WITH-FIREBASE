import React, { MouseEvent, useCallback, useMemo, useEffect } from "react";
import useUser from "../hooks/useUser";
import useJoinRoom from "../hooks/useJoinRoom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { SYMBOL } from "../types/types";
import useLeaveRoom from "../hooks/useLeaveRoom";
import useSearchParams from "../hooks/search-params/useSearchParams";
import classes from "./PlayerDisplay.module.css";

export type PlayerDisplayProps = {
  player: SYMBOL;
  isPlayerGame: boolean;
};

function PlayerDisplay({ player, isPlayerGame }: PlayerDisplayProps) {
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
      joinRoom(player, auth.user.uid, auth.user.displayName);
  }, [isFetching, room, user, auth.user, playerSearch, player, joinRoom]);

  const renderRemoveUser = useCallback(() => {
    function handleClick(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
      e.stopPropagation();
      leaveRoom(player);
    }

    if (
      playerId &&
      (auth.user?.uid === playerId || auth.user?.uid === room?.owner)
    ) {
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

  function joinRoomHandler() {
    if (!isPlayerGame) {
      if (player === "O") {
        joinRoom(player, auth.user!.uid, auth.user!.displayName);
        joinRoom("X", "computer", "computer");
      } else if (player === "X") {
        joinRoom(player, auth.user!.uid, auth.user!.displayName);
        joinRoom("O", "computer", "computer");
      }
    } else joinRoom(player, auth.user!.uid, auth.user!.displayName);
    return null;
  }

  if (isFetching) return <h1>Loading Room...</h1>;
  if (!room) return <h1>Room Not Found</h1>;

  return (
    <div className={classes.player}>
      Player {player}:
      {user && playerId ? (
        <div className={classes.wrapper}>
          <div className={classes.user}>{user.displayName}</div>
          <div className={classes.leave}> {renderRemoveUser()}</div>
        </div>
      ) : auth.user ? (
        <div className={classes.join} onClick={joinRoomHandler}>
          Join{isJoining ? "ing" : ""}
        </div>
      ) : (
        <div
          className={classes.join}
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
