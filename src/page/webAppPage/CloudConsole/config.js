/*hzw-table 配置参数*/
export default {
  tableHeadParams: [
    {
      label: "软件实例",
      prop: "processName",
      type: "slot",
      slotName: "processName"
    },
    {
      label: "状态",
      prop: "status",
      type: "slot",
      slotName: "status",
      align: "center"
    },
    {
      label: "运行时长（时分）",
      prop: "duration",
      type: "slot",
      slotName: "duration",
      align: "center"
    },
    {
      label: "操作",
      type: "slot",
      align: "center"
    }
  ]
};
