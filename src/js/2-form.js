const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageTextarea = form.querySelector('[name="message"]');
const dataFromLS = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(dataFromLS);
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);
    formData.email = parsed.email || '';
    formData.message = parsed.message || '';
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('input', e => {
  if (e.target.name === 'email') {
    formData.email = e.target.value.trim();
  } else if (e.target.name === 'message') {
    formData.message = e.target.value.trim();
  }
  localStorage.setItem(dataFromLS, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Please fill in both fields');
    return;
  }

  localStorage.removeItem(dataFromLS);
  form.reset();
  formData.email = '';
  formData.message = '';
});
