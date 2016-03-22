'use strict';

var nodemailer = require('nodemailer'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  config = require('../config/config'),
  mg = require('../config/lib/mongoose');

var transporter = nodemailer.createTransport(config.mailer.options);
var link = 'Link para resetar sua senha'; // PUT reset link here
var email = {
  from: config.mailer.from,
  subject: 'Atualização de Senha'
};
var text = [
  'Dear {{name}},',
  '\n',
  'Você solicitou a atualização de sua senha de login. Por favor, clique no link e forneça sua nova senha de acesso.',
  link,
  '\n',
  'Atenciosamente,',
  'Time UrOS'
].join('\n');

mg.loadModels();

mg.connect(function (db) {
  var User = mongoose.model('User');

  User.find().exec(function (err, users) {
    if (err) {
      throw err;
    }

    var processedCount = 0,
      errorCount = 0;

    // report and exit if no users were found
    if (users.length === 0) {
      return reportAndExit(processedCount, errorCount);
    }

    for (var i = 0; i < users.length; i++) {
      sendEmail(users[i]);
    }

    function sendEmail(user) {
      email.to = user.email;
      email.text = email.html = text.replace('{{name}}', user.displayName);

      transporter.sendMail(email, emailCallback(user));
    }

    function emailCallback(user) {
      return function (err, info) {
        processedCount++;

        if (err) {
          errorCount++;

          if (config.mailer.options.debug) {
            console.log('Erro: ', err);
          }
          console.error('[' + processedCount + '/' + users.length + '] ' + chalk.red('Não é possível enviar email para ' + user.displayName));
        } else {
          console.log('[' + processedCount + '/' + users.length + '] Enviando link de restauração de senha para ' + user.displayName);
        }

        if (processedCount === users.length) {
          return reportAndExit(processedCount, errorCount);
        }
      };
    }

    // report the processing results and exit
    function reportAndExit(processedCount, errorCount) {
      var successCount = processedCount - errorCount;

      console.log();

      if (processedCount === 0) {
        console.log(chalk.yellow('Nenhum usuário encontrado.'));
      } else {
        var alert;
        if (!errorCount) {
          alert = chalk.green;
        } else if ((successCount / processedCount) < 0.8) {
          alert = chalk.red;
        } else {
          alert = chalk.yellow;
        }

        console.log(alert('Enviando ' + successCount + 'para ' + processedCount + ' email concluida.'));
      }

      process.exit(0);
    }
  });
});
