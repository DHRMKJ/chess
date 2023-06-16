import Chessboard from "./components/chessboard/Chessboard";

type Side = "white" | "White" | "Black" | "black";
export default function Home() {
  const dimensions: { length: number; side: Side } = {
    length: 700,
    side: "black",
  };
  return (
    <main>
      <div className="flex items-center justify-center h-screen w-screen">
        <Chessboard {...dimensions} />
      </div>
    </main>
  );
}
