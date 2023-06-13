import Image from 'next/image'
import Chessboard from "./components/chessboard/Chessboard";

type Side = "white" | "White" | "Black" | "black";
export default function Home() {
  const dimensions: { length: number; side: Side } = {
    length: 800,
    side: "white",
  };
  return (
    <main>
      <Chessboard {...dimensions} />
    </main>
  );
}
