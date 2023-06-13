"use client";

import { useEffect } from "react";
type Side = "white" | "White" | "Black" | "black";
type Props = {
  length: number;
  side?: Side;
};
export default function Chessboard({ length, side = "white" }: Props) {
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
        g.appendChild(square);
      }
      board?.appendChild(g);
    }
  };
  //   const dragStart = (e: Event) => {
  //     console.log("dragStart");
  //   };
  useEffect(() => {
    setup();

    // document?.addEventListener("dragstart", dragStart);
  }, []);

  return <div id="chessboard"></div>;
}
