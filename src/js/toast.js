export class Toast {
    constructor(titulo, desc) {
        this.titulo = titulo;
        this.desc = desc;
    }

    fazNovoToast() {
        const toastPlace = document.querySelector("#toast-place");
        const notifica = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
            <div class="toast-header">
                <img src="./assets/ok.svg" style="width: 14px; height: 14px;" class="mr-2" alt="Ok">
                <strong class="mr-auto">${this.titulo}</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">${this.desc}</div>
        </div>
        `;
        const notificaItem = () => {
            toastPlace.insertAdjacentHTML("beforeend", notifica);
            $('.toast').toast('show');
            $('.toast').on('hidden.bs.toast', e => {
                $(e.currentTarget).remove();
            });
        }
        return notificaItem();
    }
}
