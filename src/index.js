var fs = require('fs');
const ExcelJS = require('exceljs');
const prettyBytes = require('pretty-bytes');
const searchfile = require('./searchfile');
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
            let result = searchfile.statdir(_workpath);
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('檔案資訊');
            sheet.columns = [
                { header: '路徑', key: 'path', width: 50 },
                { header: '副檔名', key: 'ext', width: 10 },
                { header: '次數', key: 'count', width: 15 },
                { header: '合計大小', key: 'total', width: 20, style: { alignment: { horizontal: 'right' } } }
            ];

            result.forEach((p) => {
                let index = 0;
                p.info.forEach((i) => {
                    index++;
                    sheet.addRow({
                        path: index == 1 ? p.path : '',
                        ext: i.name,
                        count: i.count,
                        total: prettyBytes(i.size),
                    });
                })
            });

            workbook.xlsx.writeFile("result.xlsx").then((res) => {
                spinner.succeed("檔案寫入成功！");
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




