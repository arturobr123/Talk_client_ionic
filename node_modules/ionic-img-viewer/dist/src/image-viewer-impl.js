var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ImageViewerEnter, ImageViewerLeave } from './image-viewer-transitions';
import { ViewController } from 'ionic-angular';
var ImageViewerImpl = (function (_super) {
    __extends(ImageViewerImpl, _super);
    function ImageViewerImpl(app, component, opts, config) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, component, opts) || this;
        _this.app = app;
        config.setTransition('image-viewer-enter', ImageViewerEnter);
        config.setTransition('image-viewer-leave', ImageViewerLeave);
        return _this;
    }
    ImageViewerImpl.prototype.getTransitionName = function (direction) {
        var key = 'image-viewer-' + (direction === 'back' ? 'leave' : 'enter');
        return key;
    };
    ImageViewerImpl.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this.app.present(this, navOptions);
    };
    return ImageViewerImpl;
}(ViewController));
export { ImageViewerImpl };
//# sourceMappingURL=image-viewer-impl.js.map