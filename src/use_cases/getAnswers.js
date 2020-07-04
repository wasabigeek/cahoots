const getAnswers = (game, questionId) => {
  const questionRef = game.collection('questions').doc(questionId);
  const answersQuery = game.collection('answers').where('question', '==', questionRef);
  return answersQuery
    .get()
    .then(querySnapshot => {
      let answersData = []
      querySnapshot.forEach(doc => answersData.push(Object.assign({id: doc.id}, doc.data())));
      return answersData;
    });
};

export default getAnswers;
