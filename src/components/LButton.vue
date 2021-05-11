<template>
  <a class="btn btn-success" :href="href" :target="target" rel="opener">
    <slot />
  </a>
</template>

<script>
export default {
  data() {
    return {
      href: null,
      target: "_blank",
    };
  },
};
</script>
