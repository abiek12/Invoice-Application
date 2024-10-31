<template>
    <div class="">
        {{ currentInvoice[0].invoiceId }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
    name: 'InvoiceView'
    let invoices = ref([]);
    let currentInvoice = ref(null);

    const route = useRoute();

    // Initialize the store
    const store = useGlobalStore();

    //accessing states
    invoices = computed(() => store.invoiceData);

    const getCurrentInvoice = () => {        
        store.SET_CURRENT_INVOICE(invoices.value, route.params.invoiceId);       
    }

    getCurrentInvoice();

    currentInvoice = computed(() => store.currentInvoiceArray);
    console.log(currentInvoice.value);
</script>

<style lang="scss" scoped>
div{
    color: white;
}
</style>