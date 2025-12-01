import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseCard.css';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.title}</h3>
        <span className="level-badge">{course.level}</span>
      </div>
      <p className="course-description">{course.description}</p>
      <p className="course-instructor">By: {course.instructor.username}</p>
      <p className="course-category">{course.category}</p>
      <Link to={`/course/${course.id}`} className="btn btn-primary">View Course</Link>
    </div>
  );
}
