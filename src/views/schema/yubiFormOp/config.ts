export const schemaContent: ISchemaItem[] = [
  { component: "div", inner: "这是一个div" },
  { component: "h1", inner: "这是一个标题", layout: { span: 10 } },
  {
    component: "NInput",
    label: { expression: "{type}", value: '默认标题'},
    type: "textarea",
    layout: { span: 5 },
    path: "remark",
  },
  {
    component: "NSelect",
    label: "选择歌曲",
    path: "song",
    layout: { span: 3 },
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
    layout: { span: 2 },
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


export const itemEditContent: ISchemaItem[] = [
  {
    component: 'NInput',
    path: 'path',
    label: '字段',
    layout: {
      span: 4
    },
  },
  {
    component: 'ExpressionWrap',
    innerComponent: 'NInput',
    path: 'label',
    label: '表单项标题',
    layout: {
      span: 4,
      offset: 1,
    },
  },
  {
    component: 'ExpressionWrap',
    innerComponent: 'NInput',
    path: 'inner',
    label: '内容',
    layout: {
      span: 4,
    },
  },
  {
    component: 'NSelect',
    path: 'component',
    label: '组件',
    filterable: true,
    tag: true,
    layout: {
      offset: 1,
      span: 4
    },
    options: [
      {
        label: '输入框',
        value: 'NInput',
      },
      {
        label: '选择器',
        value: 'NSelect',
      },
      {
        label: '单选框',
        value: 'NRadio',
      },
      {
        label: '开关',
        value: 'NSwitch',
      },
      {
        label: '复选框',
        value: 'Checkbox',
      },
      {
        label: '日期选择器',
        value: 'NDatePicker',
      }
    ]
  },
  {
    component: 'NInputNumber',
    path: 'layoutSpan',
    label: 'Span',
    max: 10,
    min: 1,
    defaultValue: 2,
    style: {
      width: '100%'
    },
    layout: {
      span: 4
    }
  },
  {
    component: 'NInputNumber',
    path: 'layoutOffset',
    label: '偏移',
    max: 10,
    min: 0,
    defaultValue: 2,
    style: {
      width: '100%'
    },
    layout: {
      offset: 1,
      span: 4
    }
  },
];


export const expressionEditContent: ISchemaItem[] = [
  {
    component: 'NInput',
    path: 'value',
    label: '默认值',
    layout: {
      span: 10
    },
  },
  {
    component: 'NInput',
    path: 'expression',
    label: '表达式',
    layout: {
      span: 10,
    },
  },
  {
    component: 'NSelect',
    path: 'type',
    label: '数据类型',
    layout: {
      span: 10
    },
    options: [
      {
        label: '数字',
        value: 'number',
      },
      {
        label: '字符串',
        value: '',
      },
      {
        label: '布尔值',
        value: 'boolean',
      },
    ]
  },
];