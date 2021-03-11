/*hzw-table 配置参数*/
export default {
  tableHeadParams: [
    {
      label: "名称",
      prop: "name",
      icon: "icon-folder",
      iconColor: "#FFD54E"
    },
    {
      label: "文件数量",
      prop: "createData",
      align: "center"
    },
    {
      label: "最后更新时间",
      prop: "createData",
      align: "center"
    }
  ],
  bindDialogForm: [
    {
      name: "学校：",
      type: "select",
      placeholder: "请输入姓名",
      id: "school",
      option: [
        {
          lable: "上海大学",
          value: "0"
        },
        {
          lable: "北京大学",
          value: "1"
        }
      ]
    },
    {
      name: "账号：",
      type: "text",
      placeholder: "请输入账号",
      id: "user"
    },
    {
      name: "密码：",
      type: "password",
      placeholder: "请输入密码",
      id: "password"
    }
  ]
};
