/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Tran Nguyen
 *  Created on: Jan 19, 2023
 */

// function to merge two arrays
function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const len: number = Math.min(arr1.length, arr2.length);
  const newArray: Array<number> = [];
  for (let i = 0; i < len; i += 1) {
    newArray.push(arr1[i]);
    newArray.push(arr2[i]);
  }
  if (arr1.length > len) {
    newArray.push(...arr1.slice(len));
  }
  if (arr2.length > len) {
    newArray.push(...arr2.slice(len));
  }
  return newArray;
}

// test function mergedArray

// const array1: Array<number> = [4, 5, 23, 18, 9, -5];
// const array2: Array<number> = [18, 74, 88, 3, 7, 44];

// const mergedArray: Array<number> = merge(array1, array2);
// console.log(mergedArray);

//---------------------------------------------------------
// const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
// const array2: Array<number> = [18, 74, 88, 3];

// const mergedArray: Array<number> = merge(array1, array2);
// console.log(mergedArray);

//---------------------------------------------------------
const array1: Array<number> = [18, 74, 88, 3];
const array2: Array<number> = [4, 5, 23, 18, 9, -5, 31];

const mergedArray: Array<number> = merge(array1, array2);
console.log(mergedArray);

// function to check the secret word
function checkWord(attempted_word: string, secret_word: string): string {
  const len: number = secret_word.length;
  let result: string = '';
  for (let i = 0; i < len; i += 1) {
    if (secret_word.includes(attempted_word[i]) && secret_word[i] === attempted_word[i])
      result += 'c';
    else if (secret_word.includes(attempted_word[i])) result += 'p';
    else result += 'a';
  }
  return result;
}

// test function checkWord
const attempts = ['rains', 'shout', 'scope', 'spoke'];

for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}

// declare type Candidate
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

// declare array of type Candidate
const candidates: Array<Candidate> = [
  {
    name: 'Edward Underwood',
    votes: [192, 147, 186, 114, 267],
    funding: 58182890,
  },
  {
    name: 'Rose Olson',
    votes: [48, 90, 12, 21, 13],
    funding: 78889263,
  },
  {
    name: 'Leonard Willis',
    votes: [206, 312, 121, 408, 382],
    funding: 36070689,
  },
  {
    name: 'Nathaniel Taylor',
    votes: [37, 21, 38, 39, 29],
    funding: 6317921937,
  },
];

// calculate the total votes of all candidates
const totalVotes: number = candidates.reduce(
  (total: number, candidate: Candidate) =>
    total + candidate.votes.reduce((accumulator: number, vote: number) => accumulator + vote),
  0
);

// using this format to add trailing zeros
const myFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
});

// calculate the total votes receive by each candidate, the percent of the total votes, and
// display the result

candidates.forEach((candidate: Candidate) => {
  const candidateVotes: number = candidate.votes.reduce(
    (total: number, vote: number) => total + vote
  );
  const candidatePercentageVote: number = parseFloat(
    ((candidateVotes / totalVotes) * 100).toFixed(2)
  );
  console.log(
    `${candidate.name} -- ${candidateVotes} votes -- ${myFormat.format(candidatePercentageVote)}%`
  );
});

// create and array to calculate the total votes by each precinct and initialize to zero
const totalVotesByPrecinct: Array<number> = new Array(candidates[0].votes.length).fill(0);

// calculate the votes for each precinct by each candidate
candidates.forEach((candidate: Candidate) => {
  candidate.votes.forEach((votes: number, i: number) => {
    totalVotesByPrecinct[i] += votes;
  });
});

// calculate the percentage of votes for each precinct by each candidate
candidates.forEach((candidate: Candidate) => {
  console.log(`\n\n${candidate.name}: `);
  candidate.votes.forEach((votes: number, i: number) => {
    const percentage = parseFloat(((votes / totalVotesByPrecinct[i]) * 100).toFixed(2));
    console.log(`  Precinct ${i + 1} -- ${myFormat.format(percentage)}% `);
  });
});

candidates.forEach((candidate: Candidate) => {
  const amountSpentPerVote: number = parseFloat(
    (
      candidate.funding / candidate.votes.reduce((total: number, votes: number) => total + votes)
    ).toFixed(2)
  );
  console.log(`${candidate.name} spent   $${myFormat.format(amountSpentPerVote)} per vote`);
});

// Part 3
console.log(`\n`);
const winner: Candidate | undefined = candidates.find(
  (candidate: Candidate) =>
    candidate.votes.reduce((total: number, votes: number) => total + votes) > totalVotes / 2
);
if (winner) {
  console.log(`${winner.name} is the winner.`);
} else {
  const maxVotesCandidates: Array<Candidate> = candidates
    .sort(
      (firstCandidate: Candidate, secondCandidate: Candidate) =>
        secondCandidate.votes.reduce((total: number, votes: number) => total + votes) -
        firstCandidate.votes.reduce((total: number, votes: number) => total + votes)
    )
    .slice(0, 2);
  if (maxVotesCandidates.length === 2) {
    console.log(
      `There will be a run-off between ${maxVotesCandidates[0].name} and ${maxVotesCandidates[1].name}`
    );
  }
}
