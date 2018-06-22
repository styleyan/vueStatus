const inquirer = require('inquirer')
var ui = new inquirer.ui.BottomBar();

// pipe a Stream to the log zone
outputStream.pipe(ui.log);

// Or simply write output
ui.log.write('something just happened.');
ui.log.write('Almost over, standby!');

// During processing, update the bottom bar content to display a loader
// or output a progress bar, etc
ui.updateBottomBar('new bottom bar content');

const promptList = [{
  type: "input",
  message: "是否使用监听？",
  name: "watch",
  prefix: "前缀"
},{
  type: "input",
  message: "请输入名称",
  name: "name",
  prefix: "前缀"
},{
  type: "confirm",
  message: "是否进行文件过滤？",
  name: "filter",
  suffix: "后缀",
  when: function(answers) { // 当 watch 为 true 的时候才会提问当前问题
    console.log(answers)
    return answers.watch
  }
}];

inquirer.prompt(promptList).then((answer) => {
  console.log(answer)
})