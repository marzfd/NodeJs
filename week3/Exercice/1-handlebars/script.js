
/**
 * 4. Fun with Handlebars
 *
 * Write a javascript function that simulates playing the game cards against humanity.
 * The code should choose a subject and a punchline at random,
 * then replace them in a sentence using handlebars.
 *
 * Hints:
 * - Check the handlebars npm page for examples and documentation
 */

import Handlebars from "handlebars";

const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon',
];

const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing',
];


function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]; // Get the element at the random index
}


function drawCard() {
  const cardData = {
                    subject: getRandomElement(subjects),
                    punchline: getRandomElement(punchlines)
                   };

  const card = `{{subject}} is great to {{punchline}}`;
  const compileCard = Handlebars.compile(card);
  const sentence = compileCard(cardData);
  console.log(sentence);
}

drawCard();