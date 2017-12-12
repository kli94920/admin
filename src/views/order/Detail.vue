<template>
  <div class="order-detail">
    <div class="detail">
      <h3>订单总金额：
        <span style="color:#f00;">￥{{orderData.amount}}</span>
      </h3>
      <el-card :body-style="{ padding: '0px' }" class="widget">
        <div class="card-left">
          <img :src="orderData.car.coverUrl">
        </div>
        <div class="card-right">
          <h3>{{orderData.car.carBrand.name}} {{orderData.car.carModel}}
            <span v-if="orderData.car.autoTransmission" style="font-size:14px;">自动挡</span>
            <span v-else style="font-size:14px;">手动挡</span>
            <span style="font-size:14px;">{{orderData.car.seatCount}}座</span>
          </h3>
          <ul class="basic-info">
            <li>订单编号：{{orderData.id}}</li>
            <li>车门数：{{orderData.car.doorCount}}门</li>
            <li>取车日期：{{orderData.fromDate | dateTime}}</li>
            <li>还车日期：{{orderData.toDate | dateTime}}</li>
            <li>租赁者：{{orderData.phoneNumber}}</li>
            <li>应付款：{{orderData.amount}}元</li>
          </ul>
          <p class="car-fee">车辆租金：￥{{orderData.carFee}}</p>
        </div>
      </el-card>
      <div class="widget taocan">
        <div class="widget-header">
          <el-tag>套餐包含</el-tag>
        </div>
        <div class="widget-body insurance">
          <div class="widget-header">
            <el-tag type="gray">保险明细</el-tag>
            <h5>保险费用：￥{{orderData.insuranceFee}}</h5>
          </div>
          <div class="widget-body">
            <h4>车损盗窃险
              <small>（保自己的车）</small>
            </h4>
            <p class="insurance-item">
              <i class="el-icon-check"></i>碰撞险：在正常驾驶租赁车辆期间发生碰撞时，所产生的车损费用（除车顶、底盘以外）将由保险公司全额负责。</p>
            <p class="insurance-item">
              <i class="el-icon-check"></i>盗窃险：车辆在租期内被盗，或因被盗窃造成的车辆损坏等，将由保险公司全额负责。</p>
          </div>
          <div class="widget-body">
            <h4>第三者责任险
              <small>（保被撞的车及人）</small>
            </h4>
            <p class="insurance-item">
              <i class="el-icon-check"></i>加强型第三者责任险： 加强型第三者责任险在正常驾驶租赁车辆期间因意外事故，致使第三者遭受人身伤亡或财产损失，可获得保险公司给予保额以内的赔偿。最高赔付100万美元。</p>
          </div>
          <div class="widget-body" v-show="orderData.insuranceId==2">
            <h4>人身险和财物险
              <small>（保车上人员及个人财物）</small>
            </h4>
            <p class="insurance-item">
              <i class="el-icon-check"></i>人身意外险： 主驾驶员及车内乘客在正常驾驶租赁车辆期间，因意外造成身体伤害所带来的医疗费用，保额内将由保险公司承担。</p>
            <p class="insurance-item">
              <i class="el-icon-check"></i>个人财物险： 对主驾驶员在租赁过程中所携带的个人物品（如相机、电脑等）进行投保，能减少租车期间车内个人财物丢失的损失。</p>
          </div>
          <div class="widget-body" v-show="orderData.insuranceId==2">
            <h4>超级补充全险
              <small>（EZ租车提供，保障更全面）</small>
            </h4>
            <p class="insurance-item">
              <i class="el-icon-check"></i>由国内顶尖保险公司安盛保险提供，比租车公司全险保障范围更全面。承担包括道路救援费用、玻璃轮胎底盘损坏费用、因客观原因导致行程取消的租车/酒店/机票费用损失等，租租车全程协助理赔。</p>
          </div>
          <div class="widget-body">
            <p class="insurance-item">如订单中包含的保险(
              <i class="el-icon-check"></i>部分)未能满足您的要求，您可以在门店办理取车手续时增加购买其他增值补充保险，具体费用以门店实时报价为准！</p>
          </div>
        </div>
        <div class="widget-body rent">
          <div class="widget-header">
            <el-tag type="gray">租金及服务费用</el-tag>
            <h5 v-show="orderData.mileageId==1">无限里程：￥{{orderData.mileageFee}}</h5>
            <h5 v-show="orderData.mileageId==2">有限里程：￥{{orderData.mileageFee}} （共{{orderData.mileage}}公里）</h5>
          </div>
          <div class="widget-body">
            <ul class="rent-fee">
              <li>
                <i class="icons icon-pin"></i>车辆租金</li>
              <li>
                <i class="icons icon-pin"></i>税费</li>
              <li v-show="orderData.mileageId === 1">
                <i class="icons icon-pin"></i>无限里程</li>
            </ul>
          </div>
        </div>
        <div class="widget-body oil-remark">
          <div class="widget-header">
            <el-tag type="gray">燃油说明</el-tag>
          </div>
          <div class="widget-body">
            <p>满油取还：满油取车，满油还车</p>
            <h6>取车时油箱已加满，还车时也得把油箱加满，否则租车公司将会收取未加满部分的燃油费用以及工作人员去加油的工时费。
              <span class="notice">请保留最后一次加油时的单据以备用。</span>
            </h6>
            <h6>注意：在某些特殊情况下您取车时油箱可能不是满的，您还车时只要保证油量和取车时一致即可。</h6>
          </div>
        </div>
      </div>
      <div class="widget driver-info">
        <div class="widget-header">
          <el-tag>驾驶员信息</el-tag>
          <h5>
            <span v-show="orderData.dlTranslatorFee">翻译件费用：￥{{orderData.dlTranslatorFee}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>多人驾驶费用：￥{{orderData.additionalDriverFee}}</span>
          </h5>
        </div>
        <div class="widget-body">
          <ul>
            <li>姓：{{orderData.secondName}}</li>
            <li>名：{{orderData.firstName}}</li>
            <li>出生年份：{{orderData.birthYear}}年</li>
            <li>驾照类型： {{orderData.dlType.text}}
              <span v-show="orderData.hasDLTranslator">（已有翻译件）{{orderData.dlTranslatorType.text}}</span>
            </li>
            <li>多人驾驶费用：￥{{orderData.additionalDriverFee}}</li>
          </ul>
        </div>
      </div>
      <div class="widget other-info">
        <div class="widget-header">
          <el-tag>其他信息</el-tag>
        </div>
        <div class="widget-body">
          <ul>
            <li v-if="!orderData.childSeat">儿童座椅：无</li>
            <li v-else>儿童座椅：婴儿座椅：{{orderData.childSeat1}}个 &nbsp;儿童座椅：{{orderData.childSeat2}}个 &nbsp;儿童增高坐垫 : {{orderData.childSeat3}}个</li>
            <li>航班号：
              <span v-if="orderData.flightNumber">{{orderData.flightNumber}}</span>
              <span v-else>无</span>
            </li>
            <li>航班起飞日期：
              <span v-if="orderData.flightDate">{{orderData.flightDate | date}}</span>
              <span v-else>无</span>
            </li>
            <li>需要跨境：
              <span v-if="orderData.crossBorder">是</span>
              <span v-else>否</span>
            </li>
            <li>备注：
              <span v-if="orderData.remark">{{orderData.remark}}</span>
              <span v-else>无</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      id: this.$route.params.id,
      orderData: { car: { carBrand: {} }, dlType: {}, dlTranslatorType: {} },
      orderInfo: {
        insuranceId: 2,
        mileageId: 1
      }
    }
  },
  mounted() {
    this.onQuery(this.id)
  },
  methods: {
    onQuery(id) {
      this.$api.getOrderDetail(id).then(data => {
        this.orderData = data
      })
    }
  }
}

