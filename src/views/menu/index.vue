<template>
  <div class="mod-home">
      <el-table-pagination
        type="local"
        :data="tableData"
        :page-sizes="[5, 10]"
        :columns="columns">
      </el-table-pagination>
  </div>
</template>

<script>
  import ElTablePagination from '@/components/search-table-pagination'
  export default {
    name: 'gmu',
    data () {
      return {
        columns: [
          { prop: 'name', label: 'Name'},
          { prop: 'mobile', label: 'Mobile'},
          { prop: 'sex', label: 'Sex',
            render: row => {
              const { sex } = row
              return sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
            }
          }
        ],
        tableData: [
          { name: 'Sam', mobile: '15299xxxx', sex: 0 },
          { name: 'Jean', mobile: '13452xxxx', sex: 1 },
          { name: 'Tony', mobile: '187233xxxx', sex: 0 },
          { name: 'amy', mobile: '187233xxxx', sex: 0 },
          { name: 'jimi', mobile: '187233xxxx', sex: 0 },
          { name: 'mike', mobile: '187233xxxx', sex: 0 },
          { name: 'gordon', mobile: '187233xxxx', sex: 0 }
        ] 
      }
    },
    components: {
      ElTablePagination
    },
    methods: {
    }
  }
</script>

<style>
  
</style>

