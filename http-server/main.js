document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('registration-container');

  const form = document.createElement('form');
  form.action = '/submit-registration';
  form.method = 'POST';

  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'name';
  nameLabel.textContent = 'Name:';
  form.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  form.appendChild(nameInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(document.createElement('br'));

  const emailLabel = document.createElement('label');
  emailLabel.htmlFor = 'email';
  emailLabel.textContent = 'Email:';
  form.appendChild(emailLabel);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  form.appendChild(emailInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(document.createElement('br'));

  const passwordLabel = document.createElement('label');
  passwordLabel.htmlFor = 'password';
  passwordLabel.textContent = 'Password:';
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  form.appendChild(passwordInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(document.createElement('br'));

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Submit';
  form.appendChild(submitButton);

  container.appendChild(form);
});
