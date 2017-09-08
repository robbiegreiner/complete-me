const CompleteMe = require("./scripts/Complete-Me");
const words = require('fs').readFileSync("/usr/share/dict/words").toString().trim().split('\n')

const completeMe = new CompleteMe();

completeMe.populate(words);

$('button').on('click', suggest)
$('ul').on('click', 'li', select)

function suggest() {
  $('li').remove();
  var suggestedWords = [];
  suggestedWords = completeMe.suggest($('input').val());
  console.log(suggestedWords);
  if (suggestedWords.length <= 10) {
    for (var i = 0; i < suggestedWords.length; i++) {
      $('ul').append("<li>" + suggestedWords[i] + "</li>");
    }
  } else if (suggestedWords.length > 10) {
    for (var j = 0; j < 10; j++) {
      $('ul').append("<li>" + suggestedWords[j] + "</li>");
    }
  }
}

function select() {
  completeMe.select(this.innerText);
  $('li').remove();
  $('input').val('')
}
