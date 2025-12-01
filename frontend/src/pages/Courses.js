import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

const COURSES_QUERY = gql`
  query Courses {
    courses {
      id
      title
      description
      category
      level
      instructor {
        username
      }
    }
  }
`;

export default function Courses() {
  const { loading, error, data } = useQuery(COURSES_QUERY);
  const [selectedCategory, setSelectedCategory] = React.useState('');

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const courses = data?.courses || [];
  const categories = [...new Set(courses.map(c => c.category))];
  
  const filteredCourses = selectedCategory 
    ? courses.filter(c => c.category === selectedCategory)
    : courses;

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      
      <div className="filter-section">
        <button 
          className={!selectedCategory ? 'active' : ''}
          onClick={() => setSelectedCategory('')}
        >
          All Courses
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
