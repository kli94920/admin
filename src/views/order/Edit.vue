<template>
  <div class="p-order-edit">
    <div class="steps">
      <el-steps :space="220" :active="step" finish-status="success">
        <el-step title="租赁详情"></el-step>
        <el-step title="客户信息"></el-step>
        <el-step title="驾驶信息"></el-step>
        <el-step title="航班信息"></el-step>
      </el-steps>
    </div>
    <el-row :gutter="20">
      <el-col :span="14">
        <div v-show="step==0" class="box">
          <div class="box-title">租赁详情</div>
          <el-form ref="form1" :rules="rules1" :model="form" label-width="80px"
            style="padding:15px 40px;">
            <el-form-item label="订单状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="待支付" :value="1"></el-option>
                <el-option label="已支付" :value="10"></el-option>
                <el-option label="已备车" :value="11"></el-option>
                <el-option label="已完成" :value="20"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆" prop="carId">
              <el-select v-model.number="form.carId" filterable placeholder="请选择"
                @change="onCarSelect">
                <el-option v-for="item in cars" :key="item.id" :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提车日期" prop="fromDate">
              <el-date-picker type="date" placeholder="请选择" v-model="form.fromDate"
                @change="calcFee" :picker-options="fromDateOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="还车日期" prop="toDate">
              <el-date-picker type="date" placeholder="请选择" v-model="form.toDate"
                @change="calcFee" :picker-options="toDateOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="保险套餐" prop="insuranceId">
              <el-radio-group v-model="form.insuranceId" @change="calcFee">
                <el-radio v-for="item in configs.insurances" :key="item.id" :label="item.id">
                  {{item.name}}（{{item.price+'元/天'}}）
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div v-show="step==1" class="box">
          <div class="box-title">客户信息</div>
          <el-form ref="form2" :rules="rules2" :model="form" label-width="80px"
            style="padding:15px 40px;">
            <el-form-item label="称谓" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio v-for="item of enums.genders" :key="item.value" :label="item.value">
                  {{item.text}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phoneNumber">
              <el-input v-model="form.phoneNumber">
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div v-show="step==2" class="box">
          <div class="box-title">驾驶信息</div>
          <el-form ref="form3" :rules="rules3" :model="form" label-width="100px"
            style="padding:15px 20px 40px;">
            <el-form-item label="驾驶员姓名" required>
              <el-col :span="11">
                <el-form-item prop="firstName">
                  <el-input v-model="form.firstName" placeholder="姓(拼音或英文)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item prop="secondName">
                  <el-input v-model="form.secondName" placeholder="名(拼音或英文)"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="出生年份" prop="birthYear" required>
              <el-input v-model.number="form.birthYear" type="number"></el-input>
            </el-form-item>
            <el-form-item label="驾驶证类型" prop="dLType">
              <el-radio-group v-model="form.dLType">
                <el-radio :label="1">中国驾照</el-radio>
                <el-radio :label="2">香港驾照</el-radio>
                <el-radio :label="3">美国驾照</el-radio>
                <el-radio :label="4">加拿大驾照</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.dLType==1" label="翻译件" prop="hasDLTranslator">
              <el-checkbox v-model="form.hasDLTranslator">已有翻译件，无需再办理</el-checkbox>
              <div v-show="!form.hasDLTranslator">
                <el-radio-group v-model="form.dLTranslator">
                  <el-radio :label="1">加拿大当地驾照翻译件</el-radio>
                  <el-radio :label="2">英文公证件</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="额外驾驶员 " prop="extraDrivers">
              <el-input-number v-model="form.extraDrivers" :min="0" :max="10"
                @change="calcFee"></el-input-number>
            </el-form-item>
          </el-form>
        </div>

        <div v-show="step==3" class="box">
          <div class="box-title">航班信息</div>
          <el-form ref="form4" :model="form" label-width="80px" style="padding:15px 40px;">
            <el-form-item label="航班号" prop="flightNumber">
              <el-input v-model="form.flightNumber"></el-input>
            </el-form-item>
            <el-form-item label="起飞日期" prop="flightDate">
              <el-date-picker type="date" placeholder="请选择" v-model="form.flightDate"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="box" style="height:450px;">
          <div class="box-title">价格（元）</div>
          <table class="price-table">
            <tbody>
              <tr class="line">
                <th>租期</th>
                <td>{{fees.days}} 天 <br/>
                  <small> {{fees.days}} 天 x {{fees.carPrice | price}}</small>
                </td>
              </tr>
              <tr>
                <th>车辆租金</th>
                <td>{{fees.carFee | price}}</td>
              </tr>
              <tr>
                <th>保险套餐费</th>
                <td>{{fees.insuranceFee | price}}</td>
              </tr>
              <tr>
                <th>无限里程费</th>
                <td>{{fees.mileageFee | price}}</td>
              </tr>
              <tr class="line">
                <th>多人驾驶费</th>
                <td>{{fees.extraDriverFee | price}}</td>
              </tr>
              <tr>
                <th style="color:red;">总金额</th>
                <td style="color:red;">{{form.amount | price}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
    </el-row>
    <div class="clearfix"></div>
    <el-button @click="prev" :disabled="step==0">上一步</el-button>
    <el-button @click="next" :disabled="step==3">下一步</el-button>
    <el-button v-if="step==3" type="primary" @click="submit">创建订单</el-button>
  </div>
</template>

<script>
import moment from 'moment'
import { dataApi, orderApi, carApi } from '../../api'
import { formatDate } from '../../utils'
import editFormRules from './editFormRules'
const parseDate = date => {
  if (!date) return ''
  return moment(moment(date).format('YYYY-MM-DD'))
}

export default {
  data() {
    return {
      step: 0,
      fees: {
        days: 0,
        carPrice: 0,
        carFee: 0,
        insuranceFee: 0,
        mileageFee: 0,
        extraDriverFee: 0
      },
      form: {
        status: '',
        carId: '',
        fromDate: '',
        toDate: '',
        insuranceId: 1,
        remark: '',
        amount: 0,
        discount: 0,
        // driver
        realName: '',
        gender: 0,
        phoneNumber: '',
        firstName: '',
        secondName: '',
        birthYear: '',
        dLType: 1,
        hasDLTranslator: false,
        dLTranslator: 1,
        extraDrivers: 0,
        // others
        flightNumber: '',
        flightDate: ''
      },
      ...editFormRules,
      cars: [],
      configs: {},
      enums: {},
      fromDateOptions: {
        disabledDate: time => {
          let min = Date.now() - 8.64e7
          let max =
            this.form.toDate && typeof this.form.toDate === 'object'
              ? this.form.toDate.getTime()
              : new Date(2099, 1, 1).getTime()
          return (
            time.getTime() < min ||
            time.getTime() > max ||
            !this.isDateAvailable(time)
          )
        }
      },
      toDateOptions: {
        disabledDate: time => {
          let min =
            this.form.fromDate && typeof this.form.fromDate === 'object'
              ? this.form.fromDate.getTime()
              : Date.now() - 8.64e7
          let max = new Date(2099, 1, 1).getTime()
          return (
            time.getTime() < min ||
            time.getTime() > max ||
            !this.isDateAvailable(time)
          )
        }
      }
    }
  },
  methods: {
    calcFee() {
      // 天数
      if (!this.form.fromDate || !this.form.toDate) {
        this.fees.days = 0
      } else {
        let diff = moment(this.form.toDate).diff(
          moment(this.form.fromDate),
          'days'
        )
        if (diff <= 0) diff = 1
        this.fees.days = diff
      }
      // 车辆租金
      if (this.form.carId) {
        this.fees.carPrice = this.cars.find(x => x.id === this.form.carId).price
        this.fees.carFee = this.fees.carPrice * this.fees.days
      }
      // 保险套餐
      let insurance = this.configs.insurances.find(
        x => x.id === this.form.insuranceId
      )
      if (insurance) {
        this.fees.insuranceFee = insurance.price * this.fees.days
      }
      // 无限里程
      this.fees.mileageFee = this.configs.unlimitedMileageFee

      // 多人驾驶
      // 延时执行，input-number 组件 change 时 model 仍为旧值
      setTimeout(() => {
        this.fees.extraDriverFee =
          this.configs.extraDriverPrice *
          parseInt(this.form.extraDrivers) *
          this.fees.days
        this.calcTotal()
      }, 300)

      this.calcTotal()
    },
    calcTotal() {
      this.form.amount =
        this.fees.carFee +
        this.fees.insuranceFee +
        this.fees.mileageFee +
        this.fees.extraDriverFee
    },
    isDateAvailable(date) {
      if (!this.form.carId) return true
      return this.cars
        .find(x => x.id === this.form.carId)
        .availables.some(
          x =>
            parseDate(x.fromDate) <= parseDate(date) &&
            parseDate(x.toDate) >= parseDate(date)
        )
    },
    next() {
      this.$refs['form' + (this.step + 1)].validate(valid => {
        if (valid) {
          this.step++
        } else {
          return false
        }
      })
    },
    prev() {
      this.step--
    },
    onCarSelect() {
      this.form.fromDate = ''
      this.form.toDate = ''
      this.calcFee()
    },
    submit() {
      this.form.fromDate = formatDate(this.form.fromDate)
      this.form.toDate = formatDate(this.form.toDate)
      this.form.flightDate = formatDate(this.form.flightDate)
      orderApi.create(this.form).then(() => {
        this.$message.success('订单创建成功！')
        this.$router.push('/order')
      })
    }
  },
  async created() {
    this.cars = (await carApi.get({ page: 1, size: 999 })).list
    this.configs = await dataApi.getConfigs()
    this.calcFee()

    dataApi.getEnums().then(data => {
      this.enums = data
    })
  }
}
</script>

<style lang="stylus">
.p-order-edit {
  .box {
    width: unset;
    height: 450px;
  }

  .steps {
    padding: 20px 50px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    text-align: center;
  }

  .el-step__title {
    margin-left: -12px;
  }

  .el-form-item__content .el-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .el-radio {
    margin-right: 15px;
  }

  .el-radio + .el-radio {
    margin-left: 0;
  }

  .price-table {
    width: 100%;
    border-collapse: collapse;
  }

  .price-table th, .price-table td {
    vertical-align: top;
    padding: 12px 0;
  }

  .price-table th {
    text-align: left;
    font-weight: normal;
  }

  .price-table .line td, .price-table .line th {
    border-bottom: 1px solid #e3e3e3;
  }
}
</style>
