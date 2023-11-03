import "../styles/styles.css";
import { BlackJackPlayer } from "./BlackJackPlayer";
import { Table } from "../logic/BlackJack";
import { useState } from "react";

type Props = {
  table: Table;
};
export const BlackJackBoard = ({ table }: Props) => {
  const [turn, setTurn] = useState(table.getTurn());

  const handleCpuAction = () => {
    console.log("handleCpuAction");
    if (table.getPlayers()[turn].getType() === "player") return 
    table.cpuAction(table.getPlayers()[turn]);
    setTurn(table.getTurn());
  }

  return (
    <div className="board-bg full-screen">
      {/*dealer area*/}
      <div>
        <BlackJackPlayer
          player={table.getPlayers()[0]}
          table={table}
          onAction={handleCpuAction}
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
                  onAction={handleCpuAction}
                ></BlackJackPlayer>
              </div>
            );
          })}
      </div>
    </div>
  );
};
