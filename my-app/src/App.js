
import './App.css';
import Confetti from 'react-confetti'
import React, {useEffect, useState} from 'react';



function App() {
  const  [questions, setQuestions ] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)  
  const [load, setLoad] = useState(true)
  
  


   //API returning questions array
  useEffect(()=>{
   
    fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
    .then((response)=>response.json())
    .then((data)=>setQuestions(data.results))
    .catch((error)=>console.log('error'))

},[])


let tempAnswer
let tempAnswer1
 
//function to increment scores and check for correct answer, it also responsible for displaying next question.
function nextQuestion(){
  if(tempAnswer === questions[currentQuestion].correct_answer || tempAnswer1 === questions[currentQuestion].correct_answer ){
 setScore(score+1)
  }
 
  const nextQuestion = currentQuestion + 1
  if(nextQuestion < questions.length){
    setcurrentQuestion(nextQuestion)
  }
  else{
    setShowScore(true)
  }

  let options = document.querySelectorAll('.option')
  for(let i=0; i<=options.length; i++){
 options[i].style.backgroundColor = ""; 
 options[i].style.color = "black";
 
}
}

// function to return to previous page
// function prevQuestion(){
//   const prevQuestion = currentQuestion - 1
//   if(prevQuestion < 1){
//    alert('Y have reached the first question')
//   }
//   else{
//     setcurrentQuestion(prevQuestion)
//   }
// }

//function that reloads browser if user decides to take the quiz again
function refresh(){
  window.location.reload(false);
}

//function that returns the user to the welcome page
function loadScreen(){
  setLoad(false)
}



// console.log(questions)



  return (
   
  
    <div className="App">
     
     
        { load ? <div className='start-screen'>
          <h2>Welcome to Quizzical</h2>
          <p>Please read the questions carefully before you answer</p>
          <button className= 'start-btn' onClick={loadScreen}>click here to start quiz</button> 
          </div>:
        <div>
			{showScore ? 
         
				<div className='score-section'><h2>You scored {score} out of {questions.length}</h2>
             {score >= 8 ? <> <Confetti/> <p>Welldone! QuizMaster</p> </> : <p>Nice attempt! you can do better</p>}
      </div>
			 : 	<div><h2><span>Question {currentQuestion + 1}</span>/{questions.length}</h2></div>}


			{	 showScore ? <div className='lastpage'><h4>Thank you for taking part in this quiz </h4>
      <button className='restart-btn' onClick={refresh}>Click here restart quiz</button></div> :

          <>
					<div className='question-section'>
					<div className='question-text'><h2>{currentQuestion+1}.{questions.length > 0 && questions[currentQuestion].question}</h2></div>
					</div>
					<div className='answer-section'>
            
          {questions.length > 0 && questions[currentQuestion].incorrect_answers.map((answerOptions)=>{

         return (
                <div>
                    <button className='option' onClick={(e)=>{
                        tempAnswer = e.target.innerHTML
                     
                  let options = document.querySelectorAll('.option')
                  for(let i = 0; i<options.length; i++){
                   options[i].style.backgroundColor = ''
                   options[i].style.color = 'black'
                  }
               e.target.style.backgroundColor = '#fd5660'
               e.target.style.color = 'white'
             
               }}>{answerOptions}</button>
                </div>
             )
            })}



          { questions.length > 0 && <div><button className='option' onClick={(e)=>{
                   tempAnswer1 = e.target.innerHTML
                  let options = document.querySelectorAll('.option')
                  for(let i = 0; i<options.length; i++){
                   options[i].style.backgroundColor = ''
                   options[i].style.color = 'black'

                  }
              e.target.style.backgroundColor = '#fd5660'
              e.target.style.color = 'white'

            }}>
              {questions[currentQuestion].correct_answer}</button></div> }
        
					</div>
			   	</>}

        
			{ 
        <div style={{display : showScore ? 'none' : ''}} className='next-section'>
        <button className='nextButton' onClick={nextQuestion}><i class="fa-solid fa-angle-right"></i></button>
          </div>

      } 	

        </div>
        
} 
          
    </div> 
          
  );
}



export default App;


// questions[currentQuestion].correct_answer