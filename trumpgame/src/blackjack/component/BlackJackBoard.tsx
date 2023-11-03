import "../styles/styles.css";
import { BlackJackPlayer } from "./BlackJackPlayer";
import { Table } from "../logic/BlackJack";
import { useState } from "react";

type Props = {
  table: Table;
};
export const BlackJackBoard = ({ table }: Props) => {
  const [turn, setTurn] = useState(table.getTurn());

  const handleNextTurn = () => {
    const nextTurn = (turn + 1) % table.getPlayers().length;
    setTurn(nextTurn);
  };

  return (
    <div className="board-bg full-screen">
      {/*dealer area*/}
      <div>
        <BlackJackPlayer
          player={table.getPlayers()[0]}
          table={table}
          onAction={handleNextTurn}
        ></BlackJackPlayer>
      </div>
      <p>current turn {turn}</p>
      {/*players area*/}
      <div className="d-flex justify-content-space-around">
        {table
          .getPlayers()
          .slice(1)
          .map((player, index) => {
            return (
              <div className="player" key={index}>
                <BlackJackPlayer
                  player={player}
                  table={table}
                  onAction={handleNextTurn}
                ></BlackJackPlayer>
              </div>
            );
          })}
      </div>
    </div>
  );
};
