const Chance = require('chance');
const chance = new Chance();


module.exports = {
    generateUser : (usernameLength) => ({
      username: chance.string({length: usernameLength ?? 5, pool: 'abcde'}),
      password: "password123",
    }),
    generateMessage: (sender_username, receiver_username, messageLenght) => ({
      sender_username,
      receiver_username,
      message: chance.string({length: messageLenght ?? 25, pool: 'abcde' } ),
      created_at: Date.now()
    })
}
