// myTest.jsx

import { Selector } from 'testcafe';

fixture('App Test').page('https://jenkins.andreaskoehlert.dk/'); // Update the URL as needed

test('Should display initial health values', async (t) => {
// My selectors
  const playerHealthElement = Selector('.border-green-500 p'); // Update the selector
  const enemyHealthElement = Selector('.enemy-health');

  // Get the innertext
  const playerHealthText = await playerHealthElement.innerText;
  const enemyHealthText = await enemyHealthElement.innerText;

  // make an assertion
  await t
  .expect(playerHealthText).contains('Health: 30')
  .expect(enemyHealthText).contains('Health: 30');

});


test('Should display the correct title', async (t) => {
  const titleElement = Selector('.DandD');

  const titleText = await titleElement.innerText;

  await t.expect(titleText).eql('The Greatest D&D Game Of All time better than baldurs gate');
});

// Tried to make a test for dropping axe on enemy, but it doesn't work
/* test('Should display initial health values and reduce enemy health with Axe', async (t) => {
  const playerHealthElement = Selector('.border-green-500 p');
  const enemyHealthElement = Selector('.enemy-health');

  const playerHealthText = await playerHealthElement.innerText;
  const enemyHealthTextBefore = await enemyHealthElement.innerText;

  // Assert that the initial health values are displayed correctly
  await t
    .expect(playerHealthText).contains('Health: 30')
    .expect(enemyHealthTextBefore).contains('Health: 30');

PROBLEM IS HERE <----------------------------------------------

  // Drop the Axe on the enemy
  await t.dragToElement('.Axe', '.enemy');
>----------------------------------------------
  // Get the updated enemy health after dropping the Axe
  const enemyHealthTextAfter = await enemyHealthElement.innerText;

  // Convert the health values to numbers
  const enemyHealthBefore = parseInt(enemyHealthTextBefore.split(' ')[1], 10);
  const enemyHealthAfter = parseInt(enemyHealthTextAfter.split(' ')[1], 10);

  // Assert that the enemy's health is reduced within the expected range (8-15 damage from Axe)
  await t
    .expect(enemyHealthAfter).gte(15)  // Greater than or equal to 15
    .expect(enemyHealthAfter).lte(22); // Less than or equal to 22
}); */