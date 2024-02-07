<template>
    <div class="text-center">
        <v-pagination v-model="currentPage.page" :length="lastPage" :total-visible="7" @click="changePage"></v-pagination>
    </div>
</template>

<script>
export default {
    props: {
        lastPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            page: 1,
        }
    },
    methods: {
        changePage(){
            this.$emit('change_page', this.currentPage.page);
        }
    }
}
</script>