<template>
<div>
  <el-dialog :title="dialogStatus" :visible.sync="pageVisible" :close-on-click-modal="false" top="5vh" width="70%">
    <el-row :gutter="60">
      <el-col :span="6">
        <div style="margin-top: 10px;">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
        </div>
        <div style="border-top: 1px solid #ddd; margin-top:10px;">
          <el-tree :data="treeData" :props="defaultProps" accordion node-key="id" ref="tree" :filter-node-method="filterNode" highlight-current style="height: 500px; overflow: auto;" @node-click="handleNodeClick">
          </el-tree>
        </div>
      </el-col>

      <el-col :span="18" v-if="rightPanel">
        <el-form inline ref="searchForm" :model="searchInfo" class="form">
          <el-form-item label="用户名">
            <el-input clearable v-model="searchInfo.userName" style="width: 140px" placeholder="请输入用户名"></el-input>
          </el-form-item>
            <el-form-item label="登录名">
              <el-input clearable v-model="searchInfo.loginId" style="width: 140px" placeholder="请输入登录名"></el-input>
            </el-form-item>
          <el-button type="primary" icon="el-icon-search" circle @click="getTableData"></el-button>
          <el-button type="primary" icon="el-icon-refresh" circle @click="refreshInput"></el-button>
        </el-form>
        <el-table-pagination :showPagination="false" ref="table" :showDetailData="false" :data="tableData" @current-change="currentChange" highlightCurrentRow height='450px' :columns="columns" :page-sizes="[15, 30, 50]" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
          <!-- <el-table-column slot="prepend" type="selection" width="55"></el-table-column> -->
          <el-table-column slot="prepend" type="index" width="55"></el-table-column>
          <el-table-column slot="prepend" align="center" width="80" label="选择">
            <template slot-scope="props">
                <span class="tran_box">
                   <el-checkbox v-model="props.row.selected"></el-checkbox>
                </span>
            </template>
          </el-table-column>
        </el-table-pagination>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSave">确定</el-button>
      <el-button @click="pageVisible = false">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import API from "@/api";
import ElTablePagination from "@/components/table-pagination";
export default {
  data() {
    return {
      pageVisible: false,
      dialogStatus: '添加处理人',
      filterText: "", // 树过滤输入框输入文本
      treeData: [], // 树形数据
      defaultProps: {
        children: "childOrgInfo",
        label: "orgName"
      },
      textMap: {
        // tree 添加/编辑
        update: "Edit",
        create: "Create"
      },
      treeDialogStatus: "",
      treeDialogFormVisible: false,
      treeFormInfo: {
        code: null,
        name: null,
        remark: null,
        parentId: null
      },
      tableData: [],
      invCodeData: [], // 下拉框所需数据
      // invTypeData: [],
      stockList: [], // 仓库列表
      columns: [{
          label: "姓名",
          prop: "userName",
          align: "center"
        },
        {
          label: "部门",
          prop: "orgName",
          align: "center",
          showOverflowTooltip: true
        }
      ],
      rightPanel: false,
      selectionData: [],
      id: null,
      classCode: null,
      searchInfo: {
        userName: '',
        loginId: ''
      },
      tableDialogStatus: null,
      tableDialogFormVisible: false,
      total: null,
    };
  },
  created() {},
  components: {
    ElTablePagination
  },
  watch: {
    // 字典树过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    init(type) {
      this.pageVisible = true
      this.getTreeList(type)
    },
    dataFormSave() {
      this.pageVisible = false
      this.$emit('doRelay', this.selectionData)
    },
    getTreeList(type) {
      let ret = API.common.getOrganizationInfo()

      ret.then(({
        data
      }) => {
        if (data && data.success) {
          this.treeData = data.data
        }
      })
    },
    // 字典树过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    // 树形子节点
    handleNodeClick(nodeData) {
      if (!nodeData.childOrgInfo || !nodeData.childOrgInfo.length) {
        this.rightPanel = true;
        this.id = nodeData.id;
        // this.classCode = nodeData.code;
        this.getTableData();
      } else {
        this.rightPanel = false;
      }
    },
    currentChange(val) {
      this.selectionData = val;
      this.tableData.map((item) => {
        if (val.userId == item.userId) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
      // this.$emit('currentChange', val)
    },

    refreshInput() {
      this.searchInfo.userName = ''
      this.searchInfo.loginId = ''
      this.getTableData()
    },
    // table list
    getTableData() {
      API.common.getUserInfoByOrgId(`orgId=${this.id}&userName=${this.searchInfo.userName}&loginId=${this.searchInfo.loginId}`).then(({
        data
      }) => {
        if (data && data.success) {
          this.tableData = data.data.map((item) => {
            item.selected = false
            return item
          })
          // this.invCodeData = data.data
          this.total = data.data.length
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getTableData();
    },
  }
};
</script>

<style lang="scss">
.form .el-form-item {
    margin-bottom: 10px;
}
</style>
