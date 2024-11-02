<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <nuxt-link class="nav-link flex" :to="`/`">
            <img src="../../assets/icon-arrow-left.svg" alt="left arrow">
            Go back
        </nuxt-link>

        <!-- Header -->
        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div class="status-button flex" :class="{ paid: currentInvoice[0].invoicePaid, draft: currentInvoice[0].invoiceDraft, pending: currentInvoice[0].invoicePending }">
                <span v-if="currentInvoice[0].invoicePaid">Paid</span>
                <span v-if="currentInvoice[0].invoiceDraft">Draft</span>
                <span v-if="currentInvoice[0].invoicePending">Pending</span>
            </div>
            </div>
            <div class="right flex">
                <button class="dark-purple" @click="toggleEditInvoice">Edit</button>
                <button class="red" @click="deleteInvoice(currentInvoice[0].docId)">Delete</button>
                <button class="green" v-if="currentInvoice[0].invoicePending" @click="updateStatusToPaid(currentInvoice[0].docId)">Mark as paid</button>
                <button class="orange" v-if="currentInvoice[0].invoiceDraft || currentInvoice[0].invoicePaid" @click="updateStatusToPending(currentInvoice[0].docId)">Mark as pending</button>
            </div>
        </div>

        <!-- Invoice Details -->
         <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex flex-column">
                    <p><span>#</span>{{ currentInvoice[0].invoiceId }}</p>
                    <p>{{ currentInvoice[0].productDescription }}</p>
                </div>
                <div class="right flex flex-column">
                    <p>{{ currentInvoice[0].billerStreetAddress }}</p>
                    <p>{{ currentInvoice[0].billerCity }}</p>
                    <p>{{ currentInvoice[0].billerZipCode }}</p>
                    <p>{{ currentInvoice[0].billerCountry }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice[0].invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice[0].paymentDueDate }}</p>
                </div>
                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice[0].clientName }}</p>
                    <p>{{ currentInvoice[0].clientStreetAddress }}</p>
                    <p>{{ currentInvoice[0].clientCity }}</p>
                    <p>{{ currentInvoice[0].clientZipCode }}</p>
                    <p>{{ currentInvoice[0].clientCountry }}</p>
                </div>
                <div class="send-to flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice[0].clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Itme Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div v-for="(item, index) in currentInvoice[0].invoiceItemList" :key="index" class="item flex">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>Amount Due</p>
                    <p>{{ currentInvoice[0].invoiceTotal }}</p>
                </div>
            </div>
         </div>
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

    const toggleEditInvoice = () => {      
      store.TOGGLE_EDIT_INVOICE();
      store.TOGGLE_INVOICE();
    }
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>