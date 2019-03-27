<template>
<div>
  <el-row :gutter="60">
    <el-col :span="6">
      <div>
        <el-button type="primary" size="mini" @click="handleTreeCreate">添加</el-button>
        <el-button type="info" size="mini" @click="handleTreeUpdate">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleTreeRemove">删除</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-input
          size="small"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
      </div>
      <div style="border-top: 1px solid #ddd; margin-top:10px;">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          accordion
          node-key="id"
          ref="tree"
          :filter-node-method="filterNode"
          highlight-current
          @node-click="handleNodeClick">
        </el-tree>
      </div>
    </el-col>

    <el-col :span="18" v-if="rightPanel">
      <!-- <h2 style="margin: 0; padding: 0;"> {{ dictionaryName }}</h2> -->
      <!-- <hr style="margin-bottom: 10px;"> -->
      <div>
        <el-button type="primary" @click="handleTableAdd">添加</el-button>
        <el-button type="info" @click="handleTableEdit">编辑</el-button>
        <el-button type="danger" @click="handleTableRemove">删除</el-button>
        <!-- <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button> -->
      </div>
      <el-table-pagination
        :loading="loading"
        ref="table"
        :data="tableData"
        @current-change="currentChange"
        highlightCurrentRow
        :columns="columns"
        :page-sizes="[15, 30, 50]"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
        <!-- <el-table-column slot="prepend" type="selection" width="55"></el-table-column> -->
        <el-table-column slot="prepend" type="index" width="35"></el-table-column>
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
  <!-- 树状添加/编辑弹框 -->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
    <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="80px">
      <el-form-item label="id" hidden>
        <el-input v-model="temp.id" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input clearable v-model="temp.code" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input clearable v-model="temp.name" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input clearable v-model="temp.description" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="上级目录">
        <el-select clearable class="filter-item" v-model="temp.parentId" placeholder="请选择" style="width: 80%;">
          <el-option v-for="item in treeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="dialogStatus == 'create'" @click="createData" type="primary">确定</el-button>
      <el-button v-else @click="updateData" type="primary">确定</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </div>
  </el-dialog>
  <!-- 表格添加/编辑弹框 -->
  <el-dialog :title="textMap[tableDialogStatus]" :visible.sync="tableDialogFormVisible" width="30%">
    <el-form :rules="tableRules" ref="tableDataForm" :model="tableInfo" label-position="right" label-width="70px">
      <el-form-item label="id" hidden>
        <el-input v-model="tableInfo.id" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input clearable v-model="tableInfo.code" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="text">
        <el-input clearable v-model="tableInfo.text" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input clearable v-model="tableInfo.description" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序">
        <el-input-number v-model="tableInfo.orderSort" style="width: 80%;"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="tableDialogStatus == 'create'" @click="createTableData" type="primary">确定</el-button>
      <el-button v-else @click="updateTableData" type="primary">确定</el-button>
      <el-button @click="tableDialogFormVisible = false">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { mapMutations } from "vuex";
