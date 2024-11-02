import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebaseInit";

export const useGlobalStore = defineStore('globalStore',()=> {
  // State
  const invoiceModal = ref(false); 
  const modalActive = ref(false);
  const invoiceData = ref([]);
  const invoicesLoaded = ref(false);
  const currentInvoiceArray = ref(null);
  const editInvoice = ref(false);

  // Getters

  // Actions
  const TOGGLE_INVOICE = () => {        
    invoiceModal.value = !invoiceModal.value;
  }

  const TOGGLE_MODAL = () => {
    modalActive.value = !modalActive.value
  }

  const SET_INVOICE_DATA = (payload) => {
    invoiceData.value.push(payload)
  }

  const INVOICES_LOADED = () => {
    invoicesLoaded.value = true
  }

  const GET_INVOICES = async ()=> {    
    try {
      // Get a reference to the 'invoices' collection
      const invoicesRef = collection(db, 'invoices');
      // Fetch all documents from the 'invoices' collection
      const results = await getDocs(invoicesRef);
      results.forEach(doc => {
        if(!invoiceData.value.some(invoice => invoice.docId === doc.id )) {
          const data = {
            docId: doc.id,
            ...doc.data() // Spread the data to avoid repetitive `doc.data().field` calls
          };
          SET_INVOICE_DATA(data);
        }
      });
      INVOICES_LOADED();
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  }

  const SET_CURRENT_INVOICE = (state, payload) => {
    currentInvoiceArray.value = state.filter(invoice => invoice.invoiceId === payload)
  }  

  const TOGGLE_EDIT_INVOICE = () => {    
    editInvoice.value = !editInvoice.value
  }

  return {invoiceModal, 
    TOGGLE_INVOICE, 
    modalActive, 
    TOGGLE_MODAL, 
    SET_INVOICE_DATA, 
    GET_INVOICES, 
    invoicesLoaded, 
    invoiceData, 
    SET_CURRENT_INVOICE, 
    currentInvoiceArray,
    TOGGLE_EDIT_INVOICE,
    editInvoice
  }
})