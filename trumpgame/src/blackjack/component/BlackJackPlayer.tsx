import { Card } from "./Card";
import {Player} from "../logic/BlackJack"

type Props = {
  player: Player;
  isFliped?: true;
};

export const BlackJackPlayer = ({
  player,
  isFliped
}: Props) => {
  const _isFliped = isFliped ? "flip-y" : "";
  return (
    <div className={_isFliped}>
      <div>
        {player.getName()}
        <div className="d-flex justify-content-center">
          {player.getHand().map((card, index) => {
            return <Card card={card} key={index}/>;
          })}
        </div>
        <p>score: {player.calcScore()}</p>
        <p>money: {player.getMoney()}</p>
        {player.getType() === "player" && <div>
          <button className="action-btn">hit</button>
          <button className="action-btn">stand</button>
          <button className="action-btn">double</button>
          </div>}
      </div>
    </div>
  );
};
