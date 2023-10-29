import { Card } from "./Card";
import {Player, Table} from "../logic/BlackJack"
import {useState } from "react";

type Props = {
  player: Player;
  isFliped?: true;
  table: Table;
};

export const BlackJackPlayer = ({
  player,
  isFliped,
  table
}: Props) => {
  const _isFliped = isFliped ? "flip-y" : "";
  const [hand, setHand] = useState(player.getHand())
  const [score, setScore] = useState(player.calcScore())
  const [money, setMoney] = useState(player.getMoney())


  const handleHit = () => {
    table.hit(player);
    setHand(player.getHand())
    setScore(player.calcScore())
  }

  const handleStand = () => {
    table.stand(player);
  }

  const handleDouble = () => {
    table.double(player);
    setHand(player.getHand())
    setScore(player.calcScore())
    setMoney(player.getMoney())
  }

  return (
    <div className={_isFliped}>
      <div>
        {player.getName()}
        <div className="d-flex justify-content-center">
          {hand.map((card, index) => {
            return <Card card={card} key={index}/>;
          })}
        </div>
        <p>score: {score}</p>
        <p>money: {money}</p>
        {player.getType() === "player" && <div>
          <button className="action-btn" onClick={handleHit}>hit</button>
          <button className="action-btn" onClick={handleStand}>stand</button>
          <button className="action-btn" onClick={handleDouble}>double</button>
          </div>}
      </div>
    </div>
  );
};
