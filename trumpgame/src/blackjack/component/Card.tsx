import "../styles/styles.css";
import { BlackJackCard } from "../logic/BlackJack";

type Props = {
  card: BlackJackCard;
};

export const Card = ({ card }: Props) => {
  return (
    <div className="card-bg mx-1">
      <img src={`/images/${card.getSuit()}.png`} className="card-size" />
      <div className="d-flex justify-content-center">
        <span className="card-rank text-black">{card.getRank()}</span>
      </div>
    </div>
  );
};
