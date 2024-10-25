<template>
    <router-link class="invoice flex" :to="{name: 'invoice', params: {invoiceId: invoice.invoiceId}}">
        <div class="left flex">
            <span class="track-number">#{{ invoice.invoiceId }}"></span>
            <span class="due-date">{{ invoice.paymentDueDate }}"></span>
            <span class="person>{{ invoice.clientName }}"></span>
        </div>
        <div class="right flex">
            <span class="price">₹{{ invoice.invoiceTotal }}"></span>
        </div>
    </router-link>
</template>

<script setup>
name: 'Invoice'
const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
});

</script>

<style lang="scss" scoped>

</style>