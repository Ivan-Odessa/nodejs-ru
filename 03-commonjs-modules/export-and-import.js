const { myName, myHobbies } = require('./multiple-exports');

const myFriendsName = 'Alice';

module.exports.myName = myName;
module.exports.myFriendsName = myFriendsName;

// Property names could be different from the variable names
module.exports.myGreatHobbies = myHobbies;
