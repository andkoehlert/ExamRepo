// myTest.jsx

import { Selector } from 'testcafe';

fixture('App Test').page('https://jenkins.andreaskoehlert.dk/'); // Update the URL as needed

test('Should display initial health values', async (t) => {
  // Replace these selectors with the actual selectors for your components
  const playerHealthElement = Selector('.border-green-500 p');
  const enemyHealthElement = Selector('.enemy-health');

  // Get the text content of the health elements
  const playerHealthText = await playerHealthElement.innerText;
  const enemyHealthText = await enemyHealthElement.innerText;

  // Assert that the initial health values are displayed correctly
  await t
    .expect(playerHealthText).contains('Health: 40')
    .expect(enemyHealthText).contains('Health: 30');
});
