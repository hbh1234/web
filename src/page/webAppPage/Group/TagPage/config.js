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
      label: "更新时间",
      prop: "createData",
      align: "center"
    },
    {
      label: "权限",
      prop: "groupIds",
      align: "center",
      nameScope: "groupIds" // 名插槽
    },
    {
      label: "操作",
      prop: "edit",
      align: "center",
      type: "slot"
    }
  ],
  // 群组管理表格头部字段配置
  groupManage: [
    {
      label: "成员",
      prop: "username",
      align: "center"
    },
    {
      label: "最后操作",
      prop: "joinDate",
      align: "center"
    },
    {
      label: "权限",
      prop: "roleName",
      align: "center"
    }
  ],
  // 全部共享表格头部字段配置
  groupShare: [
    {
      label: "名称",
      prop: "name",
      align: "center"
    },
    {
      label: "共享人",
      prop: "username",
      align: "center"
    },
    {
      label: "共享时间",
      prop: "createData",
      align: "center"
    },
    {
      label: "操作",
      align: "center",
      prop: "edit",
      type: "slot"
    }
  ]
};
