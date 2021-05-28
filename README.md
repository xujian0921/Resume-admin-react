### Ant Form 表单

```js
form 表单中 Form.Item 组件下子组件 不能取到Form.Item 对应的值
如果我们想切换Input 输入框 和 span 的标签，在span的标签中，我们是无法拿到值的

可以换
import ProDescriptions from '@ant-design/pro-descriptions';
这个组件
```



可以在容器内切换组件实现功能

![1619084840403](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\1619084840403.png)

```js
{ editSign? (<span>111</span>) : (<span>2222</span>)}
```



### ant table

- `columns`中  `key: 'account'`, `dataIndex`唯一的话key可以省略