# inquirer配置

## 语法结构

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

### 可填写参数

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