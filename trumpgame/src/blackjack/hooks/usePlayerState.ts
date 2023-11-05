import { useCallback, useState } from "react";
import { Table } from "../logic/BlackJack";

export const usePlayerState = (table: Table) => {
  const [playerStates, setPlayerStates] = useState(() =>
    table.getPlayers().map((player) => ({
      hand: player.getHand(),
      score: player.calcScore(),
      money: player.getMoney(),
      status: player.getStatus(),
    }))
  );

  const updatePlayerStates = useCallback(() => {
    setPlayerStates(
      table.getPlayers().map((player) => ({
        hand: player.getHand(),
        score: player.calcScore(),
        money: player.getMoney(),
        status: player.getStatus(),
      }))
    );
  }, [table]);

  return { playerStates, updatePlayerStates };
};
