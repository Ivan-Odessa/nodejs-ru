const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const {
  myName: myOtherName,
  myFriendsName,
  myGreatHobbies,
} = require('./export-and-import');
const greeting = require('./single-export');

// Imports from multiple-exports
console.log(myName);
console.log(myHobbies);
console.log(myFavoriteNumber);

// mutates array in the multiple-exports modules!
myHobbies.push('climbing');

// Imports from single-export
console.log(greeting);
greeting(myName);

// Imports from export-and-import
console.log(myOtherName);
console.log(myFriendsName);
console.log(myGreatHobbies);
