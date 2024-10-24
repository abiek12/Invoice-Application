<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="invoice-content">
            <Loading v-show="loading"/>
            <h1>New Invoice</h1>
            <!-- Bill From -->
             <div class="bill-from flex flex-column">
                <h4>Bill From</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress" >Street Address</label>
                    <input required type="text" v-model="billerStreetAddress" id="billerStreetAddress" placeholder="Street Address">
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="billerCity">City</label>
                        <input required type="text" v-model="billerCity" id="billerCity" placeholder="City">
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerZipCode">Zip Code</label>
                        <input required type="text" v-model="billerZipCode" id="billerZipCode" placeholder="Zip Code">
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerCountry">Country</label>
                        <input required type="text" v-model="billerCountry" id="billerCountry" placeholder="Country">
                    </div>
                </div>
             </div>

             <!-- Bill To -->
            <div class="bill-to flex flex-column">
                <h4>Bill To</h4>
                <div class="input flex flex-column">
                    <label for="clientName">Client's Name</label>
                    <input required type="text" v-model="clientName" id="clientName" placeholder="Client's Name">
                </div>
                <div class="input flex flex-column">
                    <label for="clientEmail">Client's Email</label>
                    <input required type="text" v-model="clientEmail" id="clientEmail" placeholder="Client's Email">
                </div>
                <div class="input flex flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input required type="text" v-model="clientStreetAddress" id="clientStreetAddress" placeholder="Street Address">
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="clientCity">City</label>
                        <input required type="text" v-model="clientCity" id="clientCity" placeholder="City">
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientZipCode">Zip Code</label>
                        <input required type="text" v-model="clientZipCode" id="clientZipCode" placeholder="Zip Code">
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientCountry">Country</label>
                        <input required type="text" v-model="clientCountry" id="clientCountry" placeholder="Country">
                    </div>
                </div>
            </div>

            <!-- Invoice Work -->
             <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoiceDate">Invoice Date</label>
                        <input disabled type="text" v-model="invoiceDate" id="invoiceDate" placeholder="Invoice Date">
                    </div>
                    <div class="input flex flex-column">
                        <label for="paymentDue">Payment Due</label>
                        <input disabled type="text" v-model="paymentDueDate" id="paymentDue" placeholder="Payment Due Date">
                    </div>
                </div>
                <div class="input flex flex-column">
                    <label for="paymentTerms">Payment Terms</label>
                    <select required type="text" v-model="paymentTerms" id="paymentTerms" placeholder="Payment Terms">
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                    </select>
                </div>
                <div class="input flex flex-column">    
                    <label for="productDescription">Product Description</label>
                    <input required type="text" v-model="productDescription" id="productDescription" placeholder="Product Description">
                </div>
                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading flex">
                            <th class="item-name">Item Name</th>
                            <th class="qty">Qty</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>
                        <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                            <td class="item-name"><input required type="text" v-model="item.itemName"></td>
                            <td class="qty"><input required type="number" v-model="item.qty"></td>
                            <td class="price"><input required type="number" v-model="item.price"></td>
                            <td class="total flex">₹ {{ (item.total = item.qty * item.price).toFixed(2) }}</td>
                            <img @click="deleteInvoiceItem(item.id)" class="delete" src="/assets/icon-delete.svg" alt="delete-icon">
                        </tr>
                    </table>
                    <div @click="addNewInvoiceItem" class="flex button">
                        <img src="/assets/icon-plus.svg" alt="plus icon">
                        Add New Item
                    </div>
                </div>
             </div>

            <!-- Save/Exit -->
             <div class="save flex">
                <div class="left">
                    <button type="button" @click="closeInvoice" class="red">Cancel</button>
                </div>
                <div class="right">
                    <button type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
                    <button type="submit" @click="publishInvoice" class="purple">Create Invoice</button>
                </div>
             </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { uid } from 'uid';
import { db } from '../firebase/firebaseInit';
import { doc, setDoc, collection } from 'firebase/firestore';

const billerStreetAddress = ref(null)
const billerCity = ref(null)
const billerZipCode = ref(null)
const billerCountry = ref(null)
const clientName = ref(null)
const clientEmail = ref(null)
const clientStreetAddress = ref(null)
const clientCity = ref(null)
const clientZipCode = ref(null)
const clientCountry = ref(null)
const invoiceDateUnix = ref(null)
const invoiceDate = ref(null)
const paymentTerms = ref(null)
const paymentDueDateUnix = ref(null)
const paymentDueDate = ref(null)
const productDescription = ref(null)
const invoicePending = ref(null)
const invoiceDraft = ref(null)
const invoiceItemList = ref([])
const invoiceTotal = ref(0)
const loading = ref(false)
const invoiceWrap = ref(null);
const dateOptions = { year: "numeric", month: "short", day: "numeric" }

// Initialize the store
const store = useGlobalStore();

const closeInvoice = () => {
    store.TOGGLE_INVOICE();
}

