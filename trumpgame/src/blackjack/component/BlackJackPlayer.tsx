import { Card } from "./Card";
import { BlackJackCard, Player, Table } from "../logic/BlackJack";

type PlayerStates = {
  hand: BlackJackCard[];
  score: number;
  money: number;
  status: string;
};

type Props = {
  player: Player;
  isFliped?: true;
  table: Table;
  playerStates: PlayerStates;
  onAction: () => void;
};

export const BlackJackPlayer = ({
  player,
  isFliped,
  table,
  playerStates,
  onAction,
}: Props) => {
  const _isFliped = isFliped ? "flip-y" : "";
  const currentTurn = table.getTurn();
  const isClickDisabled = player !== table.getPlayers()[currentTurn];

  const handleHit = () => {
    table.hit(player);
    onAction();
  };

  const handleStand = () => {
    table.stand(player);
    onAction();
  };

  const handleDouble = () => {
    table.double(player);
    onAction();
  };

  return (
    <div className={_isFliped}>
      <div>
        {player.getName()}
        <div className="d-flex justify-content-center">
          {playerStates.hand.map((card, index) => {
            return <Card card={card} key={index} />;
          })}
        </div>
        <p>score: {playerStates.score}</p>
        <p>money: {playerStates.money}</p>
        <p>{playerStates.status}</p>
        {player.getType() === "player" && (
          <div>
            <button
              className="action-btn"
              onClick={handleHit}
              disabled={isClickDisabled}
            >
              hit
            </button>
            <button
              className="action-btn"
              onClick={handleStand}
              disabled={isClickDisabled}
            >
              stand
            </button>
            <button
              className="action-btn"
              onClick={handleDouble}
              disabled={isClickDisabled}
            >
              double
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
