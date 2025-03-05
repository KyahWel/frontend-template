<template>
  <div>
    <client-only>
    <dynamic-datatable 
      module="Modules"
      endpoint="/api/users"
      :columns="[
        { field: 'name', label: 'Name', sortable: true, style: 'min-width: 16rem' },
        { field: 'email', label: 'Email', sortable: true, style: 'min-width: 20rem' }
      ]"
      :can="['create', 'read', 'update', 'delete']"
    >
      <template #card-view="{ item }">
        <div>
          <h3>{{ item.name }}</h3>
          <p>Email: {{ item.email }}</p>
        </div>
      </template>
    </dynamic-datatable>
    </client-only>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>