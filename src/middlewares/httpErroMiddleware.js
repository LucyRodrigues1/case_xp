const httpErroMiddleware = (err, req, res, next) => {
  if (err) {
    const { status, message } = err;
    res.status(status || 500).json({ message });
  }
  next();
};

module.exports = httpErroMiddleware;