const checkClick = (e) => {
    if(e.target == invoiceWrap.value) {
        store.TOGGLE_MODAL();
    }
}

const addNewInvoiceItem = () => {
    invoiceItemList.value.push({
        id: uid(),
        itemName: '',
        qty: 0,
        price: 0,
        total: 0
    });
}

const calculateInvoiceTotal = () => {
    invoiceTotal.value = 0;
    invoiceItemList.value.forEach(item => {
        invoiceTotal.value += item.total;
    })
}

const publishInvoice = () => {
    invoicePending.value = true;
}

const saveDraft = () => {
    invoiceDraft.value = true;
}

const uploadInvoice = async () => {
    if (invoiceItemList.value.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
    }
    loading.value = true;
    calculateInvoiceTotal();

    const newInvoiceRef = doc(collection(db, 'invoices'));
    
    await setDoc(newInvoiceRef, {
        invoiceId: uid(6),
        billerStreetAddress: billerStreetAddress.value,
        billerCity: billerCity.value,
        billerZipCode: billerZipCode.value,
        billerCountry: billerCountry.value,
        clientName: clientName.value,
        clientEmail: clientEmail.value,
        clientStreetAddress: clientStreetAddress.value,
        clientCity: clientCity.value,
        clientZipCode: clientZipCode.value,
        clientCountry: clientCountry.value,
        invoiceDate: invoiceDate.value,
        invoiceDateUnix: invoiceDateUnix.value,
        paymentTerms: paymentTerms.value,
        paymentDueDate: paymentDueDate.value,
        paymentDueDateUnix: paymentDueDateUnix.value,
        productDescription: productDescription.value,
        invoiceItemList: invoiceItemList.value,
        invoiceTotal: invoiceTotal.value,
        invoicePending: invoicePending.value,
        invoiceDraft: invoiceDraft.value,
        invoicePaid: null,
    });

    loading.value = false;
    
    store.TOGGLE_INVOICE();
}


const submitForm = () => {
    uploadInvoice();
}

const deleteInvoiceItem = (id) => {
    invoiceItemList.value = invoiceItemList.value.filter((item) => item.id !== id);
}

// Get current date for invoice date field
invoiceDateUnix.value = Date.now();
invoiceDate.value = new Date(invoiceDateUnix.value).toLocaleDateString('en-us', dateOptions);

watch(paymentTerms, () => {
    // Get current date for payment due date field
    const futureDate = new Date();
    if(paymentTerms.value) {
        paymentDueDateUnix.value = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms.value));
        paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString('en-us', dateOptions);
    }
});

</script>

<style lang="scss" scoped>
.invoice-wrap{
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    @media (min-width: 900px) {
        left: 90px;
    }

    .invoice-content {
        position: relative;
        padding: 56px;
        max-width: 700px;
        width: 100%;
        background-color: #141625;
        color: #fff;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        h1 {
            margin-bottom: 48px;
            color: #fff;
        }

        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            color: #777f98;
        }

        h4 {
            color: #7c5dfa;
            font-size: 12px;
            margin-bottom: 24px;
        }

        // Bill To / Bill From
        .bill-to, 
        .bill-from {
            margin-bottom: 48px;

            .location-details {
                gap: 16px;
                div {
                    flex: 1;
                }
            }
        }

        // Invoice Work
        .invoice-work {
            .payment {
                gap: 24px;
                div {
                    flex: 1;
                }
            }

            .work-items {
                .item-list {
                    width: 100%;
                
                        // item table styling
                        .table-heading,
                        .table-items {
                            gap: 16px;
                            font-size: 12px;
                    
                            .item-name {
                                flex-basis: 50%;
                            }
                    
                            .qty {
                                flex-basis: 10%;
                            }
                    
                            .price {
                                flex-basis: 20%;
                            }
                    
                            .total {
                                flex-basis: 20%;
                                align-self: center;
                            }

                            .delete {
                                cursor: pointer;
                            }

                            input[type="number"]::-webkit-outer-spin-button,
                            input[type="number"]::-webkit-inner-spin-button {
                              -webkit-appearance: none;
                              margin: 0;
                            }
                        }
                
                        .table-heading {
                            margin-bottom: 16px;
                    
                            th {
                                text-align: left;
                            }
                        }
                
                        .table-items {
                            position: relative;
                            margin-bottom: 24px;
                    
                        img {
                            position: absolute;
                            top: 15px;
                            right: 0;
                                width: 12px;
                                height: 16px;
                            }
                        }
                    }
            
                .button {
                        color: #fff;
                        background-color: #252945;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                
                    img {
                        margin-right: 4px;
                    }
                }
            }
        }

        .save {
            margin-top: 60px;

            div {
                flex: 1;
            }
            
            .right {
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    .input {
        margin-bottom: 24px;
    }

    label {
        font-size: 12px;
        margin-bottom: 6px;
    }

    input,
    select {
        width: 100%;
        background-color: #1e2139;
        color: #fff;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;

        &:focus {
            outline: none;
        }
    }

}
</style>