import React, { useState } from "react";
import CourseCard from "./CourseCard";

const CoursesList = ({ courses }) => {
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  return (
    <div className="courses-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          instructor={course.instructor}
          category={course.category}
          averageRating={course.averageRating}
          description={course.description}
          isExpanded={expandedCourseId === course.id}
          onToggleExpand={() =>
            setExpandedCourseId(
              expandedCourseId === course.id ? null : course.id
            )
          }
        />
      ))}
    </div>
  );
};

export default CoursesList;
