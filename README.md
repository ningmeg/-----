# Node-MySQL

这是一个使用 Node.js 操作 MySQL 的脚本。
以实现查询所有用户的数据库和数据表。
实现数据的添加，插入，更改，删除和查看。
目前并不支持增删数据库和增删数据表。

操作简单，只需要在 app.js里更改为你的设置即可。

```javascript
var connection = mysql.createConnection({
  host: "localhost", //链接 这是默认的
  user: "root", //用户
  password: "HH30291475xy/", //密码
  port: "3306", //端口 这是默认的
});
```
