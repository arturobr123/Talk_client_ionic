import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerComponent } from './image-viewer.component';
var IonicImageViewerModule = (function () {
    function IonicImageViewerModule() {
    }
    return IonicImageViewerModule;
}());
export { IonicImageViewerModule };
IonicImageViewerModule.decorators = [
    { type: NgModule, args: [{
                imports: [IonicModule],
                declarations: [
                    ImageViewerComponent,
                    ImageViewerDirective
                ],
                exports: [ImageViewerDirective],
                entryComponents: [ImageViewerComponent]
            },] },
];
/** @nocollapse */
IonicImageViewerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=module.js.map