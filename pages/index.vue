<template>
    <div class="home container">
        <!-- Header -->
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoice</h1>
                <span>There are {{ invoices.length }} total Invoices</span>
            </div>
            <div class="right flex">
                <div class="filter flex" @click="toggleFilterMenu">
                    <span>Filter by status<span v-if="filteredInvoices"> : {{ filteredInvoices }}</span></span>
                    <img src="/assets/icon-arrow-down.svg" alt="">
                    <ul v-show="filterMenu" class="filter-menu">
                        <li @click="filterInvoice">Draft</li>
                        <li @click="filterInvoice">Pending</li>
                        <li @click="filterInvoice">Paid</li>
                        <li @click="filterInvoice">Clear Filter</li>
                    </ul>
                </div>
                <div @click="newInvoice" class="button flex">
                    <div class="inner-btn flex">
                        <img src="/assets/icon-plus.svg" alt="">
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
        <!-- Invoices -->
         <div class="" v-if="invoices.values">
            <invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index"/>
         </div>
         <div class="empty flex flex-column" v-else>
            <img src="../assets/illustration-empty.svg" alt="Invoice empty illustration">
            <h3>There is nothing here</h3>
            <p>Create a new invoice by clicking the new Invoice button and get started</p>
         </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const filterMenu = ref(false);
let invoices = ref([]);
let filteredInvoices= ref(null);

// Initialize the store
const store = useGlobalStore();

//accessing states
invoices = computed(() => store.invoiceData);
const filteredData = computed(()=> {
    return invoices.value.filter((invoice)=>{
        if(filteredInvoices.value === 'Draft') {
            return invoice.invoiceDraft === true;
        }
        if(filteredInvoices.value === 'Pending') {
            return invoice.invoicePending === true;
        }
        if(filteredInvoices.value === 'Paid') {
            return invoice.invoicePaid === true;
        }
        return invoice
    })
})

// Watchers
if(invoices.value) {
    watch(invoices,
        (updatedInvoices) => {
            invoices.value = updatedInvoices
        }
    )
}

const newInvoice = () => {
    store.TOGGLE_INVOICE();
}

const toggleFilterMenu = () => {
    filterMenu.value = !filterMenu.value;
}

const filterInvoice = (e)=> {
    if(e.target.innerText === 'Clear Filter') {
        filteredInvoices.value = null;
        return;
    }
    filteredInvoices.value = e.target.innerText;
}

useSeoMeta({
  title: 'Home',
  description: 'Invoice Lists',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
})
</script>

<style lang="scss" scoped>
.home {
    color: #fff;

    .header {
        margin-bottom: 65px;

        .left,
        .right {
            flex: 1;
        }

        .right {
            justify-content: flex-end;
            align-items: center;

            .button,
            .filter {
                align-items: center;

                span {
                    font-size: 12px;
                    cursor: pointer;
                }
            }

            .filter {
                position: relative;
                margin-right: 40px;

                img {
                    margin-left: 12px;
                    width: 9px;
                    height: 5px;
                }

                .filter-menu {
                    width: 120px;
                    position: absolute;
                    top: 25px;
                    list-style: none;
                    background-color: #1e2139;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    li {
                        cursor: pointer;
                        font-size: 12px;
                        padding: 10px 20px;

                        &:hover {
                            color: #1e2139;
                            background-color: #fff;
                        }
                    }
                }
            }

            .button {
                padding: 8px 10px;
                background-color: #7c5dfa;
                border-radius: 40px;

                .inner-btn {
                    margin-right: 8px;
                    border-radius: 50%;
                    padding: 8px;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    img {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }

    .empty {
        margin-top: 130px;
        align-items: center;

        img {
            width: 214px;
            height: 200px;
        }

        h3 {
            font-size: 20px;
            margin-top: 40px;
        }

        p {
            text-align: center;
            max-width: 224px;
            font-size: 12px;
            font-weight: 300;
            margin-top: 16px;
        }
    }
}
</style>