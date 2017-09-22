
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var cors = require('cors')
var router = express.Router();
var exec = require('child_process').exec;

app.use(cors())

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

router.get('/:folder_name', function(req, res) {
  let dir = `${__dirname}/../${req.params.folder_name}`;
  process.chdir(dir);
  execute("git diff -U1 --minimal dev-ben --", function(diff){
    process.chdir(dir);
    execute("git branch", function(branchName) {
      let m = branchName.match(/^\*\s*(.*?)$/m);
      branchName = (m.length<=1) ? '<unknown>' : m[1].trim();
      res.json({ diff: diff, branchName: branchName });   
    })
  });
});

app.use('/api', router);

app.listen(port);
