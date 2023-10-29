import "../styles/styles.css"
import { BlackJackPlayer } from "./BlackJackPlayer";
import {Table} from "../logic/BlackJack"

type Props = {
  table: Table;
}
export const BlackJackBoard = ({table}: Props) => {
  return (
    <div className="board-bg full-screen">
      {/*dealer area*/}
      <div>
        <BlackJackPlayer player={table.getPlayers()[0]} table={table}></BlackJackPlayer>
      </div>
      {/*players area*/}
      <div className="d-flex justify-content-center mt-18">
        {table.getPlayers().slice(1).map((player, index) => {
          return <div className="mx-8" key={index}><BlackJackPlayer player={player} table={table}></BlackJackPlayer></div>;
        })}
      </div>
    </div>
  );
};
