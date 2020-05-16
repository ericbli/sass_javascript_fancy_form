// Questions Array
const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password' }
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 500; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// EVENTS

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {     //按键为enter则检查
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';  //没有type就是text
  // Get Current Answer
  inputField.value = questions[position].answer || '';   //没有则为空
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  console.log(x,y);      //查变形
  formBox.style.transform = `translate(${x}px, ${y}px)`;   //https://www.w3schools.com/jsref/prop_style_transform.asp
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One  有则匹配否则和一切都是匹配的
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Faileweewwe
function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 10, 0);  //x方向振动 正负10
    setTimeout(transform, shakeTime * 6, 0, 0);   //还原
    inputField.focus();
  }

}

// Field Input Passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);      //y向运动
  setTimeout(transform, shakeTime * 1, 0, 0);       //还原

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

// All Fields Complete - Show h1 end
function formComplete() {
//  console.log(questions);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      } You are registered and will get info from email: ${
        questions[2].answer
      } shortly`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);  //div里加h1
    setTimeout(() => (h1.style.opacity = 1), 5000);   //5秒后执行前面的箭头函数
   // console.log(formBox.parentElement.nodeName)
  }, 3000);                                         //3秒后执行前面的大括号
}
