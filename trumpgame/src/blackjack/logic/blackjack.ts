class Player{
    private name: string
    private type: string // "player" or "dealer" or "cpu"
    private money: number = 100
    private hand: Card[] = []
    private status: string = "playing" // "playing" or "bust" or "stand"

    constructor(name: string, type: string){
        this.name = name
        this.type = type
    }

    public getName(): string{
        return this.name
    }

    public getType(): string{
        return this.type
    }

    public getMoney(): number{
        return this.money
    }

    public getHand(): Card[]{
        return this.hand
    }

    public getStatus(): string{
        return this.status
    }

    public calcScore(): number{
        let score = 0
        let isContainsA = false
        for(let card of this.hand){
            const rank = card.getRank()
            if(rank === "J" || rank === "Q" || rank === "K"){
                score += 10
            }else if(rank === "A"){
                isContainsA = true
                score += 1
            }else{
                score += Number(rank)
            }
        }
        // Aは1か11の都合の良い方で計算
        if(isContainsA){
            score <= 11 ? score += 10 : score += 0
        }
        return score
    }
}

class Card{
    private suit: string
    private rank: string

    constructor(suit: string, rank: string){
        this.suit = suit
        this.rank = rank
    }

    public getSuit(): string{
        return this.suit
    }

    public getRank(): string{
        return this.rank
    }
}

class Table{
    private players: Player[]
    private deck: Card[]
    private winner?: Player

    constructor(players: Player[]){
        this.players = players
        this.deck = this.shuffleDeck(this.createDeck())

        for (let player of this.players){
            for(let i = 0; i < 2; i++){
                this.dealCard(player)
            }
        }
    }

    public createDeck(): Card[]{
        const suits = ["♠", "♥", " ♦", "♣"]
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                       "J", "Q", "K"]
        const deck: Card[] = []
        for(let suit of suits){
            for(let rank of ranks){
                deck.push(new Card(suit, rank))
            }
        }
        return deck
    }

    private shuffleDeck(deck: Card[]): Card[]{
        for(let i = deck.length - 1; i > 0; i--){
            const r = Math.floor(Math.random() * (i + 1))
            const tmp = deck[i]
            deck[i] = deck[r]
            deck[r] = tmp
        }
        return deck
    }

    private dealCard(player: Player): void{
        player.getHand().push(this.deck.pop()!)
    }

    public getPlayers(): Player[]{
        return this.players
    }

    public getDeck(): Card[]{
        return this.deck
    }

    public getWinner(): Player | undefined{
        return this.winner
    }
}
