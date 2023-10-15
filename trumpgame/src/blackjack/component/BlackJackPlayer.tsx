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
        {player.getType()}
        {player.getHand().map((card, index) => {
          return <Card card={card} key={index}/>;
        })}
        {player.calcScore()}
        {player.getMoney()}
      </div>
    </div>
  );
};
