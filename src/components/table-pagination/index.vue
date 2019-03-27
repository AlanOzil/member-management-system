<template>
    <div>
        <el-table v-loading.lock="loading"
            ref="table"
            :data="data"
            :border="border"
            :stripe="stripe"
            :height="height"
            :max-height="maxHeight"
            :fit="fit"
            :show-header="showHeader"
            :highlight-current-row="highlightCurrentRow"
            :current-row-key="currentRowKey"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :row-key="rowKey"
            :empty-text="emptyText"
            :default-expand-all="defaultExpandAll"
            :expand-row-keys="expandRowKeys"
            :default-sort="defaultSort"
            :tooltip-effect="tooltipEffect"
            :show-summary="showSummary"
            :sum-text="sumText"
            :summary-method="summaryMethod"
            style="width: 100%; margin-top: 20px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;"
            @select="(selection, row) => emitEventHandler('select', selection, row)"
            @select-all="selection => emitEventHandler('select-all', selection)"
            @selection-change="selection => emitEventHandler('selection-change', selection)"
            @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
            @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
            @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
            @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
            @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
            @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
            @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
            @header-click="(column, event) => emitEventHandler('header-click', column, event)"
            @sort-change="args => emitEventHandler('sort-change', args)"
            @filter-change="filters => emitEventHandler('filter-change', filters)"
            @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
            @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
            @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)">
                <slot name="prepend"></slot>

                <!-- :width="column.minWidth ? '-' : (column.width)" -->
                <!-- :minWidth="column.minWidth || column.width" -->
                <el-table-column type="selection" width="30" v-if="multiple"></el-table-column>
                <el-table-column
                    v-for="(column, columnIndex) in columns"
                    :key="columnIndex"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.minWidth ? '-' : fit ? column.width : 140"
                    :minWidth="column.minWidth || column.width || 140"
                    :fixed="column.fixed"
                    :render-header="column.renderHeader"
                    :sortable="column.sortable"
                    :sort-method="column.method"
                    :resizable="column.resizable"
                    :formatter="column.formatter"
                    :show-overflow-tooltip="true"
                    :align="column.align || 'center'"
                    :header-align="column.headerAlign || column.align || 'center'"
                    :class-name="column.className"
                    :label-class-name="column.labelClassName"
                    :selectable="column.selectable"
                    :reserve-selection="column.reserveSelection"
                    :filters="column.filters"
                    :filter-placement="column.filterPlacement"
                    :filter-multiple="column.filterMultiple"
                    :filter-method="column.filterMethod"
                    :filtered-value="column.filteredValue">
                    <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false">
                        <span v-if="column.filter">
                            {{ Vue.filter(column['filter'])(scope.row[column.prop])}}
                        </span>
                        <span v-else-if="column.slotName" class="slot">
                            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index"></slot>
                            <!-- <components :is="child.slotName"></components> -->
                        </span>
                        <span v-else-if="column.reqPlan" class="slot">
                          <span class="link-type" @click="showPlanDetail(column.prop, scope.row)" v-html="column.format(scope.row[column.prop]) || '-'" v-if="column.format"></span>
                          <span class="link-type" @click="showPlanDetail(column.prop, scope.row)" v-text="scope.row[column.prop] || '-'" v-else></span>
                            <!-- <components :is="child.slotName"></components> -->
                        </span>
                        <span v-else-if="column.format" v-html="column.format(scope.row[column.prop]) || '-'">
                            <!-- {{ column.render ? column.render(scope.row) : scope.row[column.prop]}} -->
                        </span>
                        <span v-else>
                            {{ column.render ? column.render(scope.row) : scope.row[column.prop] || '-'}}
                        </span>
                    </template>
                    <el-table-column
                        v-for="(child, childIndex) in column.children"
                        :key="childIndex"
                        :prop="child.prop"
                        :label="child.label"
                        :width="child.minWidth ? '-' : fit ? child.width : 140"
                        :minWidth="child.minWidth || child.width || 140"
                        :fixed="child.fixed"
                        :render-header="child.renderHeader"
                        :sortable="child.sortable"
                        :sort-method="child.method"
                        :resizable="child.resizable"
                        :formatter="child.formatter"
                        :show-overflow-tooltip="true"
                        :align="child.align || 'center'"
                        :header-align="child.headerAlign || child.align || 'center'"
                        :class-name="child.className"
                        :label-class-name="child.labelClassName"
                        :selectable="child.selectable"
                        :reserve-selection="child.reserveSelection"
                        :filters="child.filters"
                        :filter-placement="child.filterPlacement"
                        :filter-multiple="child.filterMultiple"
                        :filter-method="child.filterMethod"
                        :filtered-value="child.filteredValue">
                        <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false">
                            <span v-if="child.filter">
                                {{ Vue.filter(child['filter'])(scope.row[child.prop])}}
                            </span>
                            <span v-else-if="child.slotName">
                                <slot :name="child.slotName" :row="scope.row" :$index="scope.$index"></slot>
                            </span>
                            <span v-else-if="column.format" v-html="column.format(scope.row[column.prop]) || '-'">
                                <!-- {{ column.render ? column.render(scope.row) : scope.row[column.prop]}} -->
                            </span>
                            <span v-else>
                                {{ child.render ? child.render(scope.row) : scope.row[child.prop] || '-'}}
                            </span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column v-if="showDetailData" prop="createdTime" label="创建时间" width="140px" :formatter="formatter" align="center"></el-table-column>
                <el-table-column v-if="showDetailData" prop="createdBy" label="创建人" width="140px" align="center"></el-table-column>
                <!-- <el-table-column v-if="showDetailData" prop="updateTime" label="更新时间" width="140px" :formatter="formatter" align="center"></el-table-column>
                <el-table-column v-if="showDetailData" prop="updateUser" label="更新人" width="140px" align="center"></el-table-column> -->


                <slot name="append"></slot>
        </el-table>

        <div v-if="showPagination"
            style="margin-top: 10px; text-align: right;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page || pageNum"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :layout="paginationLayout"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import method from "./methods";
import { dateFtt } from "@/utils"
export default {
  name: "ElTablePagination",
  mixins: [method],
  props: {
    height: [String, Number],
    maxHeight: [String, Number],
    stripe: Boolean,
    border: Boolean,
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    rowClassName: [String, Function],
    rowStyle: [String, Function],
    rowKey: [String, Function],
    emptyText: String,
    defaultExpandAll: Boolean,
    expandRowKeys: Array,
    defaultSort: Object,
    tooltipEffect: String,
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    multiple: Boolean,
    columns: {
      type: Array,
      required: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showDetailData: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 50, 100];
      }
    },
    paginationLayout: {
      type: String,
      default: "total, prev, pager, next, jumper, sizes"
    },
    total: Number,
    data: Array,
    page: Number
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {
    newSlotScope() {
      return Number(Vue.version.replace(/\./g, "")) >= 250;
    }
  },
  methods: {
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).splice(1));
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    showPlanDetail(prop, val) {
      let ret = {
        prop,
        val
      }
      this.$emit("showPlanDetail", ret)
    },
    formatter (row, column, cellValue) {
      if (cellValue) {
        var date = new Date(cellValue);
        return dateFtt('yyyy-MM-dd', date)
      }
      else {
        return ''
			}
    }
  }
};
</script>
