export function numberOfCards(cards) {
  let numberOfCards = 0;
  for (let i = 0; i < cards.length; i++) {
    numberOfCards++;
  }
  return numberOfCards;
}

const repeatDeck = (arr, repeats) =>
  Array.from({ length: repeats }, () => arr).flat();

export function buildDeck(decks, jokers) {
  let cards = repeatDeck(allCards, decks);
  if (jokers !== 0) {
    return [...cards, ...setJokers(jokers)];
  }
  return cards;
}

export function setJokers(number) {
  let jokers = [];
  for (let i = 0; i < number; i++) {
    jokers.push({ type: 'Joker', number: 'Joker' });
  }
  return jokers;
}

export function selectRandomCard(cards) {
  let card = cards[Math.floor(Math.random() * cards.length)];
  return card;
}

export function removeCard(cards, card, numberOfJokers) {
  const string = JSON.stringify(cards);
  const goodCards = JSON.parse(string);
  if (card.type !== 'Joker') {
    let cardSelected = goodCards.find(
      (c) => c.type === card.type && c.number === card.number
    );
    let index = goodCards.indexOf(cardSelected);
    if (index > -1) {
      goodCards.splice(index, 1);
    }
  } else {
    goodCards.pop();
  }
  if (goodCards.length > 0) {
    return goodCards;
  } else {
    for (let i = 0; i < numberOfJokers; i++) {
      allCards.push({ type: 'Joker', number: 'Joker' });
    }
    return allCards;
  }
}

export function setHand(players, player, card) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);
  let pl = goodPlayers.find((play) => play.name === player.name);
  let index = goodPlayers.indexOf(pl);
  if (card.type !== 'Joker') {
    goodPlayers[index] = { name: player.name, hand: [...player.hand, card] };
  }

  return goodPlayers;
}

export function setBusCard(busCards, card) {
  const string = JSON.stringify(busCards);
  const goodCards = JSON.parse(string);

  let car = goodCards.find((card) => card === 0);
  let index = goodCards.indexOf(car);
  goodCards[index] = card;
  return goodCards;
}

export function selectPlayersByCard(players, card) {
  let playersAffected = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players[i].hand.length; j++) {
      if (players[i].hand[j].number === card.number) {
        playersAffected.push(players[i]);
      }
    }
  }
  return playersAffected;
}

export function removeFromHand(players, player, card) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);
  let index = 0;
  for (let i = 0; i < goodPlayers.length; i++) {
    if (goodPlayers[i].name === player.name) {
      index = i;
    }
  }

  var cards = goodPlayers[index].hand;
  const cardRemoved = goodPlayers[index].hand.find(
    (handCard) => handCard.number === card.number
  );

  const newCards = cards.filter((c) => c !== cardRemoved);

  goodPlayers[index] = { name: player.name, hand: [...newCards] };

  return goodPlayers;
}

export function clearHand(players, player) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);
  let index = 0;
  for (let i = 0; i < goodPlayers.length; i++) {
    if (goodPlayers[i].name === player.name) {
      index = i;
    }
  }

  goodPlayers[index] = { name: player.name, hand: [] };

  return goodPlayers;
}

export const allCards = [
  { type: '♥', color: 'red', number: 'A' },
  { type: '♥', color: 'red', number: 2 },
  { type: '♥', color: 'red', number: 3 },
  { type: '♥', color: 'red', number: 4 },
  { type: '♥', color: 'red', number: 5 },
  { type: '♥', color: 'red', number: 6 },
  { type: '♥', color: 'red', number: 7 },
  { type: '♥', color: 'red', number: 8 },
  { type: '♥', color: 'red', number: 9 },
  { type: '♥', color: 'red', number: 10 },
  { type: '♥', color: 'red', number: 'J' },
  { type: '♥', color: 'red', number: 'Q' },
  { type: '♥', color: 'red', number: 'K' },
  { type: '♦', color: 'red', number: 'A' },
  { type: '♦', color: 'red', number: 2 },
  { type: '♦', color: 'red', number: 3 },
  { type: '♦', color: 'red', number: 4 },
  { type: '♦', color: 'red', number: 5 },
  { type: '♦', color: 'red', number: 6 },
  { type: '♦', color: 'red', number: 7 },
  { type: '♦', color: 'red', number: 8 },
  { type: '♦', color: 'red', number: 9 },
  { type: '♦', color: 'red', number: 10 },
  { type: '♦', color: 'red', number: 'J' },
  { type: '♦', color: 'red', number: 'Q' },
  { type: '♦', color: 'red', number: 'K' },
  { type: '♣', color: 'black', number: 'A' },
  { type: '♣', color: 'black', number: 2 },
  { type: '♣', color: 'black', number: 3 },
  { type: '♣', color: 'black', number: 4 },
  { type: '♣', color: 'black', number: 5 },
  { type: '♣', color: 'black', number: 6 },
  { type: '♣', color: 'black', number: 7 },
  { type: '♣', color: 'black', number: 8 },
  { type: '♣', color: 'black', number: 9 },
  { type: '♣', color: 'black', number: 10 },
  { type: '♣', color: 'black', number: 'J' },
  { type: '♣', color: 'black', number: 'Q' },
  { type: '♣', color: 'black', number: 'K' },
  { type: '♠', color: 'black', number: 'A' },
  { type: '♠', color: 'black', number: 2 },
  { type: '♠', color: 'black', number: 3 },
  { type: '♠', color: 'black', number: 4 },
  { type: '♠', color: 'black', number: 5 },
  { type: '♠', color: 'black', number: 6 },
  { type: '♠', color: 'black', number: 7 },
  { type: '♠', color: 'black', number: 8 },
  { type: '♠', color: 'black', number: 9 },
  { type: '♠', color: 'black', number: 10 },
  { type: '♠', color: 'black', number: 'J' },
  { type: '♠', color: 'black', number: 'Q' },
  { type: '♠', color: 'black', number: 'K' },
];
