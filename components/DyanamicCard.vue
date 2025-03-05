<template>
  <ClientOnly>
      <Card 
          :style="{ borderTop: `5px solid ${theme.token.colorPrimary}`, width: '110%' }"
          @click.prevent="$emit('click', props)"
      >
          <template #content>
              <div style="padding: 10px">
                  <div class="card-title">
                      <span>{{ props.title }}</span>
                  </div>
                  <div class="card-info" v-for="info in props.subTitle" :key="info">
                      <div class="info-name">{{ info.name }}</div>
                      <div class="info-value">{{ info.value }}</div>
                  </div>
              </div>
          </template>
      </Card>
  </ClientOnly>
</template>

<script setup >
import { Card } from 'primevue/card';
const { theme } = useTheme();
const emit = defineEmits(['click']);
const props = defineProps({
  title: { type: String, required: true },
  subTitle: { type: Array, required: true },
  id: { type: Number, required: true }
});
</script>

<style scoped>

</style>
