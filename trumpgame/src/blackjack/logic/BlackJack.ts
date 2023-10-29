export class Player {
  private name: string;
  private type: string; // "player" or "dealer" or "cpu"
  private money: number = 100;
  private hand: BlackJackCard[] = [];
  private status: string = "playing"; // "playing" or "bust" or "stand"
  private result?: string; // "win" or "lose" or "draw" ディーラーの場合はundefined
  private bet: number = 0;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  public calcScore(): number {
    let score = 0;
    let isContainsA = false;
    for (const card of this.hand) {
      const rank = card.getRank();
      if (rank === "J" || rank === "Q" || rank === "K") {
        score += 10;
      } else if (rank === "A") {
        isContainsA = true;
        score += 1;
      } else {
        score += Number(rank);
      }
    }
    // Aは1か11の都合の良い方で計算
    if (isContainsA) {
      score <= 11 ? (score += 10) : (score += 0);
    }
    return score;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): string {
    return this.type;
  }

  public getMoney(): number {
    return this.money;
  }

  public getHand(): BlackJackCard[] {
    return this.hand;
  }

  public getStatus(): string {
    return this.status;
  }

  public getResult(): string | undefined {
    return this.result;
  }

  public getBet(): number {
    return this.bet;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public setResult(result: string): void {
    this.result = result;
  }

  public setBet(bet: number): void {
    this.bet = bet;
    this.money -= bet;
  }

  public setMoney(money: number): void {
    this.money = money;
  }
}

export class BlackJackCard {
  private suit: string;
  private rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public getSuit(): string {
    return this.suit;
  }

  public getRank(): string {
    return this.rank;
  }
}

export class Table {
  private players: Player[]; // players[0]はディーラー
  private deck: BlackJackCard[];
  private winner?: Player;
  private round: number = 0;

  constructor(players: Player[]) {
    this.players = players;
    this.deck = this.shuffleDeck(this.createDeck());
    this.startRound();
  }

  public createDeck(): BlackJackCard[] {
    const suits = ["spade", "heart", "diamond", "clover"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const deck: BlackJackCard[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push(new BlackJackCard(suit, rank));
      }
    }
    return deck;
  }

  private startRound(): void {
    this.round++;
    for (const player of this.players) {
      player.setStatus("playing");
      for (let i = 0; i < 2; i++) {
        this.dealCard(player);
      }
    }
  }

  private shuffleDeck(deck: BlackJackCard[]): BlackJackCard[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = deck[i];
      deck[i] = deck[r];
      deck[r] = tmp;
    }
    return deck;
  }

  private dealCard(player: Player): void {
    player.getHand().push(this.deck.pop()!);
  }

  public hit(player: Player): void {
    if (player.getStatus() === "bust") return
    this.dealCard(player);
    if (player.calcScore() >= 22) {
      player.setStatus("bust");
    }
  }

  public stand(player: Player): void {
    if (player.getStatus() === "bust") return
    player.setStatus("stand");
  }

  public double(player: Player): void {
    if (player.getHand().length !== 2) return
    player.setBet(player.getBet() * 2);
    this.hit(player);
  }

  public judgeResult(): void {
    const dealerScore = this.players[0].calcScore();
    for (let i = 1; i < this.players.length; i++) {
      const playerScore = this.players[i].calcScore();
      if (playerScore >= 22) {
        this.players[i].setResult("lose");
      } else if (playerScore === dealerScore) {
        this.players[i].setResult("draw");
      } else {
        playerScore > dealerScore
          ? this.players[i].setResult("win")
          : this.players[i].setResult("lose");
      }
    }
  }

  //賭け金を払い戻す
  public payBack(): void {
    for (let i = 1; i < this.players.length; i++) {
      const player = this.players[i];
      const result = player.getResult();
      const bet = player.getBet();
      if (result === "win") {
        player.setMoney(player.getMoney() + bet * 2);
      } else if (result === "draw") {
        player.setMoney(player.getMoney() + bet);
      }
    }
  }

  public judgeFinalResult(): void {
    let maxAmountOfMoney = 0;
    for (let i = 1; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.getMoney() > maxAmountOfMoney) {
        maxAmountOfMoney = player.getMoney();
        this.winner = player;
      }
    }
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getDeck(): BlackJackCard[] {
    return this.deck;
  }

  public getWinner(): Player | undefined {
    return this.winner;
  }
}
