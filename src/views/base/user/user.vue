<template>
  <div>
    <fieldset ref="fieldset">
      <legend>
        <span>搜索条件</span>
      </legend>
      <el-form inline ref="searchForm" :model="searchInfo">
        <el-form-item label="姓名" prop="name">
          <el-input class="filter-item" clearable v-model="searchInfo.name" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input class="filter-item" clearable v-model="searchInfo.tel" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input class="filter-item" clearable v-model="searchInfo.email" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select
            clearable
            filterable
            class="filter-item"
            v-model="searchInfo.gender"
            style="width: 160px"
          >
            <el-option label="全部" value></el-option>
            <el-option
              :label="item.text"
              :value="item.code"
              v-for="(item, index) in genderList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            filterable
            clearable
            class="filter-item"
            v-model="searchInfo.status"
            style="width: 100%"
          >
            <el-option label="全部" value></el-option>
            <el-option
              :label="item.text"
              :value="item.code"
              v-for="(item, index) in statusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" circle @click="getList"></el-button>
        <el-button type="primary" icon="el-icon-refresh" circle @click="resetForm"></el-button>
      </el-form>
    </fieldset>

    <div style="margin-top: 20px; border-top: 1px solid #ddd">
      <p>
        <el-button type="primary" icon="fa fa-plus" @click="handleAdd">新增</el-button>
      </p>

      <el-table-pagination
        ref="table"
        :columns="columns"
        :data="tableData"
        :showPagination="showPagination"
        highlightCurrentRow
        :height="450"
        :page-sizes="[20, 50, 100]"
        :total="total"
        :showDetailData="false"
        @current-change="currentChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column slot="prepend" type="index" width="35"></el-table-column>

        <el-table-column slot="append" fixed="right" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEnable(scope.row)"
              :class="{'disable': scope.row.status === 0}"
            >{{scope.row.status === 1 ? '禁用': '启用'}}</el-button>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color: #f56c6c" @click="removeData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table-pagination>
    </div>

    <edit-user
      v-if="addOrEditVisible"
      ref="addOrEdit"
      @refreshDataList="getList"
      :genderList="genderList"
      :statusList="statusList"
    ></edit-user>
  </div>
</template>

<script>
  import ElTablePagination from "@/components/table-pagination";
  import EditUser from "./edit-user";
  import API from "@/api";
  import { getDicData } from "@/utils/dicData";
  export default {
    data() {
      return {
        searchInfo: {
          name: "",
          tel: "",
          email: "",
          status: "",
          gender: ""
        },
        selectionData: [], //保存表格选中数据
        showPagination: true,
        total: 0, // 表格数据总数
        listQuery: {
          page: 1,
          rows: 20
        },
        tableData: [],
        columns: [
          {
            label: "姓名",
            prop: "name"
          },
          {
            label: "手机号",
            prop: "tel"
          },

          {
            label: "邮箱",
            prop: "email"
          },
          {
            label: "性别",
            prop: "gender",
            render: row => {
              let obj = this.genderList.find(el => {
                return parseInt(el.code) === row.gender;
              });
              return obj ? obj.text : "";
            }
          },
          {
            label: "状态",
            prop: "status",
            width: 80,
            render: row => {
              let obj = this.statusList.find(el => {
                return parseInt(el.code) === row.status;
              });
              return obj ? obj.text : "";
            }
          }
        ],
        addOrEditVisible: false,
        genderList: [], // 性别列表
        statusList: [] // 状态列表
      };
    },
    created() {
      this.getSelectList();
    },
    activated() {
      this.resetForm();
    },
    components: {
      ElTablePagination,
      EditUser
    },
    methods: {
      resetForm() {
        // 重置搜索条件
        this.$refs["searchForm"].resetFields();
        // 重置分页 (注: 回 自动执行 搜索)
        this.showPagination = false;

        this.$nextTick(() => {
          this.handleCurrentChange(1);
          this.showPagination = true;
        });
      },
      async getList() {
        let formData = Object.assign(this.searchInfo, this.listQuery);
        let res = await API.user.list(
          `name=${formData.name}&tel=${formData.tel}&email=${
            formData.email
          }&status=${formData.status}&gender=${formData.gender}&page=${
            formData.page
          }&rows=${formData.rows}`
        );
        if (res.data) {
          this.tableData = res.data.data;
          this.total = res.data.count;
        }
      },
      async getSelectList() {
        this.genderList = await getDicData("gender");
        this.statusList = await getDicData("status");
      },
      currentChange(val) {
        this.selectionData = val;
      },
      // 每页数量改变
      handleSizeChange(val) {
        this.listQuery.rows = val;
        this.getList();
      },
      // 页数改变
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      // 禁用
      async handleEnable(row) {
        let data = await API.user.setStatus({
          status: row.status === 0 ? 1 : 0,
          id: row.id
        });
        if (data && data.data.success) {
          this.getList();
        }
      },
      // 新增
      handleAdd() {
        this.addOrEditVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrEdit.init("create");
        });
      },
      // 编辑
      handleEdit(row) {
        this.addOrEditVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrEdit.init("update", row);
        });
      },
      // 明细
      handleDetails(row) {
        this.addOrEditVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrEdit.init("details", row);
        });
      },
      // 删除
      removeData(row) {
        let key = row.id;
        this.$confirm("是否确定删除该项数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          tyle: "warning"
        })
          .then(() => {
            this.removeReq(key);
          })
          .catch(() => {});
      },
      async removeReq(key) {
        let data = await API.user.del({ id: key });
        if (data && data.data.success) {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .disable {
    color: #f56c6c;
  }
</style>
