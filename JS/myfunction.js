/** Generates a random alphanumeric string
 *
 *
 * @param {number} stringLenght string lenght (default 10)
 * @returns {string | false} returns alphanumeric string (false in error)
 */
function getAlphaNumString(stringLenght = 10) {
  stringLenght = parseInt(stringLenght);
  let string = "";

  if (isNaN(stringLenght) || stringLenght <= 0) {
    console.error("param must be a number bigger than zero");
    return false;
  }

  for (i = 0; i < stringLenght; i++) {
    string += `${Math.random().toString(36).slice(2, 3)}`;
  }

  return string;
}

/** Generates a random number between min and max (included)
 *
 *
 * @param {number} max maximum number (default 10)
 * @param {number} min minimum number (default 1)
 * @returns {number | false} returns a random number
 */
function getRandomNumber(max = 10, min = 1) {
  min = parseInt(min);
  max = parseInt(max);

  if (isNaN(min) || isNaN(max) || max < min) {
    console.error("params must be numbers and max must be equal or bigger than min");
    return false;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generates a random letter
 *
 *
 * @returns {string} returns a random letter from a to z
 */
function getRandomLetter() {
  return getRandomNumber(35, 10).toString(36);
}

/** Check if number is Even
 *
 *
 * @param {number} number number to check
 * @returns {boolean} returns true if number is even
 */
function isEven(number) {
  number = parseInt(number);

  if (isNaN(number)) {
    console.error("param must be a number");
    return NaN;
  }

  return number % 2 == 0;
}

/** Check if number is Odd
 *
 *
 * @param {number} number number to check
 * @returns {boolean} returns true if number is odd
 */
function isOdd(number) {
  number = parseInt(number);

  if (isNaN(number)) {
    console.error("param must be a number");
    return NaN;
  }

  return !(number % 2 == 0);
}

/** Get the max value in array from start index
 *
 * @param {Array} myArray array to exam
 * @param {number} start start index (default 0)
 * @returns {number | string} returns the max value
 */
function getMax(myArray, start = 0) {
  let bigger;
  let stringCheck = false;

  for (let i = start; i < myArray.length; i++) {
    myValue = myArray[i];
    if (typeof myValue == "string") stringCheck = true;
    if (i == 0 || myValue >= bigger) bigger = myValue;
  }

  if (stringCheck == true) console.warn("getMax found strings inside param. It returned the last alphabetic value");
  return bigger;
}

/** Get the min value in array from start index
 *
 * @param {Array} myArray array to exam
 * @param {number} start start index (default 0)
 * @returns {number | string} returns the max value
 */
function getMin(myArray, start = 0) {
  let smaller;
  let stringCheck = false;

  for (let i = start; i < myArray.length; i++) {
    myValue = myArray[i];
    if (typeof myValue == "string") stringCheck = true;
    if (i == 0 || myValue <= smaller) smaller = myValue;
  }

  if (stringCheck == true) console.warn("getMin found strings inside param. It returned the first alphabetic value");
  return smaller;
}

/** Get the sorted array
 *
 * @param {Array} myArray array to sort
 * @returns {Array} returns the sorted array
 */
function mySort(myArray) {
  const newArray = [];

  while (myArray.length > 0) {
    newArray.unshift(getMax(myArray));
    myArray.splice(getMaxIndex(myArray), 1);
  }

  return newArray;
}

/** Get the index of max value in array
 *
 * @param {Array} myArray array to exam
 * @param {number} start start index (default 0)
 * @returns {number} returns the index of max value
 */
function getMaxIndex(myArray, start = 0) {
  let bigger;
  let biggerIndex;

  for (let i = start; i < myArray.length; i++) {
    myValue = myArray[i];
    if (i == 0 || myValue >= bigger) {
      bigger = myValue;
      biggerIndex = i;
    }
  }

  return biggerIndex;
}

/** Get the index of min value in array
 *
 * @param {Array} myArray array to exam
 * @param {number} start start index (default 0)
 * @returns {number} returns the index of min value
 */
function getMinIndex(myArray, start = 0) {
  let smaller;
  let smallerIndex;

  for (let i = start; i < myArray.length; i++) {
    myValue = myArray[i];
    if (i == 0 || myValue <= smaller) {
      smaller = myValue;
      smallerIndex = i;
    }
  }

  return smallerIndex;
}

/** ParseInt an array
 *
 * @param {Array} myArray array to parse
 * @returns {Array} returns a parsed array
 */
function parseIntArray(myArray) {
  const newArray = [];
  let stringCheck = false;

  for (let i = 0; i < myArray.length; i++) {
    if (typeof myArray[i] == "string") stringCheck = true;
    newArray.push(parseInt(myArray[i]));
  }

  if (stringCheck == true) console.warn("parseIntArray found strings inside param. Returned array contains one or mor NaN");
  return newArray;
}

/** Write a text with a delay in the innerHTML of an elemnt
 *
 * @param {String} text text to write
 * @param {Element} element where to write the text
 * @param {Number} delay milliseconds of delay
 */
function writingDelay(text, element, delay) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(function () {
      element.innerHTML += text[i];
    }, i * delay);
  }
}

/** Takes an array one dim or an object's array and returns the html string
 *
 * @param {array} objectArray array to transform in html table
 * @returns {string} returns html of the table
 */
function objectToTable(objectArray) {
  let html = ``;
  const properties = [];

  for (const object of objectArray) {
    if (typeof object == "object") {
      for (const prop in object) {
        if (!properties.includes(prop)) properties.push(prop);
      }
    }
  }

  let isNotObject = properties.length == 0;

  html += `
    <table class="table">
        <thead>
            <tr>
    `;

  if (isNotObject) {
    html += `<th scope="col">List</th></tr></thead><tbody>`;
    objectArray.forEach((element) => {
      html += `<tr><td>${element}</td></tr>`;
    });
  } else {
    properties.forEach((property) => {
      html += `
        <th scope="col">${property}</th>
        `;
    });
    html += `</tr></thead><tbody>`;
    objectArray.forEach((element) => {
      html += `<tr>`;
      properties.forEach((property) => {
        if (element[property]) {
          html += `<td>${element[property]}</td>`;
        } else {
          html += `<td></td>`;
        }
      });
      html += `</tr>`;
    });
  }

  html += `</tbody></table>`;

  return html;
}
