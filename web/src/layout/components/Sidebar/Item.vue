<template>
    <div class="el-tooltip">
        <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon']"></i>
        <svg-icon v-else-if="icon" :icon-class="icon" />
        <span slot='title' v-if="title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },

}
</script>


<style scoped lang="scss">
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
    padding-right: 20px;
}
</style>
