import { Component } from '@angular/core';
import { HapticsImpactStyle, Plugins } from '@capacitor/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  public async showAlert(): Promise<void> {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: 'Hi there!',
      subHeader: 'This could be something...',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('clicked!');
            Plugins.Haptics.impact({ style: HapticsImpactStyle.Heavy });
          },
          role: 'destructive',
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked!');
          },
          role: 'cancel',
        },
        {
          text: 'Selected',
          handler: () => {
            console.log('clicked!');
          },
          role: 'selected',
        },
        {
          text: 'backdrop',
          handler: () => {
            console.log('clicked!');
          },
          role: 'backdrop',
        },
      ],
    });

    await alert.present();
  }

  public async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: Tab2Page,
      componentProps: { value: 123 },
    });

    await modal.present();
  }

  public async presentNativeModal(): Promise<void> {
    const modal = await Plugins.Modals.confirm({
      title: 'Sure?',
      message: 'are you very sure?',
    });
    console.log(modal.value);
  }

  public async openBrowser(): Promise<void> {
    await Plugins.Browser.open({
      url: 'https://ilionx.com',
      presentationStyle: 'popover',
    });
  }
}
