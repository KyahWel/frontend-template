<template>
  <div>
      <Dialog v-model:visible="viewFilter" :modal="true" :style="{ width: '700px' }" :header="title">
          <div class="p-fluid">
              <div v-for="field in props.filters" :key="field.label" class="p-field">
                  <label :for="field.index">{{ field.label }}</label>
                  <Dropdown v-model="filterData[field.index]" :options="field.options" optionLabel="name" optionValue="value" :placeholder="field.label" showClear />
              </div>
          </div>
          <template #footer>
              <div class="p-d-flex p-jc-end" style="gap: 10px;">
                  <Button label="Close" @click="viewFilter = false" class="p-button-secondary" />
                  <Button label="Reset" @click="resetFilters" class="p-button-warning" />
                  <Button label="Apply Filter" @click="applyFilters" class="p-button-primary" />
              </div>
          </template>
      </Dialog>
      
      <div v-show="props.filters?.length" class="p-d-flex p-ai-center">
          <Button label="Filter" icon="pi pi-filter" @click="viewFilter = true">
              <Badge v-show="hasActiveFilters" :value="activeFilterCount" class="p-ml-2" />
          </Button>
          <Button icon="pi pi-refresh" @click="resetFilters" class="p-button-text p-ml-2" />
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Dialog } from 'primevue/dialog';
import { Button } from 'primevue/button';
import { Dropdown } from 'primevue/dropdown';
import { Badge } from 'primevue/badge';

const viewFilter = ref(false);
const filterData = ref({});

const props = defineProps({
  filters: { type: Array, default: () => [] },
  title: { type: String, default: 'Filter' },
  value: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['apply']);

const hasActiveFilters = computed(() => Object.values(filterData.value).some(val => val));
const activeFilterCount = computed(() => Object.values(filterData.value).filter(val => val).length);

const resetFilters = () => {
  filterData.value = {};
  emit('apply', {});
};

const applyFilters = () => {
  const sanitizedFilters = Object.fromEntries(Object.entries(filterData.value).filter(([_, v]) => v));
  emit('apply', sanitizedFilters);
};
</script>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>
