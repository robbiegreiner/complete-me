import CompleteMe from "./scripts/Complete-Me.js";
import words from "../words.json";

const completeMe = new CompleteMe();

let suggestedWords = [];

completeMe.populate(words);

$('button').on('click', suggest)

function suggest() {
  suggestedWords = [5]
  for (var i = 0; i < 10; i++) {
    $('ul').append("<li>" + suggestedWords[i] + "</li>");
}
