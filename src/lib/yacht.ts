export enum Category {
  ONES = 'ones',
  TWOS = 'twos',
  THREES = 'threes',
  FOURS = 'fours',
  FIVES = 'fives',
  SIXES = 'sixes',
  CHOICE = 'choice',
  FULL_HOUSE = 'full_house',
  FOUR_OF_A_KIND = 'four_of_a_kind',
  SMALL_STRAIGHT = 'small_straight',
  LARGE_STRAIGHT = 'large_straight',
  YACHT = 'yacht',
}

export function calculateScoreForCategory(dices: number[], category: Category): number {
  const count = (n: number) => n * dices.filter(x => x === n).length;
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const containsAny = (xss: number[][]) => xss.some(xs => xs.every(x => dices.includes(x)));

  const countMap = new Map<number, number>();
  for (const x of dices) {
    const prev = countMap.get(x) ?? 0;
    countMap.set(x, prev + 1);
  }

  switch (category) {
    case Category.ONES: {
      return count(1);
    }
    case Category.TWOS: {
      return count(2);
    }
    case Category.THREES: {
      return count(3);
    }
    case Category.FOURS: {
      return count(4);
    }
    case Category.FIVES: {
      return count(5);
    }
    case Category.SIXES: {
      return count(6);
    }
    case Category.CHOICE: {
      return sum(dices);
    }
    case Category.FULL_HOUSE: {
      return [...countMap.keys()].length === 2 && [...countMap.values()].every(x => x >= 2) ? sum(dices) : 0;
    }
    case Category.FOUR_OF_A_KIND: {
      return [...countMap.values()].some(x => x >= 4) ? sum(dices) : 0;
    }
    case Category.SMALL_STRAIGHT: {
      return containsAny([
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ]) ? 15 : 0;
    }
    case Category.LARGE_STRAIGHT: {
      return containsAny([
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
      ]) ? 30 : 0;
    }
    case Category.YACHT: {
      return [...countMap.keys()].length === 1 ? 50 : 0;
    }
  }
}