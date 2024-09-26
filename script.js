let questions = [];
let selectedQuestion = null;

document.addEventListener('DOMContentLoaded', () => {
    const newQuestionBtn = document.getElementById('new-question-btn');
    const searchInput = document.getElementById('search-input');
    const questionForm = document.getElementById('question-form');
    const responseForm = document.getElementById('response-form');
    const resolveBtn = document.getElementById('resolve-btn');

    newQuestionBtn.addEventListener('click', showQuestionForm);
    searchInput.addEventListener('input', handleSearch);
    questionForm.addEventListener('submit', handleQuestionSubmit);
    responseForm.addEventListener('submit', handleResponseSubmit);
    resolveBtn.addEventListener('click', handleResolve);

    renderQuestionList();
});

function showQuestionForm() {
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('question-detail').style.display = 'none';
}

function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredQuestions = questions.filter(q =>
        q.subject.toLowerCase().includes(searchQuery) ||
        q.text.toLowerCase().includes(searchQuery)
    );
    renderQuestionList(filteredQuestions);
}

function handleQuestionSubmit(e) {
    e.preventDefault();
    const subject = document.getElementById('subject-input').value;
    const text = document.getElementById('question-input').value;
    if (subject && text) {
        const newQuestion = { id: Date.now(), subject, text, responses: [] };
        questions.push(newQuestion);
        renderQuestionList();
        e.target.reset();
    }
}

function handleResponseSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name-input').value;
    const comment = document.getElementById('comment-input').value;
    if (name && comment && selectedQuestion) {
        selectedQuestion.responses.push({ name, comment });
        renderQuestionDetail(selectedQuestion);
        e.target.reset();
    }
}

function handleResolve() {
    if (selectedQuestion) {
        questions = questions.filter(q => q.id !== selectedQuestion.id);
        renderQuestionList();
        showQuestionForm();
    }
}

function renderQuestionList(filteredQuestions = questions) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    filteredQuestions.forEach(q => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question-item';
        questionEl.innerHTML = `<strong>${q.subject}</strong><br>${q.text}`;
        questionEl.addEventListener('click', () => renderQuestionDetail(q));
        questionList.appendChild(questionEl);
    });
}

function renderQuestionDetail(question) {
    selectedQuestion = question;
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('question-detail').style.display = 'block';
    
    const questionContent = document.getElementById('question-content');
    questionContent.innerHTML = `<strong>${question.subject}</strong><br>${question.text}`;
    
    const responses = document.getElementById('responses');
    responses.innerHTML = '';
    question.responses.forEach(r => {
        const responseEl = document.createElement('div');
        responseEl.className = 'response';
        responseEl.innerHTML = `<div class="response-name">${r.name}</div>${r.comment}`;
        responses.appendChild(responseEl);
    });
}