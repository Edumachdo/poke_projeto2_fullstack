const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../../activity.log'), { flags: 'a' });

function requestLogger(req, res, next) {
  const { method, url, ip, body } = req;
  const user = req.user ? `User: ${req.user.email}` : 'Guest';
  const timestamp = new Date().toISOString();

  // Clone the body and remove sensitive data
  const safeBody = { ...body };
  if (safeBody.password) {
    safeBody.password = 'REDACTED';
  }

  const bodyString = JSON.stringify(safeBody);
  
  logStream.write(`${timestamp} - ${ip} - ${user} - ${method} ${url} - Body: ${bodyString}\n`);

  res.on('finish', () => {
    logStream.write(`${timestamp} - Response: ${res.statusCode} for ${method} ${url}\n`);
  });

  next();
}

function logSecurityEvent(level, message) {
    const timestamp = new Date().toISOString();
    logStream.write(`${timestamp} - [${level}] - SECURITY - ${message}\n`);
}

module.exports = { requestLogger, logSecurityEvent };
