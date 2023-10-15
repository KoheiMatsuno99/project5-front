import { useState } from "react";
import { BlackJackBoard } from "./BlackJackBoard";
import {Player, Table} from "../logic/BlackJack"

export const BlackJackRule = () => {
    const players = [
        new Player("dealer", "dealer"),
        new Player("player1", "player"),
        new Player("player2", "player"),
    ]
    const table = new Table(players);
    
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true);
    }

    return (
        <div>
            <h1>BlackJack</h1>
            {!isStarted && <button onClick={handleStart}>start</button>}
            {isStarted && <BlackJackBoard table={table} />}
        </div>
    );
}