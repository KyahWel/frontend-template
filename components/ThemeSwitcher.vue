<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useAppState } from '@/composables/useAppState';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const primevue = usePrimeVue();
const { theme, setTheme } = useAppState();
const iconClass = ref('pi-moon');
const selectedPrimaryColor = ref('noir');
const selectedSurfaceColor = ref(null);
const presets = ref(['Aura', 'Lara', 'Nora']);
const primaryColors = ref([]);
const surfaces = ref([]);

const rippleActive = computed(() => primevue.config.ripple);

const onThemeToggler = () => {
  document.documentElement.classList.toggle('p-dark');
  iconClass.value = iconClass.value === 'pi-moon' ? 'pi-sun' : 'pi-moon';
};

const updateColors = (type, color) => {
  if (type === 'primary') selectedPrimaryColor.value = color.name;
  else if (type === 'surface') selectedSurfaceColor.value = color.name;

  applyTheme(type, color);
};

const applyTheme = (type, color) => {
  if (type === 'primary') {
    updatePreset(getPresetExt());
  } else if (type === 'surface') {
    updateSurfacePalette(color.palette);
  }
};

const onRippleChange = (value) => {
  primevue.config.ripple = value;
};

const onPresetChange = (value) => {
  setTheme(value);
  const preset = { Aura, Lara, Nora }[value];
  const surfacePalette = surfaces.value.find((s) => s.name === selectedSurfaceColor.value)?.palette;

  $t()
    .preset(preset)
    .preset(getPresetExt())
    .surfacePalette(surfacePalette)
    .use({ useDefaultOptions: true });
};
</script>

<template>
  <div class="card flex justify-end p-2 mb-4">
    <ul class="flex list-none m-0 p-0 gap-2 items-center">
      <li>
        <button type="button" class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded" @click="onThemeToggler">
          <i :class="`dark:text-white pi ${iconClass}`" />
        </button>
      </li>
      <li class="relative">
        <button v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-fadeout',
            hideOnOutsideClick: true,
          }" type="button" class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded">
          <i class="pi pi-palette dark:text-white"></i>
        </button>
        <div class="absolute top-[2.5rem] right-0 hidden w-[16rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top z-10">
          <div class="flex-col justify-start items-start gap-2 inline-flex pr-4">
            <span class="text-sm font-medium">Primary Colors</span>
            <div class="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
              <button v-for="primaryColor in primaryColors" :key="primaryColor.name" type="button" :title="primaryColor.name" @click="updateColors('primary', primaryColor)" class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5" :style="{
                backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}`,
                outlineColor: `${selectedPrimaryColor === primaryColor.name ? 'var(--p-primary-color)' : ''}`
              }"></button>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-2 inline-flex pr-2">
            <span class="text-sm font-medium">Surface Colors</span>
            <div class="self-stretch justify-start items-start gap-2 inline-flex">
              <button v-for="surface in surfaces" :key="surface.name" type="button" :title="surface.name" @click="updateColors('surface', surface)" class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5" :style="{
                backgroundColor: `${surface.palette['500']}`,
                outlineColor: `${selectedSurfaceColor === surface.name ? 'var(--p-primary-color)' : ''}`
              }"></button>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-2 inline-flex w-full">
            <span class="text-sm font-medium">Preset</span>
            <div class="inline-flex p-[0.28rem] items-start gap-[0.28rem] rounded-[0.71rem] border border-[#00000003] w-full">
              <SelectButton v-model="theme" @update:modelValue="onPresetChange" :options="presets" :unselectable="false" />
            </div>
          </div>
          <div class="inline-flex flex-col justify-start items-start gap-2 w-full pt-4 pb-2">
            <span class="text-sm font-medium m-0">Ripple Effect</span>
            <ToggleSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
