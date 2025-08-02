const bcrypt = require('bcrypt');

const plainPassword = 'test123';

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Wklej ten hash do bazy:', hash);
});
