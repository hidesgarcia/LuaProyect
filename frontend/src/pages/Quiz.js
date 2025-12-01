import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import '../styles/Quiz.css';

const QUIZ_QUERY = gql`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      questions {
        id
        text
        options
      }
      pointsReward
      passingScore
    }
  }
`;

const SUBMIT_QUIZ_MUTATION = gql`
  mutation SubmitQuizAnswer($quizId: ID!, $answers: [Int!]!) {
    submitQuizAnswer(quizId: $quizId, answers: $answers) {
      score
      pointsEarned
      completedAt
    }
  }
`;

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUIZ_QUERY, { variables: { id } });
  const [submitQuiz, { loading: submitting }] = useMutation(SUBMIT_QUIZ_MUTATION);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const quiz = data?.quiz;

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerArray = quiz.questions.map((_, idx) => answers[idx] || -1);
    
    try {
      const { data: resultData } = await submitQuiz({
        variables: { quizId: id, answers: answerArray }
      });
      setResult(resultData.submitQuizAnswer);
    } catch (err) {
      console.error('Quiz submission failed:', err);
    }
  };

  if (result) {
    return (
      <div className="quiz-result">
        <h1>Quiz Complete!</h1>
        <div className="result-stats">
          <div className="stat">
            <span className="label">Score</span>
            <span className="value">{result.score.toFixed(1)}%</span>
          </div>
          <div className="stat">
            <span className="label">Points Earned</span>
            <span className="value">{result.pointsEarned}</span>
          </div>
        </div>
        <a href="/courses" className="btn btn-primary">Back to Courses</a>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>{quiz?.title}</h1>
      <p className="quiz-info">Points: {quiz?.pointsReward} | Passing Score: {quiz?.passingScore}%</p>

      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz?.questions?.map((question, qIdx) => (
          <div key={question.id} className="question-block">
            <h3>{qIdx + 1}. {question.text}</h3>
            <div className="options">
              {question.options.map((option, oIdx) => (
                <label key={oIdx} className="option">
                  <input
                    type="radio"
                    name={`question-${qIdx}`}
                    value={oIdx}
                    onChange={() => handleAnswerSelect(qIdx, oIdx)}
                    checked={answers[qIdx] === oIdx}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </form>
    </div>
  );
}
