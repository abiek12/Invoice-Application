<template>
    <nuxt-link class="invoice flex" :to="`/InvoiceView/${invoice.invoiceId}`">
        <div class="left flex">
            <span class="track-number">#{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person>{{ invoice.clientName }}"></span>
        </div>
        <div class="right flex">
            <span class="price">₹{{ invoice.invoiceTotal }}</span>
            <div class="status-button flex" :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
                <span v-if="invoice.invoicePaid">Paid</span>
                <span v-if="invoice.invoiceDraft">Draft</span>
                <span v-if="invoice.invoicePending">Pending</span>
            </div>
            <div class="icon">
                <img src="/assets/icon-arrow-right.svg" alt="">
            </div>
        </div>
    </nuxt-link>
</template>

<script setup>
const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
});

</script>

<style lang="scss" scoped>
    .invoice {
        text-decoration: none;
        cursor: pointer;
        gap: 1rem;
        margin-bottom: 1rem;
        color: #fff;
        border-radius: 20px;
        padding: 28px 32px;
        background-color: #1e2139;
        align-items: center;

        span {
            font-size: 14px;
        }

        .left {
           align-items: center;
           flex-basis: 60%;
           gap: 1rem;

           span {
                flex: 1;
           }

            .track-number {
              text-transform: uppercase;
            }
        }

        .right {
            gap: 1rem;
            flex-basis: 40%;
            align-items: center;

            .price {
                flex: 1;
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
</style>