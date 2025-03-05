<template>
    <ClientOnly>
        <div class="flex flex-col w-full">
            <div class="room">
                <Card class="w-full">
                    <template #content>
                        <div class="flex justify-between items-center p-2 w-full">
                            <InputText v-if="props.searchable?.length" :placeholder="`Search ${props.model} by ${props.searchableText}`" @input="searchHandler" class="w-1/3"/>
                            <div class="flex gap-2">
                                <Button v-if="props.can?.includes('create')" label="Create" icon="pi pi-plus" @click="emit('create')" class="p-button-primary"/>
        
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="mt-2 w-full">
                <Card class="w-full flex flex-col bg-gray-100">
                    <template #content>
                        <div class="flex justify-between items-center">
                            <BasicResourceFilter v-if="props.filters?.length" :filters="props.filters" @apply="applyFilterHandler"/>
                            <SelectButton v-if="!props.onlyView" v-model="currentView" :options="gridValues" class="font-semibold"/>
                        </div>
   
                            <DataTable :value="[]" :paginator="true" :rows="pageSize" class="p-datatable-sm">
                                <Column v-for="col in columns" :field="col.dataIndex" :header="col.title" :key="col.key">
                                    <template #body="slotProps">
                                        <span v-if="col.type == 'DATETIME'">{{ formatDate(slotProps.data[col.dataIndex],'datetime') }}</span>
                        
                                        <span v-if="col.type == 'ASSOCIATION'">{{ slotProps.data[col.dataIndex][col.field.associates] }}</span>
                                    </template>
                                </Column>
                                <Column header="Action">
                                    <template #body="{ data }">
                                        <div class="flex gap-2">
                                            <Button v-if="props.can?.includes('read')" icon="pi pi-eye" class="p-button-text" @click="emit('read', data)"/>
                                            <Button v-if="props.can?.includes('update')" icon="pi pi-pencil" class="p-button-warning" @click="emit('update', data)"/>
                                            <Button v-if="props.can?.includes('delete')" icon="pi pi-trash" class="p-button-danger" @click="emit('delete', data)"/>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                    </template>
                </Card>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useDateUtils } from '@/composables/useDateUtils';
// import debounce from 'lodash.debounce';

const { formatDate } = useDateUtils();
// const { getData } = useAppResource();
const emit = defineEmits(['create', 'read', 'update', 'delete']);
const props = defineProps({
    model: String,
    searchableText: String,
    searchable: Array,
    filters: Array,
    can: Array,
    onlyView: String,
    route: String,
    includeRelationship: Array,
    fields: Array,
    columnCount: Number,
    pageCount: Number,
    association: Array,
    canGenerateReport: Boolean
});

const pageSize = ref(props.pageCount ?? 8);
const currentView = ref(props.onlyView || 'GRID');
const searchKeyword = ref('');
const filters = ref({});
const page = ref(1);
const isSearching = ref(false);
const gridValues = reactive(['GRID', 'TABLE']);

// const columns = computed(() => {
//     return props.fields.filter(field => field.isVisibleFromIndex).map(field => ({
//         title: field.label,
//         dataIndex: field.index,
//         key: field.label,
//         type: field.type,
//         field
//     })).concat([{ title: 'Action', key: 'action' }]);
// });

// const searchHandler = debounce((e) => {
//     isSearching.value = true;
//     searchKeyword.value = e.target.value;
//     isSearching.value = false;
// }, 1000);

// const applyFilterHandler = debounce((filtersData) => {
//     isSearching.value = true;
//     filters.value = filtersData;
//     isSearching.value = false;
// }, 1000);

// const query = computed(() => {
//     let includes = props.includeRelationship ? props.includeRelationship.join(',') : '';
//     let search = props.searchable ? props.searchable.map(field => `${field}:.*${searchKeyword.value}.*`) : '';
//     let filter = Object.keys(filters.value).map(key => `${key}:${filters.value[key]}`);
//     return { page: page.value, limit: pageSize.value, includes, search: filter.length ? filter : search };
// });

// const { data: resourceData } = await getData(`${props.route}`, query);
// const dataSource = computed(() => {
//     return resourceData.value?.response || { count: 0, rows: [] };
// });
</script>
