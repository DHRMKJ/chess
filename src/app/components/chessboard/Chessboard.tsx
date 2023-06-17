"use client";

import { useEffect } from "react";
type Side = "white" | "White" | "Black" | "black";
type Props = {
  length: number;
  side?: Side;
  position?: string;
};
export default function Chessboard({
  length,
  side = "white",
  position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
}: Props) {
  // const initialPosition = ""
  let beingDragged: HTMLElement;
  let beingTouched: HTMLElement,
    hasPiece = false;
  const dragStart = (e: DragEvent) => {
    beingDragged = e.target as HTMLElement;
  };
  const onClick = (e: Event) => {
    if (hasPiece) {
      hasPiece = false;
      const target = e.target as HTMLElement;
      if (!target) return;
      target.nodeName === "IMG"
        ? target.parentNode?.replaceChild(beingTouched, target)
        : target.append(beingTouched);
    } else {
      const target = e.target as HTMLElement;
      if (target.nodeName === "IMG") {
        hasPiece = true;
        beingTouched = target;
        beingTouched.setAttribute("class", "shadow-md");
      }
    }
  };
  const dragDrop = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    target.nodeName === "IMG"
      ? target.parentNode?.replaceChild(beingDragged, target)
      : target.append(beingDragged);
  };
  const dragOver = (e: DragEvent) => e.preventDefault();
  const dragEnd = (e: DragEvent) => {};
  const populate = () => {
    const filteredPosition =
      side === "Black" || "black"
        ? position.split("").reverse().join("")
        : position;
    const fen = filteredPosition.split("/");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let square = document.getElementById(
          String.fromCharCode(
            side == "white" ? "a".charCodeAt(0) + j : "h".charCodeAt(0) - j
          ) + (side == "white" ? 8 - i : i + 1).toString()
        );
        if (/^\d$/.test(fen[i][j])) {
          j += parseInt(fen[i][j]) - 1;
          continue;
        }
        const sidePiece = side == "white" ? "w" : "b";

        let piece =
          fen[i][j] === fen[i][j].toUpperCase()
            ? sidePiece + fen[i][j].toUpperCase()
            : (sidePiece === "w" ? "b" : "w") + fen[i][j].toUpperCase();
        const image = document.createElement("img");
        image.setAttribute("id", piece);
        image.setAttribute("src", `/chess/chess_kaneo/${piece}.svg`);
        image.draggable = true;
        image.addEventListener("dragstart", dragStart);
        image.addEventListener("dragend", dragEnd);

        square?.appendChild(image);
      }
    }
  };
  const setup = () => {
    const board = document.getElementById("chessboard");
    if (!board) return;
    board.style.width = "fit-content";
    board.style.border = "5px solid white";
    board.style.display =
      "flex" + side === "white" || "White" ? "column-reverse" : "column";

    for (let i = 0; i < 8; i++) {
      let g = document.createElement("div");
      g.setAttribute("id", String.fromCharCode("a".charCodeAt(0) + i));
      g.style.display = "flex";
      for (let j = 0; j < 8; j++) {
        let square = document.createElement("div");
        square.setAttribute(
          "id",
          String.fromCharCode(
            side == "white" ? "a".charCodeAt(0) + j : "h".charCodeAt(0) - j
          ) + (side == "white" ? 8 - i : i + 1).toString()
        );
        square.style.width = length / 8 + "px";
        square.style.height = length / 8 + "px";
        square.style.backgroundColor = j % 2 == i % 2 ? "white" : "black";
        square.addEventListener("dragover", dragOver);
        square.addEventListener("click", onClick);
        square.addEventListener("drop", dragDrop);
        g.appendChild(square);
      }
      board?.appendChild(g);
    }
    populate();
  };

  useEffect(() => {
    setup();
  }, []);

  return <div id="chessboard"></div>;
}
