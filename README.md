# 陈红鼓励师

在 VS Code 中连续写代码一小时（时间可配置），会有陈红提醒你该休息啦~

## 使用

安装插件后，每过一小时会自动弹出提醒页面，也可以按 `F1`, 然后输入 `ch: ❤召唤陈红鼓励师`来打开提醒页面或者在页面点击鼠标右键，选择 ❤ 召唤陈红鼓励师。

![usage](https://ito.oss-cn-beijing.aliyuncs.com/luoxuhai.chenhong/show.jpg?x-oss-process=style/fade)

## 配置

| 配置项名称                         | 描述                                       | 类型   | 默认值                                  |
| ---------------------------------- | ------------------------------------------ | ------ | --------------------------------------- |
| `ch.reminderViewIntervalInMinutes` | 展示提醒页面的时间间隔（分钟）             | Number | `60`                                    |
| `ch.title`                         | 提示文字                                   | String | `小哥哥，小哥哥，代码写久了，喝杯水吧~` |
| `ch.type`                          | default (默认图)custom (自定义图片)        | String | `default`                               |
| `ch.customImages`                  | 配置图片数组（需要搭配 ch.type 为 custom） | Array  | `[]`                                    |

## 如何自定义鼓励师？

1. 打开 vscode 设置项（`ctrl + ,`），切换到 json 编辑视图；
2. 在其中按如下格式新增鼓励师配置：

```json
"ch.type": "custom",
"ch.customImages": [
    "http://xxx.jpg"
    "http://xxxx.jpg"
]
```

## 如何使用本地图片作为展示图片？

- vscode 不允许读取外部文件路径，所以只能自己去替换插件内的图片。替换步骤如下：

  1. 找到 vscode 插件安装的地方 (如 mac 在~/.vscode/extensions/luoxuhai.chenhong-{version})
  2. 替换 public/images 内图片
