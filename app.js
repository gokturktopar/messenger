const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dirName = process.cwd();


/**SET MODULE ALLIAS */
const moduleAlias = require("module-alias");
moduleAlias.addAlias("@src", dirName + "/src");
moduleAlias.addAlias("@middlewares", dirName + "/src/middlewares");
moduleAlias.addAlias("@models", dirName + "/src/models");
moduleAlias.addAlias("@database-helpers", dirName + "/src/database-helpers");
moduleAlias.addAlias("@services", dirName + "/src/services");
moduleAlias.addAlias("@tests", dirName + "/tests");
moduleAlias.addAlias("@configs", dirName + "/configs");
moduleAlias.addAlias("@utils", dirName + "/utils");
moduleAlias.addAlias("@root", dirName);

const app = express();
const errors = require("./utils/error");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const config = require("@configs/default");


const env = process.argv[2];
let redisUtil;
require("@utils/database").connect();

if (env === "dev") {
  redisUtil = require("@utils/redis");
} else {
  console.log('TESTTTT');
  redisUtil = require("./test/_test-redis");
}

//redis setup
const session = require("express-session");
const redisStore = require("connect-redis")(session);
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: config.redis.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({
      host: config.redis.uri,
      port: 6379,
      client: redisUtil.client,
      ttl: 86400,
    }),
  })
);

/**routes */
const authRouter = require('./src/routes/auth');
const verifyToken=require('./src/middlewares/verifyToken');
const userRouter = require('./src/routes/user');
const messageRouter = require('./src/routes/message');
const userLogRouter = require('./src/routes/userLog');
app.use('/api/auth', authRouter);
app.use('/api/users', verifyToken, userRouter);
app.use('/api/messages', verifyToken, messageRouter);
app.use('/api/user-logs', verifyToken, userLogRouter);

/**Swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');
app.use('/doc', swaggerUi.serve);
app.get('/doc', swaggerUi.setup(swaggerDocument));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({ message: "No Api Found", status: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);

  res.json(errors.getResponse(err));
});
module.exports = app;
