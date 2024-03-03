const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;
const phoneRegex = /^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export { passwordRegex, phoneRegex, emailRegex };
