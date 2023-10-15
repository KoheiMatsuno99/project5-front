import { useState } from "react";
import { BlackJackBoard } from "./BlackJackBoard";
import {Player, Table} from "../logic/BlackJack"

export const BlackJackRule = () => {
    const players = [
        new Player("dealer", "dealer"),
        new Player("player1", "player"),
        new Player("player2", "cpu"),
        new Player("player3", "cpu"),
    ]
    const table = new Table(players);
    
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true);
    }

    return (
        <div>
            {!isStarted && <button onClick={handleStart}>start</button>}
            {isStarted && <BlackJackBoard table={table} />}
        </div>
    );
}