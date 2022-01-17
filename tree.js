const fs = require('fs')
const path = require('path')

const run = function () {
    const args = process.argv.slice(2)
    const filepath = args[0] ? args[0] : __dirname
    tree(filepath).then(console.log)
}

const tree = async function (filepath) {
    let files = []
    let dirs = []
    if (await isDirectory(filepath)) {
        dirs.push(filepath)
        await readDirectory(filepath)
            .then(async filenames => {
                await Promise.all(filenames.map(file => tree(path.join(filepath, file))))
                    .then(contents => {
                        for (let content of contents) {
                            if (content.dirs.length)
                                dirs = dirs.concat(content.dirs)
                            if (content.files.length)
                                files = files.concat(content.files)
                        }
                    })
            })
    } else
        files.push(filepath)
    return {
        files,
        dirs
    }
}

const readDirectory = function (filepath) {
    return new Promise((resolve, reject) => fs.readdir(filepath, (err, files) => {
        err ? reject(err) : resolve(files)
    }))
}

const isDirectory = function (filepath) {
    return new Promise((resolve, reject) => {
        fs.lstat(filepath, (e, stat) => {
            e ? reject(e) : resolve(stat.isDirectory())
        })
    })
}

run()