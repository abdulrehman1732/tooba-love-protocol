const questions = [
  {
    title: "First, a gentle prescription.",
    text: "What keeps two hearts close while they respectfully wait for marriage?",
    answers: [
      ["A", "Patience, taken every day", "Pharmacist-approved. No expiry date, and the benefits last a lifetime."],
      ["B", "Dua, trust, and good intentions", "A powerful combination—best stored safely in two sincere hearts."],
      ["C", "Respecting the people who love us", "Exactly. A beautiful future deserves a beautiful beginning."]
    ]
  },
  {
    title: "Connection status.",
    text: "If there are no calls or conversations before marriage, what remains connected?",
    answers: [
      ["A", "Two families and one promise", "Connection verified. The most important network is already secure."],
      ["B", "Trust in what is written for us", "Strong signal. No Wi-Fi, phone calls, or software updates required."],
      ["C", "The future we are patiently waiting for", "Exactly. Some of the best things simply take time to load."]
    ]
  },
  {
    title: "Heart verification.",
    text: "Who is Abdul Rehman patiently waiting to build his future with?",
    answers: [
      ["A", "Tooba", "Correct. The answer was written in his heart before the question even appeared."],
      ["B", "Obviously, Tooba", "Exactly. Even the system knew this question was far too easy."],
      ["C", "Dr. Tooba—final answer", "Identity confirmed. The future Mrs. Abdul Rehman has been successfully selected."]
    ]
  },
  {
    title: "Professional compatibility.",
    text: "What happens when a pharmacist and an IT engineer build a home together?",
    answers: [
      ["A", "She handles the medicine; he fixes the Wi-Fi", "A perfectly balanced household with excellent technical support."],
      ["B", "Every problem gets diagnosed twice", "One clinical diagnosis and one full system diagnostic—nothing can escape."],
      ["C", "They become the best team", "Compatibility confirmed: care, logic, patience, and plenty of laughter."]
    ]
  },
  {
    title: "Final compatibility check.",
    text: "What should Abdul Rehman and Tooba install in their future together?",
    answers: [
      ["A", "A lifetime of kindness", "Installation successful. This package includes unlimited support and forgiveness."],
      ["B", "Faith, laughter, and patience", "All essential dependencies found. Ready for a beautiful lifelong deployment."],
      ["C", "A peaceful home built together", "That is the future this entire system has been waiting for."]
    ]
  }
];

const title = document.querySelector('#title');
const content = document.querySelector('#content');
const stepLabel = document.querySelector('#stepLabel');
const progressBar = document.querySelector('#progressBar');
const progressText = document.querySelector('#progressText');
let index = 0;

document.querySelector('#startBtn').addEventListener('click', showQuestion);

function updateProgress(value) {
  progressBar.style.width = `${value}%`;
  progressText.textContent = `${value}%`;
}

function showQuestion() {
  const q = questions[index];
  stepLabel.textContent = `QUESTION ${String(index + 1).padStart(2, '0')} // ${questions.length}`;
  title.textContent = q.title;
  updateProgress(Math.round((index / questions.length) * 100));
  content.innerHTML = `
    <p class="lead">${q.text}</p>
    <div class="choices">
      ${q.answers.map((answer, i) => `<button class="choice" data-answer="${i}"><span class="choice-code">${answer[0]}</span><span>${answer[1]}</span></button>`).join('')}
    </div>`;
  content.querySelectorAll('.choice').forEach(btn => btn.addEventListener('click', () => showReaction(Number(btn.dataset.answer))));
}

function showReaction(answerIndex) {
  const reaction = questions[index].answers[answerIndex][2];
  content.innerHTML = `
    <div class="reaction"><span class="heart">♥</span><div><b>Result:</b><br>${reaction}</div></div>
    <button class="primary" id="nextBtn">${index === questions.length - 1 ? 'View final message' : 'Continue our story'} <span>→</span></button>`;
  document.querySelector('#nextBtn').addEventListener('click', () => {
    index += 1;
    index < questions.length ? showQuestion() : showFinal();
  });
}

function showFinal() {
  stepLabel.textContent = 'A NOTE FROM MY HEART // FOR YOU';
  title.textContent = 'Thank you for coming into my life, Tooba.';
  updateProgress(100);
  content.innerHTML = `
    <div class="final-copy">
      <p>We may not call or speak before marriage, and I respect the boundary our parents have set for us. This waiting is not an empty space—it is part of the honest and respectful beginning I want our story to have.</p>
      <p>Thank you for coming into my life. Even quietly, your presence has given me something beautiful to look forward to. I pray that Allah protects what is written for us and brings us together at the right time, with happiness and barakah.</p>
      <p class="signature">Patiently waiting for our future,<br><strong>Abdul Rehman <span class="heart">♥</span></strong></p>
    </div>
    <button class="primary" id="messageBtn">Leave a message for me <span>→</span></button>`;
  document.querySelector('#messageBtn').addEventListener('click', showMessageForm);
}

function showMessageForm() {
  stepLabel.textContent = 'ONE LAST THING // FROM YOU';
  title.textContent = 'A message for Abdul Rehman.';
  content.innerHTML = `
    <p class="lead">If you would like, leave a few words for me here. They will be delivered privately to my email.</p>
    <form id="messageForm" class="message-form">
      <input type="hidden" name="_subject" value="A personal message from Tooba">
      <input type="hidden" name="From" value="Tooba">
      <textarea name="message" id="personalMessage" rows="7" maxlength="2000" required placeholder="Write your message here…" aria-label="Personal message for Abdul Rehman"></textarea>
      <div class="form-meta"><span>Private message</span><span id="characterCount">0 / 2000</span></div>
      <button class="primary" type="submit" id="sendBtn">Send to Abdul Rehman <span>♡</span></button>
      <p class="form-status" id="formStatus" role="status"></p>
    </form>`;

  const form = document.querySelector('#messageForm');
  const textarea = document.querySelector('#personalMessage');
  const count = document.querySelector('#characterCount');
  textarea.addEventListener('input', () => count.textContent = `${textarea.value.length} / 2000`);
  form.addEventListener('submit', sendMessage);
}

async function sendMessage(event) {
  event.preventDefault();
  const button = document.querySelector('#sendBtn');
  const status = document.querySelector('#formStatus');
  button.disabled = true;
  button.innerHTML = 'Sending… <span>♡</span>';
  status.textContent = '';

  try {
    const response = await fetch('https://formsubmit.co/ajax/ranaabood.11@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))
    });
    if (!response.ok) throw new Error('Unable to send');
    showThankYou();
  } catch (error) {
    button.disabled = false;
    button.innerHTML = 'Try sending again <span>♡</span>';
    status.textContent = 'The message could not be sent yet. Please try once more.';
  }
}

function showThankYou() {
  stepLabel.textContent = 'MESSAGE SENT // WITH CARE';
  title.textContent = 'Your words are on their way.';
  content.innerHTML = `
    <div class="final-copy">
      <p>Thank you for leaving a little piece of your heart here.</p>
      <p>Until the day our families bring us together, may Allah keep you happy, protect you, and make the road ahead beautiful for both of us.</p>
      <p class="signature">The wait will be worth it, InshaAllah. <span class="heart">♥</span></p>
    </div>
    <button class="primary" id="restartBtn">Read it again <span>↻</span></button>`;
  document.querySelector('#restartBtn').addEventListener('click', () => {
    index = 0;
    showQuestion();
  });
}
