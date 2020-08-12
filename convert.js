var xlsx = require('node-xlsx')
var fs = require('fs')
const path = require('path')

module.exports = function convert (filepath, newPath) {
  try {
    var obj = xlsx.parse(path.join(__dirname, filepath)) // parses a file
    var rows = []
    var writeStr = ''
    // looping through all sheets
    for (let i = 0; i < obj.length; i++) {
      var sheet = obj[i]
      // loop through all rows in the sheet
      for (let j = 0; j < sheet.data.length; j++) {
        // add the row to the rows array
        rows.push(sheet.data[j])
      }
    }

    // creates the csv string to write it to a file
    for (let i = 0; i < rows.length; i++) {
      writeStr += rows[i].join(',') + '\n'
    }

    fs.writeFile(path.join(__dirname, newPath), writeStr, function (err) {
      if (err) {
        return console.log(err)
      }
      console.log('File is converted successfully!')
    })
  } catch (error) {
    console.log('error', error)
  }
}
