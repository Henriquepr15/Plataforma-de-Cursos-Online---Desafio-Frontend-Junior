import React, { useState, useEffect } from "react";
import "./coursestyle.css";
interface CourseCardProps {
  backgroundImage?: string;
  duration: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  onRegister: () => void;
  isRegistered: boolean;
  ratings: { [username: string]: number };
  onRate: (rating: number) => void;
  currentUser: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
  duration,
  title,
  instructor,
  description,
  category,
  onRegister,
  isRegistered,
  ratings,
  onRate,
  currentUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(
    currentUser && ratings[currentUser] ? ratings[currentUser] : null
  );

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".course-card.expanded")) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const averageRating =
    Object.values(ratings).reduce((sum, rating) => sum + rating, 0) /
    (Object.keys(ratings).length || 1);

  return (
    <div
      className={`course-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
      style={{ cursor: "pointer" }}
    >
      <h2
        className={`course-title ${category.toLowerCase().replace(/\s/g, "-")}`}
      >
        {title}
      </h2>
      <p>
        <strong>Instrutor:</strong> {instructor}
      </p>
      <p>
        <strong>Categoria:</strong> {category}
      </p>
      <p>
        <strong>Duração:</strong> {duration}
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
          {currentUser ? (
            <div className="rating-section">
              <p>
                Avalie este curso:
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${userRating === star ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserRating(star);
                      onRate(star);
                    }}
                  >
                    ★
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <p className="login-prompt">Faça login para avaliar este curso!</p>
          )}
          {!isRegistered ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRegister();
              }}
              className="register-btn"
            >
              Cadastrar no Curso
            </button>
          ) : (
            <p className="success-message">Você está cadastrado neste curso!</p>
          )}
        </>
      )}
    </div>
  );
};

export default CourseCard;
