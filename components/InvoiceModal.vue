<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="invoice-content">
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
                        <tr class="table-item flex" v-for="(item, index) in invoiceItemList" :key="index">
                            <td class="item-name"><input type="text" v-model="item.itemName"></td>
                            <td class="qty"><input type="text" v-model="item.qty"></td>
                            <td class="price"><input type="text" v-model="item.price"></td>
                            <td class="total flex">${{ (item.total = item.qty * item.price).toFixed(2) }}</td>
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
                    <button @click="closeInvoice" class="red">Cancel</button>
                </div>
                <div class="right">
                    <button @click="saveDraft" class="dark-purple">Save Draft</button>
                    <button @click="publishInvoice" class="purple">Create Invoice</button>
                </div>
             </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

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


</script>

<style lang="scss" scoped>

</style>