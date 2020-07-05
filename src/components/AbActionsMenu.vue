<template>

<el-dropdown size="small" @command="cmd => $emit(cmd)">
    <el-button
        circle
        size="mini"
        icon="el-icon-more"
        :style="{'border': 'none'}"
    />
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
            v-for="action in actions"
            :key="action.key"
            :icon="action.icon"
            :command="action.key"
        >
            {{ action.label }}
        </el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>

</template>

<script>

export default {
    name: 'AbActionsMenu',

    props: {
        actions: {
            type: Array,
            default: () => []
        }
    }
};

</script>
