import "../styles/styles.css"
import { BlackJackPlayer } from "./BlackJackPlayer";
import {Table} from "../logic/BlackJack"

type Props = {
  table: Table;
}
export const BlackJackBoard = ({table}: Props) => {
  return (
    <div className="board-bg">
      {/*dealer area*/}
      <BlackJackPlayer player={table.getPlayers()[0]}></BlackJackPlayer>
      {/*players area*/}
      {table.getPlayers().slice(1).map((player, index) => {
        return <div className="mx-3" key={index}><BlackJackPlayer player={player}></BlackJackPlayer></div>;
      })}
    </div>
  );
};
