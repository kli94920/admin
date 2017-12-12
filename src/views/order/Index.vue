<template>
  <div class="p-order">
    <div class="action-bar">
      <div class="action-bar--left">
        <el-input placeholder="订单ID/电话/姓名/航班号" v-model="page.keyword"></el-input>
        <el-select v-model="page.status" placeholder="订单状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="info" @click="queryData(1)" style="position:relative;top:-14px;">查询</el-button>
      </div>
    </div>
    <div style="margin-bottom:15px;">
      <span style="display:inline-block;margin-right:20px;">提车时间：</span>
      <el-radio-group v-model="page.fromDateType" @change="queryData(1)">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">昨天</el-radio>
        <el-radio :label="2">今天</el-radio>
        <el-radio :label="3">明天</el-radio>
        <el-radio :label="4">24小时内</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-bottom:15px;">
      <span style="display:inline-block;margin-right:20px;">还车时间：</span>
      <el-radio-group v-model="page.toDateType" @change="queryData(1)">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">昨天</el-radio>
        <el-radio :label="2">今天</el-radio>
        <el-radio :label="3">明天</el-radio>
        <el-radio :label="4">24小时内</el-radio>
      </el-radio-group>
    </div>
    <el-table :data="list" border>
      <el-table-column label="订单编号">
        <template scope="scope">
          <router-link :to="{path:'/order/detail/'+scope.row.id}">{{scope.row.id}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="提车">
        <template scope="scope">
          {{scope.row.fromDate | date}}
        </template>
      </el-table-column>
      <el-table-column label="还车">
        <template scope="scope">
          {{scope.row.toDate | date}}
        </template>
      </el-table-column>
      <el-table-column prop="car.title" label="出租汽车">
      </el-table-column>
      <el-table-column label="客户" width="130">
        <template scope="scope">
          <div>{{scope.row.driver.realName}}</div>
          <div>{{scope.row.driver.secondName}} {{scope.row.driver.firstName}}</div>
          <div>{{scope.row.driver.phoneNumber}}</div>
          <div>{{scope.row.others.flightNumber}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="总金额（元）" width="80">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          <span>{{statusOptions.find(x=>x.value===scope.row.status).text}}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务">
        <template scope="scope">
          <span>{{scope.row.insurance.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template scope="scope">
          <router-link :to="{path:'/order/edit/'+scope.row.id}">
            <el-button size="mini" type="info">编辑</el-button>
          </router-link>
          <el-button v-if="scope.row.status===1" size="mini" type="danger"
            @click="onDelete(scope.$index, scope.row)">删除</el-button>
          <el-button v-if="scope.row.status===10" size="mini" type="danger"
            @click="onRefund(scope.$index, scope.row)">退款</el-button>
          <el-button v-if="scope.row.status===10" size="mini" type="danger"
            @click="onReady(scope.$index, scope.row)">备车</el-button>
          <el-button v-if="scope.row.status===11" size="mini" type="danger"
            @click="onFinished(scope.$index, scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="page.total" layout="prev, pager, next, total"
      :page-size="20" :total="page.total" :current-page="page.page"
      @current-change="queryData">
    </el-pagination>
  </div>
</template>

<script>
import { dataApi, orderApi } from '../../api'
export default {
  data() {
    return {
      page: {
        total: 0,
        page: 1,
        size: 20,
        keyword: '',
        status: '',
        fromDateType: 0,
        toDateType: 0
      },
      list: [],
      statusOptions: []
    }
  },
  mounted() {
    this.queryData(1)
    dataApi.getEnums().then(data => {
      this.statusOptions = [{ value: '', text: '' }].concat(data.orderStatuses)
    })
  },
  methods: {
    queryData(current) {
      this.page.page = current || 1
      orderApi.get(this.page).then(data => {
        if (current === 1) {
          this.page.total = data.total
        }
        this.list = data.list
      })
    },
    onDelete(index, row) {
      this.$confirm('此操作无法撤回, 是否继续?', '提示').then(() => {
        this.$api.deleteOrder(row.id).then(x => {
          this.list.splice(index, 1)
          this.$message.success('删除成功!')
          this.queryData(1)
        })
      })
    },
    onRefund(index, row) {
      this.$confirm('此操作无法撤回, 是否继续?', '提示').then(() => {
        this.$api.orderRefund(row.id).then(x => {
          alert('已发起退款，请到支付宝商户中心进行后续操作!')
          this.queryData(1)
        })
      })
    },
    onReady(index, row) {
      this.$confirm('此操作无法撤回, 是否继续?', '提示').then(() => {
        this.$api.orderReady(row.id).then(x => {
          this.$message.success('备车成功!')
          this.queryData(1)
        })
      })
    },
    onFinished(index, row) {
      this.$confirm('此操作无法撤回, 是否继续?', '提示').then(() => {
        this.$api.orderFinished(row.id).then(x => {
          this.$message.success('已完成!')
          this.queryData(1)
        })
      })
    }
  }
}
</script>

<style>
.p-order .el-button + .el-button {
  margin-left: 0;
}

.p-order .el-radio__inner {
  border-radius: 5px !important;
}

.p-order .el-radio__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.p-order .el-radio__inner::after {
  box-sizing: content-box;
  content: '';
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  background-color: #20a0ff;
  border-radius: 0;
  height: 8px;
  left: 5px;
  position: absolute;
  top: 1px;
  -ms-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 4px;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
  -ms-transform-origin: center;
  transform-origin: center;
}

.p-order .el-radio__input.is-checked .el-radio__inner::after {
  -ms-transform: rotate(45deg) scaleY(1);
  transform: rotate(45deg) scaleY(1);
}

.p-order .el-radio-group .el-radio:not(:first-child) {
  margin-left: 70px;
}
</style>
