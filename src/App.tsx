import React, { useState, useEffect } from "react";
import CourseCard from "./components/CourseCard";
import LoginForm from "./components/LoginForm";
import "./App.css";

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  category: string;
  duration: string;
}
interface User {
  username: string;
  password: string;
  enrolledCourses: number[];
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [ratings, setRatings] = useState<{
    [courseId: number]: { [username: string]: number };
  }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedInstructor, setSelectedInstructor] = useState<string>("Todos");
  const [showOnlyEnrolled, setShowOnlyEnrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    const targetDate = new Date("2024-12-08T02:17:35"); // Alterando a data para 8 de dezembro de 2024
    const updateCountdown = () => {
      const currentTime = new Date();
      const difference = targetDate.getTime() - currentTime.getTime();
      setTimeLeft(Math.max(0, difference));
    };
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const courses: Course[] = [
    {
      id: 1,
      title: "Introdução ao Arduino",
      instructor: "Alan Turing",
      category: "Eletrônica",
      description:
        "Aprenda os fundamentos do Arduino e como utilizá-lo para criar projetos de eletrônica e automação. Este curso cobre os princípios básicos, desde a programação inicial até o controle de sensores e atuadores. Inclui projetos práticos como um sistema de alarme simples e um medidor de temperatura.",
      duration: "15 horas",
    },
    {
      id: 2,
      title: "Microcontroladores na Prática",
      instructor: "Katherine Bouman",
      category: "Eletrônica",
      description:
        "Descubra como trabalhar com microcontroladores e aplicá-los em projetos avançados de eletrônica. Este curso abrange desde conceitos básicos de arquitetura até o desenvolvimento de sistemas embarcados usando ESP32 e PIC. Inclui projetos como um sistema de monitoramento de temperatura e controle de motores.",
      duration: "20 horas",
    },
    {
      id: 3,
      title: "Árvores de Decisão em Machine Learning",
      instructor: "Carl Sagan",
      category: "Inteligência Artificial",
      description:
        "Este curso apresenta os fundamentos das árvores de decisão e como aplicá-las em problemas de classificação e regressão. Aprenda a usar bibliotecas como scikit-learn para implementar modelos de machine learning e entender os critérios de divisão, como Gini e Entropia. Inclui projetos práticos como classificação de espécies de plantas e análise de risco de crédito.",
      duration: "18 horas",
    },
    {
      id: 4,
      title: "Python Avançado para Análise de Dados",
      instructor: "Ada Lovelace",
      category: "Ciência de Dados",
      description:
        "Aprofunde-se em Python e aprenda técnicas avançadas para análise e visualização de dados. Este curso cobre bibliotecas como pandas, NumPy e Seaborn, além de práticas de limpeza e manipulação de grandes conjuntos de dados. Projetos incluem análise de dados meteorológicos e criação de dashboards interativos.",
      duration: "22 horas",
    },
    {
      id: 5,
      title: "Impressão 3D para Protótipos",
      instructor: "Elon Musk",
      category: "Eletrônica",
      description:
        "Domine a tecnologia de impressão 3D para criar protótipos funcionais. Aprenda a modelar em 3D usando Fusion 360, configurar impressoras 3D e otimizar a qualidade das impressões. Inclui projetos como a criação de peças para robótica e protótipos de dispositivos eletrônicos.",
      duration: "25 horas",
    },
    {
      id: 6,
      title: "React Avançado: Hooks e Context API",
      instructor: "Katherine Bouman",
      category: "Front End",
      description:
        "Aprimore suas habilidades em React aprendendo sobre Hooks, Context API e melhores práticas para desenvolvimento de aplicações SPA. Inclui a criação de projetos avançados como um sistema de gerenciamento de tarefas e uma loja virtual com carrinho de compras.",
      duration: "20 horas",
    },
    {
      id: 7,
      title: "Segurança da Informação na Prática",
      instructor: "Alan Turing",
      category: "Segurança",
      description:
        "Aprenda os fundamentos de segurança cibernética e como proteger sistemas e redes contra ameaças. Este curso aborda criptografia, análise de vulnerabilidades e estratégias de mitigação de ataques. Inclui exercícios práticos como simulação de ataques e configuração de firewalls.",
      duration: "18 horas",
    },
    {
      id: 8,
      title: "Introdução à Eletrônica Digital",
      instructor: "Ada Lovelace",
      category: "Eletrônica",
      description:
        "Explore os princípios da eletrônica digital e como projetar circuitos lógicos. Este curso inclui tópicos como portas lógicas, flip-flops e microprocessadores, além de projetos práticos como a construção de contadores e displays digitais.",
      duration: "16 horas",
    },
    {
      id: 9,
      title: "Design de Interfaces Avançado",
      instructor: "Carl Sagan",
      category: "Front End",
      description:
        "Descubra como criar interfaces elegantes e funcionais para aplicativos web e móveis. Este curso cobre princípios avançados de UX/UI, uso de Figma e integração de designs com React. Inclui projetos práticos como design de painéis administrativos e aplicativos para dispositivos móveis.",
      duration: "24 horas",
    },
    {
      id: 10,
      title: "Automação com Node-RED e IoT",
      instructor: "Elon Musk",
      category: "Eletrônica",
      description:
        "Entenda como integrar dispositivos IoT e criar fluxos de automação usando Node-RED. Este curso abrange sensores, atuadores e APIs, além de projetos como automação residencial e monitoramento ambiental.",
      duration: "20 horas",
    },
    {
      id: 11,
      title: "Machine Learning para Iniciantes",
      instructor: "Alan Turing",
      category: "Inteligência Artificial",
      description:
        "Uma introdução prática ao machine learning usando Python e scikit-learn. Aprenda sobre regressão linear, classificação e clustering, com projetos como previsão de preços e agrupamento de dados demográficos.",
      duration: "15 horas",
    },
    {
      id: 12,
      title: "Sistemas Embarcados com ESP32",
      instructor: "Katherine Bouman",
      category: "Eletrônica",
      description:
        "Aprenda a programar e integrar sistemas embarcados usando o microcontrolador ESP32. Este curso aborda desde configurações básicas até comunicação Wi-Fi e Bluetooth. Inclui projetos como automação de dispositivos e monitoramento remoto.",
      duration: "18 horas",
    },
    {
      id: 13,
      title: "Deep Learning Aplicado",
      instructor: "Carl Sagan",
      category: "Inteligência Artificial",
      description:
        "Explore as redes neurais profundas e como usá-las em aplicações práticas. Este curso aborda TensorFlow e Keras, com projetos como reconhecimento de imagens e geração de texto.",
      duration: "25 horas",
    },
    {
      id: 14,
      title: "Análise de Dados com Python e Power BI",
      instructor: "Ada Lovelace",
      category: "Ciência de Dados",
      description:
        "Combine o poder de Python e Power BI para análise de dados. Aprenda a manipular dados em Python e criar dashboards interativos no Power BI. Projetos incluem análise de dados financeiros e de mercado.",
      duration: "22 horas",
    },
    {
      id: 15,
      title: "Fundamentos de IA Generativa",
      instructor: "Elon Musk",
      category: "Inteligência Artificial",
      description:
        "Compreenda os conceitos por trás de IA Generativa e explore suas aplicações. Este curso inclui GANs, modelos de linguagem e projetos práticos como geração de imagens e texto.",
      duration: "20 horas",
    },
  ];

  const categories: string[] = [
    "Todas",
    ...new Set(courses.map((course) => course.category)),
  ];

  const instructors: string[] = [
    "Todos",
    ...new Set(courses.map((course) => course.instructor)),
  ];

  const filteredCourses = (
    showOnlyEnrolled && currentUser
      ? courses.filter((course) =>
          currentUser.enrolledCourses.includes(course.id)
        )
      : courses
  ).filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || course.category === selectedCategory;
    const matchesInstructor =
      selectedInstructor === "Todos" ||
      course.instructor === selectedInstructor;
    return matchesSearch && matchesCategory && matchesInstructor;
  });

  const handleRegister = (courseId: number): void => {
    if (!currentUser) {
      alert("Faça login para se cadastrar em um curso!");
      return;
    }

    if (currentUser.enrolledCourses.includes(courseId)) {
      alert("Você já está inscrito neste curso!");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.username === currentUser.username
        ? { ...user, enrolledCourses: [...user.enrolledCourses, courseId] }
        : user
    );

    setUsers(updatedUsers);

    const updatedCurrentUser = updatedUsers.find(
      (user) => user.username === currentUser.username
    );
    setCurrentUser(updatedCurrentUser || null);

    alert("Você se cadastrou no curso com sucesso!");
  };

  return (
    <div className="App">
      {/* Botão de Login */}
      <button onClick={() => setShowLogin(true)} className="login-btn">
        {currentUser ? `Olá, ${currentUser.username}` : "Login / Cadastro"}
      </button>

      {/* Timer Black Friday */}
      <div className="black-friday-bar">
        <div className="black-friday-text">
          <strong>
            <span className="yellow-text">BLACK</span>{" "}
            <span className="green-text">FRIDAY</span>
          </strong>
        </div>
        <div className="countdown">
          <span>{days < 10 ? `0${days}` : days} :</span>
          <span>{hours < 10 ? `0${hours}` : hours} :</span>
          <span>{minutes < 10 ? `0${minutes}` : minutes} :</span>
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          <div className="labels">
            <span>DIAS</span> <span>HORAS</span> <span>MIN</span>{" "}
            <span>SEG</span>
          </div>
        </div>
      </div>

      {/* Modal de Login */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <LoginForm
              onRegister={(username: string, password: string) => {
                if (users.some((user) => user.username === username)) {
                  alert("Usuário já existe!");
                  return;
                }

                const newUser: User = {
                  username,
                  password,
                  enrolledCourses: [],
                };

                setUsers([...users, newUser]);
                setCurrentUser(newUser);
                alert("Usuário registrado com sucesso!");
                setShowLogin(false);
              }}
              onLogin={(username: string, password: string) => {
                const user = users.find(
                  (u) => u.username === username && u.password === password
                );
                if (user) {
                  setCurrentUser(user);
                  alert("Login realizado com sucesso!");
                  setShowLogin(false);
                } else {
                  alert("Usuário ou senha incorretos!");
                }
              }}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}

      {/* Barra de filtros */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar cursos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filters">
        <label>
          Categoria:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Instrutor:
          <select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            {instructors.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
        </label>
      </div>
      {currentUser && (
        <div className="button-container">
          <button
            className="filter-btn"
            onClick={() => setShowOnlyEnrolled(!showOnlyEnrolled)}
          >
            {showOnlyEnrolled
              ? "Mostrar Todos os Cursos"
              : "Mostrar Cursos Inscritos"}
          </button>
        </div>
      )}

      {/* Lista de Cursos */}
      <h1>{showOnlyEnrolled ? "Cursos Inscritos" : "Lista de Cursos"}</h1>
      <div className="course-list">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onRegister={() => handleRegister(course.id)}
            isRegistered={
              currentUser?.enrolledCourses.includes(course.id) || false
            }
            duration={course.duration}
            /*backgroundImage={course.backgroundImage}*/
            ratings={ratings[course.id] || {}}
            onRate={(rating: number) =>
              setRatings((prev) => ({
                ...prev,
                [course.id]: {
                  ...prev[course.id],
                  [currentUser?.username || ""]: rating,
                },
              }))
            }
            currentUser={currentUser?.username || null}
          />
        ))}
      </div>

      {/* Seção de Incentivo (sempre visível) */}
      <div className="course-incentive">
        <h2>De todas as possibilidades, escolha o seu futuro agora!</h2>
        <p>
          Invista na sua educação com nossos cursos e descubra como transformar
          a sua carreira. Aprenda habilidades que estão em alta no mercado,
          desde Desenvolvimento Web até Inteligência Artificial, e impulsione
          suas oportunidades profissionais.
        </p>
        <p>
          <strong>Por que escolher nossos cursos?</strong>
        </p>
        <div className="incentive-cards">
          <div className="incentive-card">
            <span>✅</span>
            <p>
              Ganhe a chance de aumentar seu salário para acima de R$ 6.000 por
              mês
            </p>
          </div>
          <div className="incentive-card">
            <span>✅</span>
            <p>Desenvolva habilidades práticas com projetos do mundo real</p>
          </div>
          <div className="incentive-card">
            <span>✅</span>
            <p>
              Seja orientado por instrutores experientes e reconhecidos no
              mercado
            </p>
          </div>
          <div className="incentive-card">
            <span>✅</span>
            <p>
              Obtenha um certificado valorizado para destacar seu currículo em
              processos seletivos
            </p>
          </div>
        </div>
        <p>
          Não espere mais! Aproveite os descontos da{" "}
          <strong>Black Friday</strong> e transforme o seu futuro com a educação
          certa. Comece hoje mesmo!
        </p>
      </div>
    </div>
  );
};
export default App;