</script>
<style scoped>
h3 {
  font-weight: normal;
}

h4 {
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 10px;
}

.taocan h5,
.driver-info h5 {
  float: right;
  color: #f00;
  margin: 0;
  font-weight: normal;
}

.el-icon-check {
  font-size: 12px;
  color: #a0d468;
  margin-right: 10px;
}

.widget {
  padding: 10px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  margin-bottom: 15px;
}

.widget-header {
  margin-bottom: 10px;
}

.widget-body {
  padding: 10px;
}

.el-card {
  padding: 10px;
}

.el-card img {
  width: 200px;
  height: 128px;
  vertical-align: bottom;
}

.el-card {
  position: relative;
}

.el-card .card-left {
  display: inline-block;
}

.el-card .card-right {
  position: absolute;
  top: 10px;
  left: 230px;
  width: 80%;
  height: 130px;
}

.el-card .car-fee {
  color: #f00;
  position: absolute;
  bottom: 0;
  right: 0;
}

.basic-info,
.rent-fee {
  list-style: none;
  padding-left: 0;
  color: #333;
}

.basic-info li {
  display: inline-block;
  width: 30%;
}

.rent-fee {
  margin-top: 0;
}

.rent-fee li {
  display: inline-block;
  margin-right: 30px;
}

.rent-fee i {
  margin-right: 10px;
  color: #a0d468;
  font-weight: bold;
  font-size: 12px;
}

.insurance-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.oil-remark p,
.oil-remark h6 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.oil-remark h6 {
  font-weight: normal;
}

.oil-remark .notice {
  color: #f00;
}

.rent .widget-header,
.oil-remark .widget-header {
  margin-bottom: 0;
}

.insurance .widget-header {
  margin-bottom: 0;
}

.insurance .widget-body {
  padding-bottom: 0;
}

.oil-remark .widget-body {
  padding-top: 0;
}

.driver-info ul,
.other-info ul {
  list-style: none;
}
</style>
