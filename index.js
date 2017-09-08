const CompleteMe = require("./scripts/Complete-Me");
const words = require('fs').readFileSync("/usr/share/dict/words").toString().trim().split('\n')

const completeMe = new CompleteMe();

let suggestedWords = [];

completeMe.populate(words);

$('button').on('click', suggest)

function suggest() {
  suggestedWords = [5]
  for (var i = 0; i < 10; i++) {
    $('ul').append("<li>" + suggestedWords[i] + "</li>");
  }
}
