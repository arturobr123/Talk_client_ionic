import { App, Config, DeepLinker } from 'ionic-angular';
import { ElementRef } from '@angular/core';
export declare class ImageViewerDirective {
    private _app;
    private _el;
    private config;
    private deepLinker;
    src: string;
    constructor(_app: App, _el: ElementRef, config: Config, deepLinker: DeepLinker);
    onClick(event: Event): void;
}
