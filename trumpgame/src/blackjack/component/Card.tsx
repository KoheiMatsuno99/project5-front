import "../styles/styles.css"
import {BlackJackCard} from "../logic/BlackJack"

type Props = {
  card: BlackJackCard;
};

export const Card = ({ card }: Props) => {
  return (
    <div>
      <img src={`/images/${card.getSuit()}.png`} />
      <div className="d-flex justify-content-center">
        {card.getRank()}
      </div>
    </div>
  );
};
