<template>
    <div class="home container">
        <!-- Header -->
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoice</h1>
                <span>There are 4 total Invoices</span>
            </div>
            <div class="right flex">
                <div class="filter flex" @click="toggleFilterMenu" ref="filter">
                    <span>Filter by status</span>
                    <img src="/assets/icon-arrow-down.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>