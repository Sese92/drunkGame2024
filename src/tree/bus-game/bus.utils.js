function numberOfTheCard(card) {
  let number = card.number;
  if (card.number === 'J') {
    number = 11;
  } else if (card.number === 'Q') {
    number = 12;
  } else if (card.number === 'K') {
    number = 13;
  } else if (card.number === 'A') {
    number = 14;
  }
  return number;
}

export function renderLeftButton(hand) {
  switch (hand.length) {
    case 0:
      return 'red';
    case 1:
      return 'up';
    case 2:
      return 'between';
    case 3:
      return 'same';
  }
}

export function renderRightButton(hand) {
  switch (hand.length) {
    case 0:
      return 'black';
    case 1:
      return 'down';
    case 2:
      return 'outside';
    case 3:
      return 'different';
  }
}

export function leftClicked(hand, card) {
  if (card.type === 'Joker') {
    return false;
  }
  const cardNumber = numberOfTheCard(card);
  let firstCardNumber = 0;
  let secondCardNumber = 0;
  if (hand[0]) {
    firstCardNumber = numberOfTheCard(hand[0]);
  }
  if (hand[1]) {
    secondCardNumber = hand[1] && numberOfTheCard(hand[1]);
  }

  switch (hand.length) {
    case 0:
      if (card.color === 'red') {
        return true;
      } else {
        return false;
      }
    case 1:
      if (firstCardNumber < cardNumber) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (firstCardNumber < secondCardNumber) {
        if (firstCardNumber < cardNumber && cardNumber < secondCardNumber) {
          return true;
        } else {
          return false;
        }
      } else if (firstCardNumber > secondCardNumber) {
        if (firstCardNumber > cardNumber && cardNumber > secondCardNumber) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    case 3:
      if (hand.find((handCard) => handCard.type === card.type) !== undefined) {
        return true;
      } else {
        return false;
      }
  }
}

export function middleClicked(hand, card) {
  if (card.type === 'Joker') {
    return false;
  }
  const cardNumber = numberOfTheCard(card);
  let firstCardNumber = 0;
  let secondCardNumber = 0;
  if (hand[0]) {
    firstCardNumber = numberOfTheCard(hand[0]);
  }
  if (hand[1]) {
    secondCardNumber = hand[1] && numberOfTheCard(hand[1]);
  }
  switch (hand.length) {
    case 1:
      if (firstCardNumber === cardNumber) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (firstCardNumber === cardNumber || secondCardNumber === cardNumber) {
        return true;
      } else {
        return false;
      }
  }
}

export function rightClicked(hand, card) {
  if (card.type === 'Joker') {
    return false;
  }
  const cardNumber = numberOfTheCard(card);
  let firstCardNumber = 0;
  let secondCardNumber = 0;
  if (hand[0]) {
    firstCardNumber = numberOfTheCard(hand[0]);
  }
  if (hand[1]) {
    secondCardNumber = hand[1] && numberOfTheCard(hand[1]);
  }
  switch (hand.length) {
    case 0:
      if (card.color === 'black') {
        return true;
      } else {
        return false;
      }
    case 1:
      if (firstCardNumber > cardNumber) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (firstCardNumber < secondCardNumber) {
        if (cardNumber < firstCardNumber || secondCardNumber < cardNumber) {
          return true;
        } else {
          return false;
        }
      } else if (firstCardNumber > secondCardNumber) {
        if (cardNumber < secondCardNumber || firstCardNumber < cardNumber) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    case 3:
      if (hand.find((handCard) => handCard.type === card.type) === undefined) {
        return true;
      } else {
        return false;
      }
  }
}
