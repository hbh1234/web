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
      type: "slot",
      align: "center"
    }
  ]
};
