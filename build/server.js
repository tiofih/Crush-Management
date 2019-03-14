"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
app_1.default.app.listen(process.env.PORT, function() { return console.log('servidor está rodando na porta: ' + process.env.PORT); });
process.once('SIGUSR2', function () { return app_1.default.closeDataBaseConnection('nodemon restart', function () { return process.kill(process.pid, 'SIGUSR2'); }); });
process.on('SIGINT', function () { return app_1.default.closeDataBaseConnection('execução foi interrompida', function () { return process.exit(0); }); });