import API from "@/api";
import ElTablePagination from "@/components/table-pagination";
export default {
  name: "dictionary",
  data() {
    return {
      filterText: "", // 树过滤输入框输入文本
      rightPanel: false, // 右侧表格
      treeData: [], // 树形数据
      tableData: [], // 表格数据
      selectionData: [], //保存表格选中数据
      total: null, // 表格数据总数
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      defaultProps: {
        children: "childDictionariesInfo",
        label: "name"
      },
      appId: "0017F23F8B694F068738739DEB505666", // 平台码，目前固定，后期如需多平台系统接进则需要修改
      // tree
      dialogFormVisible: false, //控制tree弹框显示
      dialogStatus: "", // 树形菜单弹框状态 (添加/编辑)
      temp: {
        // tree弹框内表单
        code: "",
        name: "",
        description: "",
        parentId: "",
        id: ""
      },
      rules: {
        // tree弹框表单验证
        code: [
          { required: true, message: "code is required", trigger: "blur" }
        ],
        name: [{ required: true, message: "name is required", trigger: "blur" }]
      },
      textMap: {
        // tree 添加/编辑
        update: "修改",
        create: "添加"
      },
      columns: [
        // { label: "编码", prop: "code", minWidth: 40 },
        { label: "名称", prop: "text", minWidth: 140 },
        { label: "描述", prop: "description", minWidth: 140 },
        { label: "显示顺序", prop: "orderSort", minWidth: 140 }
      ],
      dictionaryName: "", // 字典名称，用于显示在表格上方
      tableDialogFormVisible: false, // 控制表格弹框显示
      tableDialogStatus: "", // 表格弹框状态
      dicGpId: "", //树节点ID，用于右侧字典表格数据参数操作
      tableInfo: {
        // 表格弹框表单信息
        id: "",
        code: "",
        text: "",
        description: "",
        orderSort: ""
      },
      tableRules: {
        // 表格弹框表单验证
        code: [
          { required: true, message: "code is required", trigger: "blur" }
        ],
        name: [{ required: true, message: "name is required", trigger: "blur" }]
      }
    };
  },
  created() {
    this.loadTreeData();
  },
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
    // 字典树过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 字典树节点点击
    handleNodeClick(nodeData) {
      if (nodeData.childDictionariesInfo.length == 0) {
        this.rightPanel = true;
        this.dicGpId = nodeData.id;
        this.dictionaryName = nodeData.name;
        this.loadTableData();
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.loadTableData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.loadTableData();
    },
    // 加载左侧树形数据
    loadTreeData() {
      API.dictionary.groupList('').then(({ data }) => {
        if (data && data.success) {
          this.treeData = data.data;
        } else {
          // TODO
        }
      });
    },
    // 加载右侧表格数据
    loadTableData() {
      const formData = `currentPage=${this.listQuery.pageNum}&pageSize=${this.listQuery.pageSize}&dictionaryId=${this.dicGpId}`
      // const formData = Object.assign(this.listQuery, { id: this.dicGpId });
      API.dictionary.dictionaryList(formData).then(({ data }) => {
        if (data && data.success) {
          // this.listLoading = false
          this.tableData = data.data.list.map((item) => {
            item.selected = false
            return item
          })
          this.total = data.data.total;
        } else {
        }
      });
    },
    // 单选
    currentChange(val) {
      this.selectionData = val
      this.tableData.map((item) => {
        if (val.id == item.id) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    // 清除弹框中表单数据
    resetTemp() {
      this.temp = {
        code: "",
        name: "",
        description: "",
        id: ""
      };
      this.tableInfo = {
        id: "",
        code: "",
        text: "",
        description: "",
        orderSort: ""
      };
    },
    // 左侧树形添加节点
    handleTreeCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 添加 提交数据
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // const tempData = Object.assign({ appId: this.appId }, this.temp);
          delete this.temp.id
          API.dictionary.group(this.temp).then(({ data }) => {
            if (data && data.success) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
              this.loadTreeData();
            }
          });
        }
      });
    },
    // 左侧树形编辑
    handleTreeUpdate() {
      if (this.$refs.tree.getCurrentNode()) {
        this.temp = Object.assign({}, this.$refs.tree.getCurrentNode());
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
      } else {
        this.$alert("请选择操作项", "注意", {
          confirmButtonText: "确定"
        });
      }
    },
    // 编辑 提交数据
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // const tempData = Object.assign({ appId: this.appId }, this.temp);
          API.dictionary.groupEdit(this.temp).then(({ data }) => {
            if (data && data.success) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
              this.loadTreeData();
            }
          });
        }
      });
    },
    // 左侧树形删除
    handleTreeRemove() {
      const key = this.$refs.tree.getCurrentKey();
      if (key) {
        this.$confirm("是否确定删除该项数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          tyle: "warning"
        })
          .then(() => {
            API.dictionary.groupRemove(key).then(({ data }) => {
              if (data && data.success) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success",
                  duration: 2000
                });
                this.loadTreeData();
              } else {
              }
            });
          })
          .catch(() => {});
      } else {
        this.$alert("请选择操作项", "注意");
      }
    },
    // 右侧表格选中事件
    handleCurrentChange(val) {
      this.selectionData = val;
    },
    // 右侧表格添加字典数据
    handleTableAdd() {
      this.resetTemp();
      this.tableDialogStatus = "create";
      this.tableDialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["tableDataForm"].clearValidate();
      });
    },
    // 字典添加弹框提交数据
    createTableData() {
      this.$refs["tableDataForm"].validate(valid => {
        if (valid) {
          const formData = Object.assign(
            { dictionaryId: this.dicGpId },
            this.tableInfo
          );
          delete formData.id
          API.dictionary.dictionaryAdd(formData).then(({ data }) => {
            if (data && data.success) {
              this.tableDialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
              this.loadTableData();
            }
          });
        }
      });
    },
    // 右侧表格编辑字典数据
    handleTableEdit() {
      if (this.selectionData.length != 0) {
        this.tableInfo = Object.assign({}, this.selectionData);
        this.tableDialogStatus = "update";
        this.tableDialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["tableDataForm"].clearValidate();
        });
      } else {
        this.$alert("请选择操作项", "注意", {
          confirmButtonText: "确定"
        });
      }
    },
    // 字典编辑弹框提交数据
    updateTableData() {
      this.$refs["tableDataForm"].validate(valid => {
        if (valid) {
          const formData = Object.assign({}, this.tableInfo);
          API.dictionary.dictionaryEdit(formData).then(({ data }) => {
            if (data && data.success) {
              this.tableDialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
              this.loadTableData();
            }
          });
        }
      });
    },
    // 字典删除数据
    handleTableRemove() {
      if (this.selectionData.length != 0) {
        const key = this.selectionData.id;
        this.$confirm("是否确定删除该项数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          tyle: "warning"
        })
          .then(() => {
            API.dictionary.dictionaryRemove(key).then(({ data }) => {
              if (data && data.success) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success",
                  duration: 2000
                });
                this.loadTableData();
              } else {
              }
            });
          })
          .catch(() => {});
      } else {
        this.$alert("请选择操作项", "注意");
      }
    }
  }
};
</script>

<style lang="scss">
.el-tree-node__content {
  height: 30px;
}
</style>
