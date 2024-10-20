export const useGlobalStore = defineStore('globalStore',()=> {
  // State
  const invoiceModal = ref(false) 

  // Getters

  // Actions
  const TOGGLE_INVOICE = () => {    
    console.log('Inital state:', invoiceModal.value);
    invoiceModal.value = !invoiceModal.value;
    console.log('Toggling modal:', invoiceModal.value);
  }

  return {invoiceModal, TOGGLE_INVOICE}
})