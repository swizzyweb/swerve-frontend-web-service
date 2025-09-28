export interface IMessenger {
  showSuccess(message: string): Promise<void>;
  showInfo(message: string): Promise<void>;
  showError(message: string): Promise<void>;
  showWarn(message: string): Promise<void>;
}

export class AlertMessenger implements IMessenger {
  setAlertStyle: (style: string) => Promise<void>;
  setAlertMessage: (message: string) => Promise<void>;
  setAlertActive: (active: boolean) => Promise<void>;

  constructor(
    setAlertStyle: (style: string) => Promise<void>,
    setAlertMessage: (message: string) => Promise<void>,
    setAlertActive: (active: boolean) => Promise<void>,
  ) {
    this.setAlertStyle = setAlertStyle;
    this.setAlertMessage = setAlertMessage;
    this.setAlertActive = setAlertActive;
  }

  async showWarn(message: string) {
    await this.setAlertStyle("warn");
    await this.setAlertMessage(message);
    await this.setAlertActive(true);
  }

  async showError(message: string) {
    await this.setAlertStyle("error");
    await this.setAlertMessage(message);
    await this.setAlertActive(true);
  }

  async showInfo(message: string) {
    await this.setAlertStyle("info");
    await this.setAlertMessage(message);
    await this.setAlertActive(true);
  }

  async showSuccess(message: string): Promise<void> {
    await this.setAlertStyle("success");
    await this.setAlertMessage(message);
    await this.setAlertActive(true);
  }
  async hide() {
    await this.setAlertActive(false);
  }
}
