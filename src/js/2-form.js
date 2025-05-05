const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageTextarea = form.querySelector('[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Объект для хранения данных формы
const formData = {
  email: '',
  message: '',
};

// Попытка загрузить данные из localStorage
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);
    formData.email = parsed.email || '';
    formData.message = parsed.message || '';
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  } catch (err) {
    console.error('Ошибка чтения из localStorage:', err);
  }
}

// Сохраняем в localStorage при каждом вводе
form.addEventListener('input', e => {
  if (e.target.name === 'email') {
    formData.email = e.target.value.trim();
  } else if (e.target.name === 'message') {
    formData.message = e.target.value.trim();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Please fill in both fields');
    return;
  }

  console.log('Form submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
