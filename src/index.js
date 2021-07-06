#! /usr/bin/env node
var fs = require('fs');
const ExcelJS = require('exceljs');
const prettyBytes = require('pretty-bytes');
const searchfile = require('./searchfile');
const ora = require('ora');
var path = require("path");
const { Command } = require('commander');
const program = new Command();
program.version('1.0.0')
    .option("-d,--dir [path]", "查詢目錄位置 Directory path")
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
            const sheet = workbook.addWorksheet('檔案資訊(info)');
            sheet.columns = [
                { header: '路徑(path)', key: 'path', width: 50 },
                { header: '副檔名(ext)', key: 'ext', width: 10 },
                { header: '次數(count)', key: 'count', width: 15 },
                { header: '合計大小(total)', key: 'total', width: 20, style: { alignment: { horizontal: 'right' } } }
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

            let outfile = "result.xlsx";
            workbook.xlsx.writeFile(outfile).then((res) => {
                spinner.succeed(`${outfile} File export completed`);
            });


        }
        else if (!err && st.isFile()) {
            spinner.fail("錯誤(error)：[path]需為一個目錄位置。");
        }
        else {
            spinner.fail(err.message);
        }
    });

}
else {
    program.outputHelp();
}




