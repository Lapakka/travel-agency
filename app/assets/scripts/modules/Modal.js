import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events() { // Sort of an event listener
        // clicking the open modal openModalButton
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        // pressing any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) { // If the pressed key is Escape
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visible");
        return false; // because target is a link element
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;