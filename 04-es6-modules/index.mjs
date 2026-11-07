import { season, tempeature } from './named-exports.mjs';
import { humidity, isRaining } from './inline-exports.mjs';
import getData from './default-export.mjs';
import DEFAULT_SERVER, {
  USERNAME,
  PASSWORD as MY_PASSWORD,
} from './mixed-exports.mjs';

console.log(season);
console.log(tempeature);

console.log(humidity);
console.log(isRaining);

getData('https://jsonplaceholder.typicode.com/posts/5')
  .then((post) => console.log(post))
  .catch((err) => console.error(err));

console.log(DEFAULT_SERVER);
console.log(USERNAME, MY_PASSWORD);
