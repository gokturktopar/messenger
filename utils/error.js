const getResponse = (err) => {
  return {
    status: err.status,
    message: err.message,
  };
};

const backendError = ({err, status, message}) => {
  status = status || 400;
  message = message || err?.message || "Backend Error";
  return {
    status,
    message,
  };
};

const authError = ({err, status, message}) => {
  status = status || 401;
  message = message || err?.message || "Auth Error";
  return {
    status,
    message,
  };
};

module.exports = {
  BackendError: backendError,
  AuthorizationError: authError,
  getResponse,
};
