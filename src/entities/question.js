function Question({
  id, text, answerA, answerB, answerC, answerD, correctAnswer,
  finishedAt
}) {
  this.id = id;
  this.text = text;
  this.answerA = answerA;
  this.answerB = answerB;
  this.answerC = answerC;
  this.answerD = answerD;
  this.correctAnswer = correctAnswer;
  this.finishedAt = finishedAt;
}

export default Question;
