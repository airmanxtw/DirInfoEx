const fs = require('fs');
const path = require('path');
module.exports = {
    statdir: function (_dirpath) {
        let info = [{ path: _dirpath, info: [] }];
        let objs = fs.readdirSync(_dirpath);
        objs.forEach((obj) => {
            let objpath = path.join(_dirpath, obj);
            let fstate = fs.statSync(objpath);
            if (fstate.isFile()) {
                let ext = path.extname(obj);
                let find = info[0].info.find(d => d.name == ext);
                if (find == undefined) {
                    info[0].info.push({ name: ext, count: 1 });
                } else {
                    find.count++;
                }
            }
            else if (fstate.isDirectory()) {
                info.push(...this.statdir(objpath));
            }
        })
        return info;
    }
}