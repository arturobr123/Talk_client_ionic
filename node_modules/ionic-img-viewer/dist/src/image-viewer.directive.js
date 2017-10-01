import { App, Config, DeepLinker } from 'ionic-angular';
import { ElementRef, HostListener, Directive, Input } from '@angular/core';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewer } from './image-viewer';
var ImageViewerDirective = (function () {
    function ImageViewerDirective(_app, _el, config, deepLinker) {
        this._app = _app;
        this._el = _el;
        this.config = config;
        this.deepLinker = deepLinker;
    }
    ImageViewerDirective.prototype.onClick = function (event) {
        event.stopPropagation();
        var position = this._el.nativeElement.getBoundingClientRect();
        var options = { image: this.src || this._el.nativeElement.src, position: position };
        var imageViewer = new ImageViewer(this._app, ImageViewerComponent, options, this.config, this.deepLinker);
        imageViewer.present();
    };
    return ImageViewerDirective;
}());
export { ImageViewerDirective };
ImageViewerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[imageViewer]'
            },] },
];
/** @nocollapse */
ImageViewerDirective.ctorParameters = function () { return [
    { type: App, },
    { type: ElementRef, },
    { type: Config, },
    { type: DeepLinker, },
]; };
ImageViewerDirective.propDecorators = {
    'src': [{ type: Input, args: ['imageViewer',] },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};
//# sourceMappingURL=image-viewer.directive.js.map