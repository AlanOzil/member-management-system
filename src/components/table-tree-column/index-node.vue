<template>
  <el-table-column ref="indexNode" type="index" width="37">
    <template slot-scope="scope">
      <span :class="getClassName(scope.row[prop])">{{scope.$index + 1}}</span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    prop: {
      type: String
    }
  },
  methods: {
    getClassName(val) {
      return val === 0 ? 'root-node' : 'child-node'
    }
  }
}
</script>
