<template>
  <Button label="Submit" />
  <div>
    <Card> 
      <template #content>
        <Toolbar class="py-3 px-3 mb-3 border-none flex flex-wrap justify-content-between">
          <template #start>
            <IconField class="w-full md:w-auto mb-2 md:mb-0">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText :placeholder="`Search ${module}...`" class="w-full md:w-auto" />
            </IconField>
          </template>

          <template #end>
            <Button v-if="props.can.includes('create')" :label="`Create ${module}`" icon="pi pi-plus" class="w-full md:w-auto" />
          </template>
        </Toolbar>
        <span v-if="loadingStore.isLoading" class="grid grid-cols-1 gap-2">
            <Skeleton v-for="i in 3" :key="i" width="100%" height="2rem" />
        </span>
        <DataTable
        v-else
          ref="dt"
          :value="data"
          dataKey="id"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
        >
          <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.label" :sortable="col.sortable" :style="col.style" />

          <Column v-if="props.can.length > 0" :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              
              <Skeleton v-if="isLoading" width="100%" height="1.5rem" />
              <Button v-if="props.can.includes('read')" icon="pi pi-eye" outlined rounded class="mr-2" @click="openView(slotProps.data)" />
              <Button v-if="props.can.includes('update')" icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
              <Button v-if="props.can.includes('delete')" icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>

import Button from 'primevue/button';
    import Api from '@/composables/useApi';
    const loadingStore = useLoadingStore()
    const props = defineProps({
        module: String,            
        columns: Array,            
        endpoint: String,          
        can: {
            type: Array,
            default: () => []
        }            
    });

    const api = new Api();
    const data = ref([]);

    const fetchData = async () => {
        try {
            const response = await api.read(`users?limit=10&skip=10`);
            data.value = response.users
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    };
    
    const openView = (item) => {
        console.log('View:', item);
    };

    const editItem = (item) => {
        console.log('Edit:', item);
    };

    const confirmDeleteItem = (item) => {
         console.log('Delete:', item);
    };

    onMounted(() => {
        fetchData(); // Initial fetch
    });


</script>

