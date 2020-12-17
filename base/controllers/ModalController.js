import ContainerController from "./ContainerController.js";

class ModalDataEvent extends CustomEvent {
  constructor(eventName, eventData, eventOptions) {
    super(eventName, eventOptions);
    this.data = eventData;
  }
}

export default class ModalController extends ContainerController {

  constructor(element, history) {
    super(element, history);

    let callback = (err, viewModel, responseCallback) => {
      this.model = this.setModel(JSON.parse(JSON.stringify(viewModel)));
      this.responseCallback = responseCallback;
    };

    let modalDataEvent = new ModalDataEvent("bindModalData", {
      callback: callback
    }, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.element.dispatchEvent(modalDataEvent);

  }
}