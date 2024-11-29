import React from "react";

const CourseCard = ({
  title,
  instructor,
  category,
  averageRating,
  description,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <div
      className={`course-card ${isExpanded ? "expanded" : ""}`}
      onClick={onToggleExpand}
      style={{ cursor: "pointer" }}
    >
      <h2>{title}</h2>
      <p>
        <strong>Instrutor:</strong> {instructor}
      </p>
      <p>
        <strong>Categoria:</strong> {category}
      </p>
      <p>
        <strong>Nota:</strong>{" "}
        <span className="stars">
          {"★".repeat(Math.round(averageRating)) +
            "☆".repeat(5 - Math.round(averageRating))}
        </span>{" "}
        ({averageRating.toFixed(1)}/5)
      </p>

      {isExpanded && (
        <>
          <p className="course-description">
            <strong>Descrição:</strong> {description}
          </p>
        </>
      )}
    </div>
  );
};

export default CourseCard;
