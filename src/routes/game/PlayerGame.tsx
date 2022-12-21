import React, { useEffect } from "react";
import Game from "../../components/board/game/Game";
import classes from "./ComputerPlayerGame.module.css";
import useRoom from "../../hooks/useRoom";
import useMarkBoard from "../../hooks/useMarkBoard";
import { useNavigate, useParams } from "react-router-dom";
import useClearBoard from "../../hooks/useClearBoard";
import { GameStatus, SYMBOL } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";
import PlayerDisplay from "../../components/player-display/PlayerDisplay";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useLeaveRoom from "../../hooks/useLeaveRoom";

function NewGame() {
  const { roomId } = useParams();
  const { isFetching, room } = useRoom();
  const { isMarking, markBoard } = useMarkBoard();
  const {
    game,
    gameStatus,
    playerOId,
    playerXId,
    playerODisplayName,
    playerXDisplayName,
  } = room || {};
  const { clearBoard } = useClearBoard();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { leaveRoom } = useLeaveRoom();

  // use memo
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  let date = mm + "/" + dd + "/" + yyyy;

  // use memo
  let oponent =
    user?.displayName === playerODisplayName
      ? playerXDisplayName
      : playerODisplayName;

  //use memo
  let winnerName: string | null | undefined;
  if (gameStatus === GameStatus.OWinner) {
    winnerName = playerODisplayName;
  } else if (gameStatus === GameStatus.XWinner) {
    winnerName = playerXDisplayName;
  } else if (gameStatus === GameStatus.Draw) {
    winnerName = "Draw";
  }

  useEffect(() => {
    if (
      gameStatus === GameStatus.OWinner ||
      gameStatus === GameStatus.XWinner ||
      gameStatus === GameStatus.Draw
    ) {
      const randomId = Date.now().toString();
      setDoc(doc(db, "users", user!.uid, "history", randomId), {
        date: date,
        oponent: oponent,
        winner: winnerName,
      });
    }
  }, [
    gameStatus,
    playerODisplayName,
    playerXDisplayName,
    user,
    date,
    oponent,
    winnerName,
  ]);

  if (isFetching) return <h1>Loading Room...</h1>;
  if (!room) return <h1>Room Not Found</h1>;

  async function onSquareClickHandler(index: number) {
    if (!isMarking && !game![index]) {
      if (
        (gameStatus === GameStatus.XTurn && user?.uid === playerXId) ||
        (gameStatus === GameStatus.OTurn && user?.uid === playerOId)
      ) {
        await markBoard(index, room!, ["rooms", roomId!]);
      }
    }
  }

  return (
    <>
      <div className={classes.playerWrapper}>
        <PlayerDisplay player="X" isPlayerGame={true} />
        <PlayerDisplay player="O" isPlayerGame={true} />
      </div>
      <Game
        onSquareClick={onSquareClickHandler}
        game={game || []}
        gameStatus={gameStatus!}
        onConfirm={() => {
          clearBoard(["rooms", roomId!]);
        }}
        onDecline={() => {
          clearBoard(["rooms", roomId!]);
          let player: SYMBOL | null =
            user?.uid === playerOId
              ? "O"
              : user?.uid === playerXId
              ? "X"
              : null;
          player && leaveRoom(player);
          navigate("/");
        }}
        winnerName={winnerName}
      />
      <div className={classes.linkWrapper}>
        <div className={classes.subtitles}>Link to the game: </div>
        <div className={classes.link}>
          {/* zapisz jako env zmienna */}
          https://nstelmach.github.io/Tic-Tac-Toe/#/r/{roomId}
        </div>
      </div>
    </>
  );
}

export default NewGame;
