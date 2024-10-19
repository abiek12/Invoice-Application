<template>
    <div>
        <header class="flex">
            <div class="branding flex">
                <img src="@assets/file-invoice-dollar-solid.png" alt="">
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style lang="sass" scoped>
header {
    z-index: 99;
    position: sticky;
    top: 0;
    height: 60px;
    background-color: #1e2139;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #3d3fOr;
}
</style>