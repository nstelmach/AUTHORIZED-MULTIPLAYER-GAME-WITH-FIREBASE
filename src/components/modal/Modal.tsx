import React from "react";
import classes from "./Modal.module.css";
import Button from "../button/Button";

export type ModalProps = {
  onConfirm: () => void;
  onDecline: () => void;
  winnerName: string | null | undefined;
};

function Modal({ onConfirm, onDecline, winnerName }: ModalProps) {
  return (
    <div className={classes.background}>
      <div className={classes.wrapper}>
        <div className={classes.subtitles}>
          Winner:
          {" " + winnerName}
        </div>
        <div className={classes.subtitles}>Wanna play again?</div>
        <div className={classes.buttonsWrapper}>
          <Button
            type="button"
            disabled={false}
            className={classes.button}
            onClick={onConfirm}
            text="Yes"
          />
          <Button
            type="button"
            disabled={false}
            className={classes.button}
            onClick={onDecline}
            text="No"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
