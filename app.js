import mysql from "mysql";
import inquirer from "inquirer";
//import为ES6语法，请在package.json里添加 "type": "module"；

var connection = mysql.createConnection({
  host: "localhost", //链接 这是默认的
  user: "root", //用户
  password: "HH30291475xy/", //密码
  port: "3306", //端口 这是默认的
});
var database = ""; //数据库,不需要更改，连接到MySQL会自动检测。
var biao = ""; //这是ceshi-0数据库里的数据表，不需要更改，选择数据库后会自动检测。

// 建立数据库的链接
connection.connect();

let sql = "SHOW DATABASES",
  databases = [],//所有用户数据库
  obj = {},
  objs = [],
  biaoobj = [],
  biaoobjs = [],
  biaos = [];//所有用户数据表
connection.query(sql, function (err, result) {
  if (err) {
    console.log("[SELECT ERROR] - ", err.message);
    return;
  }

  result.forEach((row) => {
    databases.push(row.Database);
  });


  obj = {
    type: "list",
    name: "databases",
    message: "请选择一个数据库",
    choices: databases,
  };
  objs.push(obj);
  inquirer.prompt(objs).then((answers) => {
    // console.log(answers);
    database = answers.databases;
    let sql = "SHOW TABLES FROM`" + database + "`";
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        return;
      }

      console.log(
        "--------------------------SELECT----------------------------"
      );
      console.log(result);
      result.forEach((row) => {
        // console.log(row[`Tables_in_${database}`]);
        biaos.push(row[`Tables_in_${database}`]);
      });
      console.log(
        "------------------------------------------------------------\n\n"
      );
      biaoobj = {
        type: "list",
        name: "biao",
        message: "请选择一个数据表",
        choices: biaos,
      };
      biaoobjs.push(biaoobj);
      inquirer.prompt(biaoobjs).then((answers) => {
        biao = answers.biao;
        // 主程序
        inquirer
          .prompt([
            {
              type: "list",
              name: "command",
              message: "请输入命令：",
              choices: ["查看数据", "添加数据", "更改数据", "删除数据"],
            },
          ])
          .then((answers) => {
            console.log("结果为：" + answers.command);
            if (answers.command == "查看数据") {
              chakan();
            } else if (answers.command == "添加数据") {
              tianjia();
            } else if (answers.command == "更改数据") {
              kengai();
            } else if (answers.command == "删除数据") {
              shanchu();
            }
          });

        function chakan() {
          // SELECT是SQL语句，用于从数据库表中检索数据。
          // FROM指定要从那个表检索数据。
          let sql = "SELECT * FROM `" + database + "`." + biao; // ceshi-0 中的名为 ceshibiao 的表
          // connection.query() 查询函数
          connection.query(sql, function (err, result) {
            if (err) {
              console.log("[SELECT ERROR] - ", err.message);
              return;
            }

            console.log(
              "--------------------------SELECT----------------------------"
            );
            console.log(result);
            console.log(
              "------------------------------------------------------------\n\n"
            );
            connection.end();
          });
        }

        function tianjia() {
          inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "请输入你要更改的id的id号(需要正常排列请输入0)",
                choices: [
                  "按顺序在末尾添加",
                  "请输入你要插入的id的id号(id一般为数字)",
                ],
              },
            ])
            .then((answers) => {
              let data;
              if (answers.id === "按顺序在末尾添加") {
                data = 0;
              } else if (
                answers.id === "请输入你要插入的id的id号(id一般为数字)"
              ) {
                data = "?";
              }

              if (data === 0) {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "name",
                      message: "请输入名字 name",
                    },
                    {
                      type: "input",
                      name: "ceshi",
                      message: "请输入查询 ceshi",
                    },
                    {
                      type: "input",
                      name: "dig",
                      message: "请输入大小 dig",
                    },
                  ])
                  .then((answers) => {
                    let addSqlParams = [
                      answers.name,
                      answers.ceshi,
                      answers.dig,
                    ];
                    let addsql =
                      "INSERT INTO `" +
                      database +
                      "`." +
                      biao +
                      " (id, name, ceshi, dig) VALUES (0, ?, ?, ?)";
                    connection.query(
                      addsql,
                      addSqlParams,
                      function (err, result) {
                        if (err) {
                          console.log("[INSERT ERROR] - ", err.message);
                          return;
                        }

                        console.log(
                          "--------------------------INSERT----------------------------"
                        );
                        console.log("INSERT ID:", result + "\n" + "已成功");
                        console.log(
                          "-----------------------------------------------------------------\n\n"
                        );
                      }
                    );
                    connection.end();
                  });
              } else if (data === "?") {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "id",
                      message: "请输入你要插入的id的id号",
                    },
                    {
                      type: "input",
                      name: "name",
                      message: "请输入名字 name",
                    },
                    {
                      type: "input",
                      name: "ceshi",
                      message: "请输入查询 ceshi",
                    },
                    {
                      type: "input",
                      name: "dig",
                      message: "请输入大小 dig",
                    },
                  ])
                  .then((answers) => {
                    let addSqlParams = [
                      answers.id,
                      answers.name,
                      answers.ceshi,
                      answers.dig,
                    ];
                    let addsql =
                      "INSERT INTO `" +
                      database +
                      "`." +
                      biao +
                      " (id, name, ceshi, dig) VALUES (?, ?, ?, ?)";
                    connection.query(
                      addsql,
                      addSqlParams,
                      function (err, result) {
                        if (err) {
                          console.log("[INSERT ERROR] - ", err.message);
                          return;
                        }

                        console.log(
                          "--------------------------INSERT----------------------------"
                        );
                        console.log("INSERT ID:", result + "\n" + "已成功");
                        console.log(
                          "-----------------------------------------------------------------\n\n"
                        );
                      }
                    );
                    connection.end();
                  });
              }
            });
        }

        function kengai() {
          inquirer
            .prompt([
              {
                type: "input",
                name: "id",
                message: "请输入你要更改的id的id号",
              },
              {
                type: "input",
                name: "name",
                message: "请输入你要更改的name",
              },
              {
                type: "input",
                name: "ceshi",
                message: "请输入你要更改的ceshi",
              },
              {
                type: "input",
                name: "dig",
                message: "请输入你要更改的dig",
              },
            ])
            .then((answers) => {
              let modSqlParams = [
                answers.name,
                answers.ceshi,
                answers.dig,
                answers.id,
              ];
              let modSql =
                "UPDATE `" +
                database +
                "`." +
                biao +
                " SET name = ?, ceshi = ?, dig = ? WHERE Id = ?";

              connection.query(modSql, modSqlParams, function (err, result) {
                if (err) {
                  console.log("[UPDATE ERROR] - ", err.message);
                  return;
                }
                console.log(
                  "--------------------------UPDATE----------------------------"
                );
                console.log(
                  "UPDATE affectedRows",
                  result.affectedRows + "\n" + "已成功"
                );
                console.log(
                  "-----------------------------------------------------------------\n\n"
                );
              });
              connection.end();
            });
        }

        function shanchu() {
          inquirer
            .prompt([
              {
                type: "input",
                name: "id",
                message: "请输入你要删除的id的id号",
              },
            ])
            .then((answers) => {
              let delid = answers.id;
              let delsql =
                "DELETE FROM `" + database + "`." + biao + " WHERE id=" + delid;
              connection.query(delsql, function (err, result) {
                if (err) {
                  console.log("[DELETE ERROR] - ", err.message);
                  return;
                }

                console.log(
                  "--------------------------DELETE----------------------------"
                );
                console.log(
                  "DELETE affectedRows",
                  result.affectedRows + "\n" + "已成功"
                );
                console.log(
                  "-----------------------------------------------------------------\n\n"
                );
              });
              connection.end();
            });
        }
      });
    });
  });
});
