export const schemaContent: ISchemaItem[] = [
  { component: "div", inner: "这是一个div" },
  { component: "h1", inner: "这是一个标题", layout: { span: { value: "10", type: "number" } } },
  {
    component: "NInput",
    label: { expression: "{type}", type: "string" },
    type: "textarea",
    layout: { span: { value: "5", type: "number" } },
    path: "remark",
  },
  {
    component: "NSelect",
    label: "选择歌曲",
    path: "song",
    layout: { span: { value: "3", type: "number" } },
    options: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: "song0",
        disabled: true,
      },
      { label: "Drive My Car", value: "song1" },
      { label: "Norwegian Wood", value: "song2" },
      { label: "You Won't See", value: "song3", disabled: true },
      { label: "Nowhere Man", value: "song4" },
      { label: "Think For Yourself", value: "song5" },
    ],
  },
  {
    component: "NSelect",
    label: "性别",
    path: "gender",
    layout: { span: { value: "2", type: "number" } },
    options: [
      { label: "女", value: 0 },
      { label: "男", value: 1 },
    ],
  },
  {
    show: { type: "boolean", expression: "{gender} = 1" },
    component: "NInput",
    label: "薪资多少",
    path: "income",
  },
];
