<template>
<el-dialog :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogVisible" top="15vh" width="40%">

  <el-form :rules="rules" ref="dataForm" :class="{formDetails:dialogStatus=='details'}" :model="dataInfo" label-width="80px" label-position="right" :disabled="dialogStatus === 'details' ? true : false">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dataInfo.name" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="dataInfo.tel" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataInfo.email" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select clearable filterable class="filter-item" v-model="dataInfo.gender" style="width: 100%">
            <el-option :label="item.text" :value="item.code" v-for="(item, index) in genderList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select clearable filterable class="filter-item" v-model="dataInfo.status" style="width: 100%">
            <el-option :label="item.text" :value="item.code" v-for="(item, index) in statusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button v-if="dialogStatus !== 'details'" @click="dataFormSubmit" type="primary">确定</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
  </div>
</el-dialog>
</template>

<script>
import API from '@/api'
export default {
  data() {
    return {
      textMap: {
        create: '新增用户',
        update: '编辑用户',
        details: '查看用户'
      },
      dialogStatus: null,
      dialogVisible: false,
      dataInfo: {
        id: null,
        gender: '0',
        status: '1',
        name: '',
        tel: '',
        email: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请填写姓名！'
        }],
        tel: [{
          required: true,
          message: '请填写手机号！'
        }, {
          pattern: /^1[34578]\d{9}$/,
          message: '请输入正确的手机号！'
        }],
        email: [{
          required: false
        }],
        gender: [{
          required: true,
          message: '请选择资质名称！'
        }],
        status: [{
          required: true,
          message: '请选择资质等级！'
        }]
      }
    }
  },
  props: {
    statusList: {
      type: Array,
      default: () => []
    },
    genderList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    init(status, transmitData) {
      this.dialogStatus = status;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
        if (status === 'create') {
          this.dataInfo.id = null;
        } else {
          // API.typeOfQualification.getInfoById(transmitData.id).then((data) => {
          //   if (data && data.success) {
          //     this.dataInfo = data.data
          //     this.dataInfo.positions = data.data.positions.split(',')
          //   }
          // })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataInfo.positions = this.dataInfo.positions.join(',')
          API.typeOfQualification.save(this.dataInfo).then(({
            data
          }) => {
            // if (data && data.success) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.dialogVisible = false;
                this.$emit('refreshDataList')
              }
            });
            // }
            // else {
            //   this.$message.error(data.message);
            // }
          });
        }
      })
    }
  }
}
</script>
