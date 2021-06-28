var fs = require('fs');
var path = require("path");
const { Command } = require('commander');
const program = new Command();
program.version('1.0.0')
    .option("-d,--dir [path]", "查詢目錄位置")
    .description("**×目錄資訊ToExcel***")
    .parse(program.argv);

const options = program.opts();
if (Object.keys(options).length > 0) {
    let _workpath = options.dir == true ? __dirname : options.dir;

    console.log(_workpath);
    fs.stat
    // fs.readdir(__dirname, function (err, files) {
    //     files.forEach(function (file) {
    //         debugger;
    //         console.log(path.join(__dirname, file));
    //     });
    // });
}
else {
    program.outputHelp();
}




