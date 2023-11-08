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


/* test('Should display the correct title', async (t) => {
  // Define a selector for the title element
  const titleElement = Selector('.DandD');

  // Get the text content of the title element
  const titleText = await titleElement.innerText;

  // Assert that the title text is as expected (matching the actual case in your app)
  await t.expect(titleText).eql('The Greatest D&D Game Of All Time');
}); */