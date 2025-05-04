const formData = {
  email: '',
  message: '',
};

const LS_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector("[name='email']");
const textareaMessage = document.querySelector("[name='message']");

const stored = localStorage.getItem(LS_KEY);
if (stored) {
  const parsed = JSON.parse(stored);
  formData.email = parsed.email || '';
  formData.message = parsed.message || '';
  inputEmail.value = formData.email;
  textareaMessage.value = formData.message;
}

form.addEventListener('input', e => {
  if (e.target.name === 'email') {
    formData.email = e.target.value.trim();
  } else if (e.target.name === 'message') {
    formData.message = e.target.value.trim();
  }
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  console.log('Form submitted:', formData);
  localStorage.removeItem(LS_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
