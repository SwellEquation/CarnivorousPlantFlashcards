import { useState } from "react"
import "./App.css"

const cards = [
  {
    question: "What nutritious chemical do carnivorous plants get from their prey?",
    answer: "Nitrogen",
    color: "#F7E27D"
  },
  {
    question: "What is a carnivorous plants main source of energy?",
    answer: "Photosynthesis",
    color: "#BDE5A8"
  },
  {
    question: "What do temperate carnivorous plants such as American Pitchers and Flytraps do during the winter months?",
    answer: "Dormancy",
    color: "#F7E27D"
  },
  {
    question: "What is the purpose of the lid that is on American pitcher plants and Nepenthes pitchers?",
    answer: "Block rainwater",
    color: "#F5B7B1"
  },
  {
    question: "What do Flytrap seeds look like?",
    answer: "Black teardrops",
    color: "#BDE5A8"
  },
  {
    question: "Do Nepenthes pitchers produce their own carnivorous fluid?",
    answer: "Yes",
    color: "#BDE5A8"
  },
  {
    question: "Why did plants evolve to be carnivorous?",
    answer: "No nutrients in soil",
    color: "#F5B7B1"
  },
  {
    question: "Where does a Flytrap store all of its energy?",
    answer: "Rhizome",
    color: "#F7E27D"
  },
  {
    question: "Do all carnivorous pitcher plants produce their own fluid?",
    answer: "No",
    color: "#F7E27D"
  },
  {
    question: "What carnivorous plant ancestor did the Venus Flytrap evolve from?",
    answer: "Sundews",
    color: "#F5B7B1"
  }
]

function Flashcard({ card, flipped, onClick, index, total }) {
  return (
    <div
      className="flashcard"
      style={{ backgroundColor: card.color }}
      onClick={onClick}
    >
      <div className="card-number">
        {index + 1} / {total}
      </div>

      <div className="card-text">
        {flipped ? card.answer : card.question}
      </div>
    </div>
  )
}

function GuessInput({ guess, setGuess, handleSubmit, feedback }) {
  return (
    <div className="guess-container">

      <input
        type="text"
        placeholder="Enter your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="guess-input"
      />

      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>

      {feedback && (
        <p className={feedback === "correct" ? "correct" : "incorrect"}>
          {feedback === "correct" ? "Correct!" : "Incorrect"}
        </p>
      )}

    </div>
  )
}

function App() {

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const [guess, setGuess] = useState("")
  const [feedback, setFeedback] = useState("")

  const nextCard = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1)
      setFlipped(false)
      setGuess("")
      setFeedback("")
    }
  }

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1)
      setFlipped(false)
      setGuess("")
      setFeedback("")
    }
  }

  const flipCard = () => {
    setFlipped(!flipped)
  }

  /* CHECK ANSWER */
  const handleSubmit = () => {

    if (guess.trim().toLowerCase() === cards[index].answer.toLowerCase()) {
      setFeedback("correct")
      setFlipped(true)
    } else {
      setFeedback("incorrect")
    }

  }

  return (
    <div className="app">

      <div className="title">
        <h1>Carnivorous Plant Supremacy!</h1>
        <h3>How much do you know about carnivorous plants? Test your knowledge here!</h3>
        <p>Number of cards: {cards.length}</p>
      </div>

      <Flashcard
        card={cards[index]}
        flipped={flipped}
        onClick={flipCard}
        index={index}
        total={cards.length}
      />

      <GuessInput
        guess={guess}
        setGuess={setGuess}
        handleSubmit={handleSubmit}
        feedback={feedback}
      />

      <div className="arrow-container">

        <button
          className="arrow"
          onClick={prevCard}
          disabled={index === 0}
        >
          ←
        </button>

        <button
          className="arrow"
          onClick={nextCard}
          disabled={index === cards.length - 1}
        >
          →
        </button>

      </div>

    </div>
  )
}

export default App