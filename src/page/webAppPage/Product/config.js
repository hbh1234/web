/*hzw-table 配置参数*/
export default {
  productHead: [
    {
      label: "产品名称",
      prop: "prodName",
      width: "280",
      type: "slot", // 插槽
      class: "prodName", // 定义单元格class
      slotName: "prodName" // 插槽名称
    },
    {
      label: "License有效期",
      prop: "licenseExpireDate",
      type: "slot", // 插槽
      slotName: "licenseExpireDate", // 插槽名称
      align: "center"
    },
    {
      label: "版本信息",
      prop: "isCloud",
      width: "90",
      align: "center"
    },
    {
      label: "开始使用时间",
      prop: "startDate",
      align: "center",
      type: "slot",
      slotName: "startDate"
    },
    {
      label: "操作",
      width: 190,
      prop: "edit",
      align: "center",
      type: "slot",
      slotName: "edit"
    }
  ]
};
