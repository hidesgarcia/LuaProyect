import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import '../styles/CourseDetail.css';

const COURSE_QUERY = gql`
  query Course($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
      instructor {
        username
      }
      lessons {
        id
        title
      }
      quizzes {
        id
        title
        pointsReward
      }
    }
  }
`;

const ENROLL_MUTATION = gql`
  mutation EnrollCourse($courseId: ID!) {
    enrollCourse(courseId: $courseId) {
      id
      title
    }
  }
`;

export default function CourseDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(COURSE_QUERY, { variables: { id } });
  const [enrollCourse, { loading: enrolling }] = useMutation(ENROLL_MUTATION);

  if (loading) return <div className="loading">Loading course...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const course = data?.course;

  const handleEnroll = async () => {
    try {
      await enrollCourse({ variables: { courseId: id } });
      alert('Enrolled successfully!');
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <h1>{course?.title}</h1>
        <p className="instructor">Instructor: {course?.instructor?.username}</p>
        <p className="level">Level: {course?.level}</p>
      </div>

      <div className="course-content">
        <div className="section">
          <h2>Description</h2>
          <p>{course?.description}</p>
        </div>

        <div className="section">
          <h2>Lessons ({course?.lessons?.length || 0})</h2>
          <ul className="lessons-list">
            {course?.lessons?.map(lesson => (
              <li key={lesson.id}>{lesson.title}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Quizzes ({course?.quizzes?.length || 0})</h2>
          <ul className="quizzes-list">
            {course?.quizzes?.map(quiz => (
              <li key={quiz.id}>
                {quiz.title} - <strong>{quiz.pointsReward} points</strong>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}>
          {enrolling ? 'Enrolling...' : 'Enroll in Course'}
        </button>
      </div>
    </div>
  );
}
