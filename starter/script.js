var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Arrays of characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt('Enter the length of the password (between 8 and 128 characters):'));

  if (isNaN(length) || length < 8 || length > 128) {
    alert('Please enter a valid number between 8 and 128.');
    return null;
  }

  var includeLower = confirm('Include lowercase characters?');
  var includeUpper = confirm('Include uppercase characters?');
  var includeNumeric = confirm('Include numeric characters?');
  var includeSpecial = confirm('Include special characters?');

  if (!includeLower && !includeUpper && !includeNumeric && !includeSpecial) {
    alert('At least one character type should be selected.');
    return null;
  }

  return {
    length: length,
    includeLower: includeLower,
    includeUpper: includeUpper,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    return ''; // Return an empty string if options are not valid
  }

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeLower) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeUpper) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  if (options.includeNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.includeSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  var remainingLength = options.length - guaranteedCharacters.length;

  for (var i = 0; i < remainingLength; i++) {
    var randomChar = getRandom(possibleCharacters);
    guaranteedCharacters.push(randomChar);
  }

  return guaranteedCharacters.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);