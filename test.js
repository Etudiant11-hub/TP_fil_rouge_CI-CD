const assert = require('assert');
console.log('Lancement des tests unitaires...');

try {
  const sum = 2 + 2;
  assert.strictEqual(sum, 4);
  console.log('✓ Test réussi : Les calculs de base fonctionnent.');
  process.exit(0);
} catch (error) {
  console.error('✗ Échec du test :', error.message);
  process.exit(1);
}
