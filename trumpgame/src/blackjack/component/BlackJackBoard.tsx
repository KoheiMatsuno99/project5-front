import "../styles/styles.css";
import { BlackJackPlayer } from "./BlackJackPlayer";
import { Table } from "../logic/BlackJack";
import { useState } from "react";
import { usePlayerState } from "../hooks/usePlayerState";

type Props = {
  table: Table;
};
export const BlackJackBoard = ({ table }: Props) => {
  const [turn, setTurn] = useState(table.getTurn());
  const { playerStates, updatePlayerStates } = usePlayerState(table);

  const handleNextTurn = () => {
    updatePlayerStates();
    const nextTurn = (turn + 1) % table.getPlayers().length;
    setTurn(nextTurn);

    if (table.getPlayers()[nextTurn].getType() !== "player") {
      setTimeout(() => {
        table.cpuAction(table.getPlayers()[nextTurn]);
        updatePlayerStates();
        handleNextTurn();
      }, 1000);
    }
  };

  return (
    <div className="board-bg full-screen">
      {/*dealer area*/}
      <div>
        <BlackJackPlayer
          player={table.getPlayers()[0]}
          table={table}
          playerStates={playerStates[0]}
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
                  playerStates={playerStates[index + 1]}
                  onAction={handleNextTurn}
                ></BlackJackPlayer>
              </div>
            );
          })}
      </div>
    </div>
  );
};
