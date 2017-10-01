import { App, Config, ViewController, NavOptions } from 'ionic-angular';
export declare class ImageViewerImpl extends ViewController {
    private app;
    constructor(app: App, component: any, opts: ImageViewerOptions, config: Config);
    getTransitionName(direction: string): string;
    present(navOptions?: NavOptions): Promise<any>;
}
export interface ImageViewerOptions {
    enableBackdropDismiss?: boolean;
    image?: string;
    position?: ClientRect;
}
