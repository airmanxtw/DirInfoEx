var fs = require('fs');
const ora = require('ora');
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
    const spinner = ora('讀取中...').start();

    fs.stat(_workpath, (err, st) => {
        if (!err && st.isDirectory()) {
            fs.readdir(_workpath, (err, files) => {
                files.forEach((file) => {
                    spinner.text = `讀取中...${file}`;
                    spinner.render();
                    //console.log(file);
                })
                spinner.succeed("完成");
            });
        }
        else if (!err && st.isFile()) {
            spinner.fail("錯誤：[path]需為一個目錄位置。");
        }
        else {
            spinner.fail(err.message);
        }
    });


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




