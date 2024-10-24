export const useGlobalStore = defineStore('globalStore',()=> {
  // State
  const invoiceModal = ref(false); 
  const modalActive = ref(false);

  // Getters

  // Actions
  const TOGGLE_INVOICE = () => {    
    invoiceModal.value = !invoiceModal.value;
  }

  const TOGGLE_MODAL = () => {
    modalActive.value = !modalActive.value
  }

  return {invoiceModal, TOGGLE_INVOICE, modalActive, TOGGLE_MODAL}
})