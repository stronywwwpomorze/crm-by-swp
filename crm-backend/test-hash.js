const bcrypt = require('bcrypt');

const plainPassword = 'test123';
const hashFromDB = '$2b$10$AKa8LUtBtI1cg8VV6xqzTu/hKLHoKthdKzG0Lf9e6aNFPx8/kzKx6';

bcrypt.compare(plainPassword, hashFromDB)
  .then(match => {
    console.log('Czy hasło pasuje?', match);
  })
  .catch(err => {
    console.error('Błąd:', err);
  });
