const checkBirthYear = (rule, value, callback) => {
  if (!value) {
    callback(new Error('出生年份不能为空'))
    return
  }
  if (
    parseInt(value) > new Date().getFullYear() - 20 ||
    parseInt(value) < new Date().getFullYear() - 70
  ) {
    callback(new Error('租车年龄限制：20 ~ 70 周岁'))
    return
  }
  callback()
}

export default {
  rules1: {
    status: [
      { type: 'number', required: true, message: '请选择订单状态', trigger: 'change' }
    ],
    fromDate: [
      { type: 'date', required: true, message: '请选择提车日期', trigger: 'change' }
    ],
    toDate: [
      { type: 'date', required: true, message: '请选择还车日期', trigger: 'change' }
    ],
    carId: [
      { required: true, message: '请选择车辆' },
      { type: 'number', message: '请选择车辆' }
    ]
  },
  rules2: {
    realName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
    phoneNumber: [
      { required: true, message: '手机号码不能为空', trigger: 'blur' }
      // { pattern: /^\d{8,12}$/, message: '电话号码格式不正确', trigger: 'blur' }
    ]
  },
  rules3: {
    firstName: [{ required: true, message: '姓不能为空', trigger: 'blur' }],
    secondName: [{ required: true, message: '名不能为空', trigger: 'blur' }],
    birthYear: [{ validator: checkBirthYear, trigger: 'blur' }]
  }
}
