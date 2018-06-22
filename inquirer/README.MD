# 脚手架搭建

1. inquirer(交互式命令)
1. download-git-repo (从git远程仓库下载文件)
1. commander(能够更好地组织和处理命令行的输入)
1. chalk(美化)
1. ora(漂亮的 loding )
1. rimraf(删除文件或文件夹)
1. handlebars(语义模板库)
1. metalsmith(静态页面构建，配合handlebars使用)

## inquirer配置和语法结构

```javascript
const inquirer = rerquire('inquirer)

const promptList = [
  {
    type: '',
    message: '',
    ...
   }
]

inquirer.prompt(promptList).then((answers) => {
  console.log(answers)
})
```

#### 可填写参数

- type: 选择类型
  - input(输入内容)
  - confirm(确认)
  - list(上下键单选)
  - rawlist(选择输入)
  - expand(输入过滤选择)
  - checkbox(多选列表，通过给 choices 中添加 checked: true 默认选中)
  - password(密码为密文输入)
  - editor(文本类型的输入)
- message: 提示消息
- name: 字段名称
- default: 默认值
- validate: 输入校验
- prefix: 前缀提示
- suffix: 后缀提示
- choices: Array (选择列表)
- filter: function (对输入的值可进行二次加工)
- when: function (获取前面输入的值，判断是否进行当前命令行交互(true:可以, false: 不可以))
- pageSize: 列表显示数量，多出为滚动
- transformer:


#### 参考文章

[inquirer.js —— 一个用户与命令行交互的工具](https://blog.csdn.net/qq_26733915/article/details/80461257)