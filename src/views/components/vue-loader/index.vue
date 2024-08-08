<template>
  <div>
    <component :is="previewComp"></component>
  </div>
</template>

<script lang="ts" setup>

import { defineAsyncComponent, shallowRef } from "vue";
import * as Vue from "vue";
import { loadModule } from "vue3-sfc-loader";
import ElementPlus from "element-plus"

const props = defineProps(["option", "data", "modelValue"])
const emits = defineEmits(["update:modelValue"])

const code = ref(`
<template>
  <span class="example">{{ msg }}</span>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'world!'
      }
    }
  }
<\/script>
<style scoped>
  .example {
    color: red;
  }
</style>
`)
const previewComp = shallowRef();

const init = () => {
  try {
    const options = {
      moduleCache: {
        vue: Vue,
        "element-plus": ElementPlus
      },
      async getFile() {
        return code.value
      },
      addStyle(textContent) {
        const style = Object.assign(document.createElement("style"), {
          textContent
        });
        const ref = document.head.getElementsByTagName("style")[0] || null;
        document.head.insertBefore(style, ref);
      }
    };
    const comp = defineAsyncComponent(() =>
      loadModule("myComponent.vue", options as any)
    );
    previewComp.value = comp;
  } catch (err) {
    console.error(err);
  }
};

watchEffect(() => {
  code.value = props.modelValue
  init();
})

const handleChange = (val) => {
  init();
}

</script>