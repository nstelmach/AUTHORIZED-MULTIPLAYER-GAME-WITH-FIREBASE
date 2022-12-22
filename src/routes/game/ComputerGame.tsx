import React, { useEffect, useMemo } from "react";
import useClearBoard from "../../hooks/useClearBoard";
import { useAuth } from "../../contexts/AuthContext";
import { GameStatus } from "../../types/types";
import useMarkBoard from "../../hooks/useMarkBoard";
import Game from "../../components/board/game/Game";
import classes from "./ComputerPlayerGame.module.css";
import useComputer from "../../hooks/useComputer";
import ComputerGameDisplay from "../../components/player-display/ComputerGameDisplay";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import useResetGame from "../../hooks/useResetGame";
import getRandomInt from "../../utils/getRandomInt";

function ComputerGame() {
  const { clearBoard } = useClearBoard();
  const { user } = useAuth();
  const { isMarking, markBoard } = useMarkBoard();
  const { computerGame } = useComputer();
  const {
    game,
    gameStatus,
    playerXId,
    playerOId,
    playerODisplayName,
    playerXDisplayName,
  } = computerGame || {};

  const navigate = useNavigate();
  const { resetGame, isReseting } = useResetGame();

  useEffect(() => {
    if (!game) {
      return;
    }
    let emptyIndexArr = game?.reduce<number[]>((acc, curVal, index) => {
      if (!curVal) {
        return [...acc, index];
      } else {
        return acc;
      }
    }, []);

    let generatedIndex =
      emptyIndexArr[getRandomInt(0, emptyIndexArr?.length - 1)];

    if (!isMarking && !game![generatedIndex]) {
    }
    if (
      (gameStatus === GameStatus.XTurn && playerXId === "computer") ||
      (gameStatus === GameStatus.OTurn && playerOId === "computer")
    ) {
      markBoard(generatedIndex, computerGame!, [
        "users",
        user!.uid,
        "computer",
        "computer",
      ]);
    }
  }, [
    game,
    gameStatus,
    playerOId,
    playerXId,
    computerGame,
    isMarking,
    markBoard,
    user,
  ]);

  async function onSquareClickHandler(index: number) {
    if (!isMarking && !game![index]) {
      if (
        (gameStatus === GameStatus.XTurn && user?.uid === playerXId) ||
        (gameStatus === GameStatus.OTurn && user?.uid === playerOId)
      ) {
        await markBoard(index, computerGame!, [
          "users",
          user!.uid,
          "computer",
          "computer",
        ]);
      }
    }
  }
  const date = useMemo(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    let date = mm + "/" + dd + "/" + yyyy;
    return date;
  }, []);

  const oponent = useMemo(
    () =>
      user?.displayName === playerODisplayName
        ? playerXDisplayName
        : playerODisplayName,
    [playerODisplayName, playerXDisplayName, user?.displayName]
  );

  const winnerName = useMemo(() => {
    let winnerName: string | null | undefined;
    if (gameStatus === GameStatus.OWinner) {
      winnerName = playerODisplayName;
    } else if (gameStatus === GameStatus.XWinner) {
      winnerName = playerXDisplayName;
    } else if (gameStatus === GameStatus.Draw) {
      winnerName = "Draw";
    }
    return winnerName;
  }, [gameStatus, playerODisplayName, playerXDisplayName]);

  useEffect(() => {
    if (
      gameStatus === GameStatus.OWinner ||
      gameStatus === GameStatus.XWinner ||
      gameStatus === GameStatus.Draw
    ) {
      let randomId = Date.now().toString();
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

  return (
    <>
      <div className={classes.playerWrapper}>
        <ComputerGameDisplay player="X" />
        <ComputerGameDisplay player="O" />
      </div>
      <Game
        onSquareClick={onSquareClickHandler}
        game={game || []}
        gameStatus={gameStatus!}
        onConfirm={() => {
          clearBoard(["users", user!.uid, "computer", "computer"]);
        }}
        onDecline={() => {
          resetGame();
          navigate("/");
        }}
        winnerName={winnerName}
      />
      <div
        onClick={() => {
          resetGame();
        }}
        className={`${classes.link} ${classes.subtitles}`}
      >
        Reset{isReseting ? "ing" : ""} Game
      </div>
    </>
  );
}

export default ComputerGame;
