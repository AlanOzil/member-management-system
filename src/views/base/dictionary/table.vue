<template>
  <div>
      <el-table
        :data="tableData"
        v-loading="listLoading" 
        element-loading-text="给我一点时间"
        fit 
        highlight-current-row
        style="width: 100%; border-top: 1px solid #ddd; margin-top: 10px;">
        
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="50"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </div>
  </div>
</template>
