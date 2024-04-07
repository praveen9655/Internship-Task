import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBriefcase, faChild, faBook, faChalkboardTeacher, faQuestionCircle, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import placeholderImage1 from "./image1.png";
import placeholderImage2 from "./image2.png";
import loadingAni from "./loading.svg";
import learnimg from "./learn.png";
import { MathJax, MathJaxContext} from "better-react-mathjax";

const DemoComponent = () => {


  const questions = [
    {
      question: "Which describes you best?",
      des: "This will help us personalize your experience.",
      choices: [
        { title: "Student or soon to be enrolled", icon: faUserGraduate },
        { title: "Professional pursuing a career", icon: faBriefcase },
        { title: "Parent of a school-age child", icon: faChild },
        { title: "Lifelong learner", icon: faBook },
        { title: "Teacher", icon: faChalkboardTeacher },
        { title: "Other", icon: faQuestionCircle }
      ]
    },
    {
      question: "Which are you most interested in?",
      des: "Choose just one. This will help us get you started (but won't limit your experience).",
      choices: [
        { title: "Learning specific skills to advance my career" },
        { title: "Exploring new topics I'm interested in" },
        { title: "Refreshing my math foundations" },
        { title: "Exercising my brain to stay sharp" },
        { title: "Something else" }
      ]
    },
    {
      tit: "You're in the right place.",
      text: "Brilliant gets you hands-on to help improve your professional skills and knowledge. You'll interact with concepts and solve fun problems in math, science, and computer science."
    },
     {
      question: "What is your math comfort level?",
      des: "Choose the highest level you feel confident in you can always adjust later.",
      choices: [
        { title: "<br/> Arithmetic <br/> Introductory",math:"\\(5\\times2/1=?\\)" },
        { title: "<br/> Basic Algebra <br/> Foundational",math:"\\(3x+5=4\\)" },
        { title: "<br/> Intermediate Algebra <br/> Intermediate",math:"\\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\)" },
        { title: "<br/> Calculus <br/> Advanced",math:"\\(\\int_{0}^{L}x^{2}dx\\)" }
      ]
    },
    {
      tit: "You're on your way!",
      text: "<p style='color: #ffc400; font-size: 44px;'>&#9733;&#9733;&#9733;&#9733;&#9733;</p><br/>'Through its engaging and well-structured courses, Brilliant has taught me mathematical concepts that I previously struggled to understand. I now feel confident approaching both technical job interviews and real world problem solving situations.'<br/> - Jacob S."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showLoading, setShowLoading] = useState(false); // State for loading screen visibility
  const [showLearningPaths, setShowLearningPaths] = useState(false); // State for learning paths visibility
  const totalQuestions = questions.length;

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    
    script.onload = () => {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['\\(', '\\)']],
            displayMath: [['$$', '$$']],
            processEscapes: true,
            processEnvironments: true,
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            TeX: {
              equationNumbers: { autoNumber: 'AMS' },
              extensions: ['AMSmath.js', 'AMSsymbols.js', 'autoload-all.js']
            }
          }
        });
  
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      } else {
        console.error('MathJax is not available');
      }
    };
  
    script.onerror = () => {
      console.error('Failed to load MathJax script');
    };
  
    document.head.appendChild(script);
  
    return () => {
      document.head.removeChild(script);
    };
  }, [currentQuestion]);
  
  const handleContinue = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowLoading(true); // Show loading screen when all questions are answered
      setTimeout(() => {
        setShowLoading(false); // Hide loading screen after 5 seconds
        setShowLearningPaths(true); // Show learning paths
      }, 5000);
    }
  };


  const handlePre = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      // Handle scenario when at the first question
    }
  };

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <>
      {!showLearningPaths && (
        <div className="flex justify-top items-center ml-10 ">
        {currentQuestion > 0 && (
          <div className="flex items-center text-xl  mb-1 justify-center px-2" onClick={handlePre}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}
        <div className="max-w-7xl w-full py-7 px-3 text-center">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-stone-200 ">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
      )}
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white  flex flex-col justify-center items-center z-50">
          <img src={loadingAni} alt="Placeholder"/>
          <p className="text-black text-xl text-center">Finding learning path recommendations for you based on <br/> your responses</p>
        </div>
      )}
      {showLearningPaths && (
        <LearningPaths />
      )}
      {!showLoading && !showLearningPaths && (
        <div className="flex flex-col justify-top items-center">
          <div className="max-w-7xl w-full  text-center">
            {currentQuestion < totalQuestions ? (
              <QuestionOrFinalView questionData={questions[currentQuestion]} />
            ) : (
              <p>All questions answered!</p>
            )}
            <div className="mt-8">
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 mb-5 px-8 rounded"
                onClick={handleContinue}
              >
                {currentQuestion < totalQuestions - 1 ? "Continue" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const LearningPaths = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium text-stone-600 mb-4">Learning paths based on your answers</h1>
      <p className="text-lg mb-4">Choose one to get started. You can switch anytime.</p>
      <div className="flex justify-center mt-5">
      <div className="flex items-center bg-white p-4 rounded-md border mr-4 relative">
      <div className="absolute top-0 left-1/3 transform -translate-y-1/2 z-50 bg-yellow-500 text-black px-2 py-1 rounded">
    Most Popular
  </div>

          <div>
            <h2 className="text-xl font-medium text-stone-600 mb-2">Foundational Math</h2>
            <p className="text-base">Build your foundational skills in <br/> algebra, geometry, and  <br/> probability</p>
          </div>
          <div className="ml-4">
            <img src={learnimg} alt="Image 1"  />
          </div>
        </div>
        <div className="flex items-center bg-white p-4 rounded-md border">
          <div>
            <h2 className="text-xl font-medium text-stone-600 mb-2">Mathematical Thinking</h2>
            <p className="text-base">Build your foundational <br/>  skills in algebra, geometry, <br/>  and probability</p>
          </div>
          <div className="ml-4">
            <img src={learnimg} alt="Image 2" />
          </div>
        </div>
      </div>
    </div>
  );
};


const QuestionOrFinalView = ({ questionData }) => {
  if ("choices" in questionData) {
    return <QuestionView questionData={questionData} />;
  } else {
    return <FinalView questionData={questionData} />;
  }
};

const QuestionView = ({ questionData }) => {
  return (
    <>
      <h1 className="text-4xl font-medium text-stone-600 mb-4">
        {questionData.question}
      </h1>
      <p className="text-base text-gray-700">
        {questionData.des}
      </p>
      <div className="mt-4 flex justify-center">
        {questionData.question === "What is your math comfort level?" ? (
          <div className="flex">
            {questionData.choices.map((choice, index) => (
              <div key={index} className="bg-white p-4 rounded-md border mr-4">
                <OptionMathCard math={choice.math} />
                <div dangerouslySetInnerHTML={{ __html: choice.title }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {questionData.choices.map((choice, index) => (
                <OptionCard key={index} title={choice.title} icon={choice.icon} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const FinalView = ({ questionData }) => {
  // Change the image based on the question data
  const image = questionData.tit === "You're on your way!" ? placeholderImage2 : placeholderImage1;

  return (
    <div className="flex justify-center items-center mt-8">
      <img src={image} alt="Placeholder" className="w-1/2 mr-4" />
      <div className="text-left">
        <p className="text-4xl font-medium text-stone-600 mb-4">{questionData.tit}</p>
        <p className="text-lg text-stone-600 mb-4" dangerouslySetInnerHTML={{ __html: questionData.text }}></p>
      </div>
    </div>
  );
};

const OptionCard = ({ title, i }) => {
  return (
    <div className="bg-white p-4 rounded-md border mr-4" dangerouslySetInnerHTML={{ __html: title }}></div>
  );
};
const OptionMathCard = ({ math }) => {
  return (
      <MathJaxContext>
        <MathJax>{math}</MathJax>
      </MathJaxContext>
  );
};

export default DemoComponent;
