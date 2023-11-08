// myTest.jsx

import { Selector } from 'testcafe';

fixture('App Test').page('https://jenkins.andreaskoehlert.dk/'); // Update the URL as needed

test('Should display initial health values', async (t) => {
// My selectors
  const playerHealthElement = Selector('.border-green-500 p'); // Update the selector
  const enemyHealthElement = Selector('.enemy-health');
  const titleElement = Selector('h1.D&D');

  // Get the innertext
  const playerHealthText = await playerHealthElement.innerText;
  const enemyHealthText = await enemyHealthElement.innerText;
  const titleText = await titleElement.innerText;

  // make an assertion
  await t
  .expect(playerHealthText).contains('Health: 30')
  .expect(enemyHealthText).contains('Health: 30');
  await t.expect(titleText).eql('The Greatest D&D Game Of All time');

});
