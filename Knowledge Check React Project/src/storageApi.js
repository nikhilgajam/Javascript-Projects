const QuizDataConstant = 'QuizData'
const initialLocalStorageData = { highScore: 0 }
const initialSessionStorageData = {
  correctScore: 0,
  incorrectScore: 0,
}


/*
  * This is the API for Local And Session Storage.
  * It has functions to get and set the Quiz Data in Local Storage or Session Storage.
  * Data in localStorage doesn't expire while sessionStorage is cleared when the page session ends.
*/
const localStoreApi = {
  // These functions will return and set the Quiz Data in Local Storage or Session Storage.
  getQuizStorageData(storeInSession = false) {
    if (storeInSession) {
      const quizDataObj = sessionStorage.getItem(QuizDataConstant)
      return quizDataObj === null ? initialSessionStorageData : JSON.parse(quizDataObj)
    } else {
      const quizDataObj = localStorage.getItem(QuizDataConstant)
      return quizDataObj === null ? initialLocalStorageData : JSON.parse(quizDataObj)
    }
  },
  setQuizStorageData(quizDataObj, storeInSession = false) {
    const quizDataObjString = JSON.stringify(quizDataObj)

    if (storeInSession) {
      sessionStorage.setItem(QuizDataConstant, quizDataObjString)
    } else {
      localStorage.setItem(QuizDataConstant, quizDataObjString)
    }

    // Dispatch the event to notify the change in storage.
    window.dispatchEvent(new Event(this.getStorageEventConstant()))
  },

  // These functions will return and set the High Score in Local Storage.
  getHighScore() {
    const quizDataObj = this.getQuizStorageData()
    return quizDataObj.highScore
  },
  setHighScore(score) {
    const quizDataObj = this.getQuizStorageData()
    this.setQuizStorageData({ ...quizDataObj, highScore: parseInt(score) })
  },

  // These functions will return and set the Correct Score in Session Storage.
  getCorrectScore() {
    const quizDataObj = this.getQuizStorageData(true)
    return quizDataObj.correctScore
  },
  setCorrectScore(score) {
    const quizDataObj = this.getQuizStorageData(true)
    this.setQuizStorageData({ ...quizDataObj, correctScore: parseInt(score) }, true)
  },

  // These functions will return and set the Incorrect Score in Session Storage.
  getIncorrectScore() {
    const quizDataObj = this.getQuizStorageData(true)
    return quizDataObj.incorrectScore
  },
  setIncorrectScore(score) {
    const quizDataObj = this.getQuizStorageData(true)
    this.setQuizStorageData({ ...quizDataObj, incorrectScore: parseInt(score) }, true)
  },

  // This function will return the constant used for the Storage Event.
  getStorageEventConstant() {
    return QuizDataConstant
  }
}

export default localStoreApi;
