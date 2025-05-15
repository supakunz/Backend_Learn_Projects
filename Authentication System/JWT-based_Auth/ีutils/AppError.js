// สร้าง คลาส Error แบบ custom เพื่อจัดการ error ให้เป็นระบบมากขึ้น
class AppError extends Error {
  // สร้างคลาสชื่อ AppError ซึ่ง สืบทอดจากคลาสมาตรฐาน Error
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
