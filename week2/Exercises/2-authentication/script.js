
/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

import fetch from 'node-fetch';
import base64 from 'base-64';

async function printBooks(username, password) {
  try {
    const response = await fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books', {
      headers: { Authorization: 'Basic' + base64.encode(`${username}:${password}`) },
    });
    const books = await response.json();
    console.log(books);
  }
  catch (error) {
    console.error(error);
  }
}

printBooks('admin', 'hvgX8KlVEa');