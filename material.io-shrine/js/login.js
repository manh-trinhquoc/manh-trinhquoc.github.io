(function (factory) {
    typeof define === 'function' && define.amd ? define('login', factory) :
    factory();
}(function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

      return ar;
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFoundation =
    /** @class */
    function () {
      function MDCFoundation(adapter) {
        if (adapter === void 0) {
          adapter = {};
        }

        this.adapter_ = adapter;
      }

      Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
          // Classes extending MDCFoundation should implement this method to return an object which exports every
          // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
          return {};
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
          return {};
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
          // Classes extending MDCFoundation should implement this method to return an object which exports all
          // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
          return {};
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
          // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
          // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
          // validation.
          return {};
        },
        enumerable: true,
        configurable: true
      });

      MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
      };

      MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      };

      return MDCFoundation;
    }();

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCComponent =
    /** @class */
    function () {
      function MDCComponent(root, foundation) {
        var args = [];

        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }

        this.root_ = root;
        this.initialize.apply(this, __spread(args)); // Note that we initialize foundation here and not within the constructor's default param so that
        // this.root_ is defined and can be used within the foundation class.

        this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation_.init();
        this.initialSyncWithDOM();
      }

      MDCComponent.attachTo = function (root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation({}));
      };
      /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


      MDCComponent.prototype.initialize = function () {
        var _args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          _args[_i] = arguments[_i];
        } // Subclasses can override this to do any additional setup work that would be considered part of a
        // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
        // initialized. Any additional arguments besides root and foundation will be passed in here.

      };

      MDCComponent.prototype.getDefaultFoundation = function () {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      };

      MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      };

      MDCComponent.prototype.destroy = function () {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      };

      MDCComponent.prototype.listen = function (evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      };

      MDCComponent.prototype.unlisten = function (evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      };
      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
       */


      MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
        if (shouldBubble === void 0) {
          shouldBubble = false;
        }

        var evt;

        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            bubbles: shouldBubble,
            detail: evtData
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      };

      return MDCComponent;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    function matches(element, selector) {
      var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
      return nativeMatches.call(element, selector);
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses = {
      LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
      LABEL_SHAKE: 'mdc-floating-label--shake',
      ROOT: 'mdc-floating-label'
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCFloatingLabelFoundation =
    /** @class */
    function (_super) {
      __extends(MDCFloatingLabelFoundation, _super);

      function MDCFloatingLabelFoundation(adapter) {
        var _this = _super.call(this, __assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

        _this.shakeAnimationEndHandler_ = function () {
          return _this.handleShakeAnimationEnd_();
        };

        return _this;
      }

      Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
        get: function () {
          return cssClasses;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
        /**
         * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            addClass: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            getWidth: function () {
              return 0;
            },
            registerInteractionHandler: function () {
              return undefined;
            },
            deregisterInteractionHandler: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });

      MDCFloatingLabelFoundation.prototype.init = function () {
        this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      };

      MDCFloatingLabelFoundation.prototype.destroy = function () {
        this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
      };
      /**
       * Returns the width of the label element.
       */


      MDCFloatingLabelFoundation.prototype.getWidth = function () {
        return this.adapter_.getWidth();
      };
      /**
       * Styles the label to produce a shake animation to indicate an error.
       * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
       */


      MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

        if (shouldShake) {
          this.adapter_.addClass(LABEL_SHAKE);
        } else {
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      };
      /**
       * Styles the label to float or dock.
       * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
       */


      MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
        var _a = MDCFloatingLabelFoundation.cssClasses,
            LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
            LABEL_SHAKE = _a.LABEL_SHAKE;

        if (shouldFloat) {
          this.adapter_.addClass(LABEL_FLOAT_ABOVE);
        } else {
          this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
          this.adapter_.removeClass(LABEL_SHAKE);
        }
      };

      MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        this.adapter_.removeClass(LABEL_SHAKE);
      };

      return MDCFloatingLabelFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCFloatingLabel =
    /** @class */
    function (_super) {
      __extends(MDCFloatingLabel, _super);

      function MDCFloatingLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCFloatingLabel.attachTo = function (root) {
        return new MDCFloatingLabel(root);
      };
      /**
       * Styles the label to produce the label shake for errors.
       * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
       */


      MDCFloatingLabel.prototype.shake = function (shouldShake) {
        this.foundation_.shake(shouldShake);
      };
      /**
       * Styles the label to float/dock.
       * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
       */


      MDCFloatingLabel.prototype.float = function (shouldFloat) {
        this.foundation_.float(shouldFloat);
      };

      MDCFloatingLabel.prototype.getWidth = function () {
        return this.foundation_.getWidth();
      };

      MDCFloatingLabel.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = {
          addClass: function (className) {
            return _this.root_.classList.add(className);
          },
          removeClass: function (className) {
            return _this.root_.classList.remove(className);
          },
          getWidth: function () {
            return _this.root_.scrollWidth;
          },
          registerInteractionHandler: function (evtType, handler) {
            return _this.listen(evtType, handler);
          },
          deregisterInteractionHandler: function (evtType, handler) {
            return _this.unlisten(evtType, handler);
          }
        }; // tslint:enable:object-literal-sort-keys

        return new MDCFloatingLabelFoundation(adapter);
      };

      return MDCFloatingLabel;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$1 = {
      LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
      LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCLineRippleFoundation =
    /** @class */
    function (_super) {
      __extends(MDCLineRippleFoundation, _super);

      function MDCLineRippleFoundation(adapter) {
        var _this = _super.call(this, __assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;

        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd(evt);
        };

        return _this;
      }

      Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
        get: function () {
          return cssClasses$1;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
        /**
         * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            addClass: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            hasClass: function () {
              return false;
            },
            setStyle: function () {
              return undefined;
            },
            registerEventHandler: function () {
              return undefined;
            },
            deregisterEventHandler: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });

      MDCLineRippleFoundation.prototype.init = function () {
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
      };

      MDCLineRippleFoundation.prototype.destroy = function () {
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
      };

      MDCLineRippleFoundation.prototype.activate = function () {
        this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
        this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
      };

      MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
        this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
      };

      MDCLineRippleFoundation.prototype.deactivate = function () {
        this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
      };

      MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter_.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);

        if (evt.propertyName === 'opacity') {
          if (isDeactivating) {
            this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
            this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
          }
        }
      };

      return MDCLineRippleFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCLineRipple =
    /** @class */
    function (_super) {
      __extends(MDCLineRipple, _super);

      function MDCLineRipple() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCLineRipple.attachTo = function (root) {
        return new MDCLineRipple(root);
      };
      /**
       * Activates the line ripple
       */


      MDCLineRipple.prototype.activate = function () {
        this.foundation_.activate();
      };
      /**
       * Deactivates the line ripple
       */


      MDCLineRipple.prototype.deactivate = function () {
        this.foundation_.deactivate();
      };
      /**
       * Sets the transform origin given a user's click location.
       * The `rippleCenter` is the x-coordinate of the middle of the ripple.
       */


      MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
        this.foundation_.setRippleCenter(xCoordinate);
      };

      MDCLineRipple.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = {
          addClass: function (className) {
            return _this.root_.classList.add(className);
          },
          removeClass: function (className) {
            return _this.root_.classList.remove(className);
          },
          hasClass: function (className) {
            return _this.root_.classList.contains(className);
          },
          setStyle: function (propertyName, value) {
            return _this.root_.style.setProperty(propertyName, value);
          },
          registerEventHandler: function (evtType, handler) {
            return _this.listen(evtType, handler);
          },
          deregisterEventHandler: function (evtType, handler) {
            return _this.unlisten(evtType, handler);
          }
        }; // tslint:enable:object-literal-sort-keys

        return new MDCLineRippleFoundation(adapter);
      };

      return MDCLineRipple;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings = {
      NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
    };
    var numbers = {
      // This should stay in sync with $mdc-notched-outline-padding * 2.
      NOTCH_ELEMENT_PADDING: 8
    };
    var cssClasses$2 = {
      NO_LABEL: 'mdc-notched-outline--no-label',
      OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
      OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCNotchedOutlineFoundation =
    /** @class */
    function (_super) {
      __extends(MDCNotchedOutlineFoundation, _super);

      function MDCNotchedOutlineFoundation(adapter) {
        return _super.call(this, __assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
      }

      Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
        get: function () {
          return strings;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
        get: function () {
          return cssClasses$2;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
        get: function () {
          return numbers;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
        /**
         * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            addClass: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            setNotchWidthProperty: function () {
              return undefined;
            },
            removeNotchWidthProperty: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });
      /**
       * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
       */

      MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

        if (notchWidth > 0) {
          notchWidth += numbers.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
        }

        this.adapter_.setNotchWidthProperty(notchWidth);
        this.adapter_.addClass(OUTLINE_NOTCHED);
      };
      /**
       * Removes notched outline selector to close the notch in the outline.
       */


      MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        this.adapter_.removeClass(OUTLINE_NOTCHED);
        this.adapter_.removeNotchWidthProperty();
      };

      return MDCNotchedOutlineFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCNotchedOutline =
    /** @class */
    function (_super) {
      __extends(MDCNotchedOutline, _super);

      function MDCNotchedOutline() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCNotchedOutline.attachTo = function (root) {
        return new MDCNotchedOutline(root);
      };

      MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
        this.notchElement_ = this.root_.querySelector(strings.NOTCH_ELEMENT_SELECTOR);
        var label = this.root_.querySelector('.' + MDCFloatingLabelFoundation.cssClasses.ROOT);

        if (label) {
          label.style.transitionDuration = '0s';
          this.root_.classList.add(cssClasses$2.OUTLINE_UPGRADED);
          requestAnimationFrame(function () {
            label.style.transitionDuration = '';
          });
        } else {
          this.root_.classList.add(cssClasses$2.NO_LABEL);
        }
      };
      /**
       * Updates classes and styles to open the notch to the specified width.
       * @param notchWidth The notch width in the outline.
       */


      MDCNotchedOutline.prototype.notch = function (notchWidth) {
        this.foundation_.notch(notchWidth);
      };
      /**
       * Updates classes and styles to close the notch.
       */


      MDCNotchedOutline.prototype.closeNotch = function () {
        this.foundation_.closeNotch();
      };

      MDCNotchedOutline.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = {
          addClass: function (className) {
            return _this.root_.classList.add(className);
          },
          removeClass: function (className) {
            return _this.root_.classList.remove(className);
          },
          setNotchWidthProperty: function (width) {
            return _this.notchElement_.style.setProperty('width', width + 'px');
          },
          removeNotchWidthProperty: function () {
            return _this.notchElement_.style.removeProperty('width');
          }
        }; // tslint:enable:object-literal-sort-keys

        return new MDCNotchedOutlineFoundation(adapter);
      };

      return MDCNotchedOutline;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$3 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
    };
    var strings$1 = {
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top'
    };
    var numbers$1 = {
      DEACTIVATION_TIMEOUT_MS: 225,
      FG_DEACTIVATION_MS: 150,
      INITIAL_ORIGIN_SCALE: 0.6,
      PADDING: 10,
      TAP_DELAY_MS: 300
    };

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    /**
     * Stores result from applyPassive to avoid redundant processing to detect
     * passive event listener support.
     */

    var supportsPassive_;

    function detectEdgePseudoVarBug(windowObj) {
      // Detect versions of Edge with buggy var() support
      // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
      var document = windowObj.document;
      var node = document.createElement('div');
      node.className = 'mdc-ripple-surface--test-edge-var-bug';
      document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
      // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
      // but Firefox is known to support CSS custom properties correctly.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

      var computedStyle = windowObj.getComputedStyle(node);
      var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
      node.remove();
      return hasPseudoVarBug;
    }

    function supportsCssVariables(windowObj, forceRefresh) {
      if (forceRefresh === void 0) {
        forceRefresh = false;
      }

      var CSS = windowObj.CSS;
      var supportsCssVars = supportsCssVariables_;

      if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables_;
      }

      var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

      if (!supportsFunctionPresent) {
        return false;
      }

      var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
      // See: README section on Safari

      var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');

      if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
        supportsCssVars = !detectEdgePseudoVarBug(windowObj);
      } else {
        supportsCssVars = false;
      }

      if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVars;
      }

      return supportsCssVars;
    }
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */

    function applyPassive(globalObj, forceRefresh) {
      if (globalObj === void 0) {
        globalObj = window;
      }

      if (forceRefresh === void 0) {
        forceRefresh = false;
      }

      if (supportsPassive_ === undefined || forceRefresh) {
        var isSupported_1 = false;

        try {
          globalObj.document.addEventListener('test', function () {
            return undefined;
          }, {
            get passive() {
              isSupported_1 = true;
              return isSupported_1;
            }

          });
        } catch (e) {} // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.


        supportsPassive_ = isSupported_1;
      }

      return supportsPassive_ ? {
        passive: true
      } : false;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
      if (!evt) {
        return {
          x: 0,
          y: 0
        };
      }

      var x = pageOffset.x,
          y = pageOffset.y;
      var documentX = x + clientRect.left;
      var documentY = y + clientRect.top;
      var normalizedX;
      var normalizedY; // Determine touch point relative to the ripple container.

      if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
      } else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
      }

      return {
        x: normalizedX,
        y: normalizedY
      };
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

    var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

    var activatedTargets = [];

    var MDCRippleFoundation =
    /** @class */
    function (_super) {
      __extends(MDCRippleFoundation, _super);

      function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;

        _this.activationAnimationHasEnded_ = false;
        _this.activationTimer_ = 0;
        _this.fgDeactivationRemovalTimer_ = 0;
        _this.fgScale_ = '0';
        _this.frame_ = {
          width: 0,
          height: 0
        };
        _this.initialSize_ = 0;
        _this.layoutFrame_ = 0;
        _this.maxRadius_ = 0;
        _this.unboundedCoords_ = {
          left: 0,
          top: 0
        };
        _this.activationState_ = _this.defaultActivationState_();

        _this.activationTimerCallback_ = function () {
          _this.activationAnimationHasEnded_ = true;

          _this.runDeactivationUXLogicIfReady_();
        };

        _this.activateHandler_ = function (e) {
          return _this.activate_(e);
        };

        _this.deactivateHandler_ = function () {
          return _this.deactivate_();
        };

        _this.focusHandler_ = function () {
          return _this.handleFocus();
        };

        _this.blurHandler_ = function () {
          return _this.handleBlur();
        };

        _this.resizeHandler_ = function () {
          return _this.layout();
        };

        return _this;
      }

      Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function () {
          return cssClasses$3;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function () {
          return strings$1;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function () {
          return numbers$1;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function () {
          return {
            addClass: function () {
              return undefined;
            },
            browserSupportsCssVars: function () {
              return true;
            },
            computeBoundingRect: function () {
              return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
              };
            },
            containsEventTarget: function () {
              return true;
            },
            deregisterDocumentInteractionHandler: function () {
              return undefined;
            },
            deregisterInteractionHandler: function () {
              return undefined;
            },
            deregisterResizeHandler: function () {
              return undefined;
            },
            getWindowPageOffset: function () {
              return {
                x: 0,
                y: 0
              };
            },
            isSurfaceActive: function () {
              return true;
            },
            isSurfaceDisabled: function () {
              return true;
            },
            isUnbounded: function () {
              return true;
            },
            registerDocumentInteractionHandler: function () {
              return undefined;
            },
            registerInteractionHandler: function () {
              return undefined;
            },
            registerResizeHandler: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            updateCssVariable: function () {
              return undefined;
            }
          };
        },
        enumerable: true,
        configurable: true
      });

      MDCRippleFoundation.prototype.init = function () {
        var _this = this;

        var supportsPressRipple = this.supportsPressRipple_();
        this.registerRootHandlers_(supportsPressRipple);

        if (supportsPressRipple) {
          var _a = MDCRippleFoundation.cssClasses,
              ROOT_1 = _a.ROOT,
              UNBOUNDED_1 = _a.UNBOUNDED;
          requestAnimationFrame(function () {
            _this.adapter_.addClass(ROOT_1);

            if (_this.adapter_.isUnbounded()) {
              _this.adapter_.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


              _this.layoutInternal_();
            }
          });
        }
      };

      MDCRippleFoundation.prototype.destroy = function () {
        var _this = this;

        if (this.supportsPressRipple_()) {
          if (this.activationTimer_) {
            clearTimeout(this.activationTimer_);
            this.activationTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
          }

          if (this.fgDeactivationRemovalTimer_) {
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.fgDeactivationRemovalTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
          }

          var _a = MDCRippleFoundation.cssClasses,
              ROOT_2 = _a.ROOT,
              UNBOUNDED_2 = _a.UNBOUNDED;
          requestAnimationFrame(function () {
            _this.adapter_.removeClass(ROOT_2);

            _this.adapter_.removeClass(UNBOUNDED_2);

            _this.removeCssVars_();
          });
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
      };
      /**
       * @param evt Optional event containing position information.
       */


      MDCRippleFoundation.prototype.activate = function (evt) {
        this.activate_(evt);
      };

      MDCRippleFoundation.prototype.deactivate = function () {
        this.deactivate_();
      };

      MDCRippleFoundation.prototype.layout = function () {
        var _this = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }

        this.layoutFrame_ = requestAnimationFrame(function () {
          _this.layoutInternal_();

          _this.layoutFrame_ = 0;
        });
      };

      MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      };

      MDCRippleFoundation.prototype.handleFocus = function () {
        var _this = this;

        requestAnimationFrame(function () {
          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      };

      MDCRippleFoundation.prototype.handleBlur = function () {
        var _this = this;

        requestAnimationFrame(function () {
          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      };
      /**
       * We compute this property so that we are not querying information about the client
       * until the point in time where the foundation requests it. This prevents scenarios where
       * client-side feature-detection may happen too early, such as when components are rendered on the server
       * and then initialized at mount time on the client.
       */


      MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
        return this.adapter_.browserSupportsCssVars();
      };

      MDCRippleFoundation.prototype.defaultActivationState_ = function () {
        return {
          activationEvent: undefined,
          hasDeactivationUXRun: false,
          isActivated: false,
          isProgrammatic: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false
        };
      };
      /**
       * supportsPressRipple Passed from init to save a redundant function call
       */


      MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
        var _this = this;

        if (supportsPressRipple) {
          ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
          });

          if (this.adapter_.isUnbounded()) {
            this.adapter_.registerResizeHandler(this.resizeHandler_);
          }
        }

        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      };

      MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
        var _this = this;

        if (evt.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
          });
        }
      };

      MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
        var _this = this;

        ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
          _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      };

      MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
        var _this = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
          _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
        });
      };

      MDCRippleFoundation.prototype.removeCssVars_ = function () {
        var _this = this;

        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function (key) {
          if (key.indexOf('VAR_') === 0) {
            _this.adapter_.updateCssVariable(rippleStrings[key], null);
          }
        });
      };

      MDCRippleFoundation.prototype.activate_ = function (evt) {
        var _this = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;

        if (activationState.isActivated) {
          return;
        } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this.adapter_.containsEventTarget(target);
        });

        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (evt !== undefined) {
          activatedTargets.push(evt.target);
          this.registerDeactivationHandlers_(evt);
        }

        activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }

        requestAnimationFrame(function () {
          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];

          if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
            // If space was pressed, try again within an rAF call to detect :active, because different UAs report
            // active states inconsistently when they're called within event handling code:
            // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
            // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
            // variable is set within a rAF callback for a submit button interaction (#2241).
            activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

            if (activationState.wasElementMadeActive) {
              _this.animateActivation_();
            }
          }

          if (!activationState.wasElementMadeActive) {
            // Reset activation state immediately if element was not made active.
            _this.activationState_ = _this.defaultActivationState_();
          }
        });
      };

      MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
        return evt !== undefined && evt.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      };

      MDCRippleFoundation.prototype.animateActivation_ = function () {
        var _this = this;

        var _a = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _b.FG_DEACTIVATION,
            FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal_();
        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _c = this.getFgTranslationCoordinates_(),
              startPoint = _c.startPoint,
              endPoint = _c.endPoint;

          translateStart = startPoint.x + "px, " + startPoint.y + "px";
          translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      };

      MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
        var _a = this.activationState_,
            activationEvent = _a.activationEvent,
            wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;

        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        } // Center the element around the start point.


        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };
        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };
        return {
          startPoint: startPoint,
          endPoint: endPoint
        };
      };

      MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
        var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.


        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState_,
            hasDeactivationUXRun = _a.hasDeactivationUXRun,
            isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this.adapter_.removeClass(FG_DEACTIVATION);
          }, numbers$1.FG_DEACTIVATION_MS);
        }
      };

      MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      };

      MDCRippleFoundation.prototype.resetActivationState_ = function () {
        var _this = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.

        setTimeout(function () {
          return _this.previousActivationEvent_ = undefined;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      };

      MDCRippleFoundation.prototype.deactivate_ = function () {
        var _this = this;

        var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

        if (!activationState.isActivated) {
          return;
        }

        var state = __assign({}, activationState);

        if (activationState.isProgrammatic) {
          requestAnimationFrame(function () {
            return _this.animateDeactivation_(state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this.activationState_.hasDeactivationUXRun = true;

            _this.animateDeactivation_(state);

            _this.resetActivationState_();
          });
        }
      };

      MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer,
            wasElementMadeActive = _a.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      };

      MDCRippleFoundation.prototype.layoutInternal_ = function () {
        var _this = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.

        var getBoundedRadius = function () {
          var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

        this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
        this.updateLayoutCssVars_();
      };

      MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
        var _a = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _a.VAR_FG_SIZE,
            VAR_LEFT = _a.VAR_LEFT,
            VAR_TOP = _a.VAR_TOP,
            VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };
          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
        }
      };

      return MDCRippleFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCRipple =
    /** @class */
    function (_super) {
      __extends(MDCRipple, _super);

      function MDCRipple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.disabled = false;
        return _this;
      }

      MDCRipple.attachTo = function (root, opts) {
        if (opts === void 0) {
          opts = {
            isUnbounded: undefined
          };
        }

        var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

        if (opts.isUnbounded !== undefined) {
          ripple.unbounded = opts.isUnbounded;
        }

        return ripple;
      };

      MDCRipple.createAdapter = function (instance) {
        return {
          addClass: function (className) {
            return instance.root_.classList.add(className);
          },
          browserSupportsCssVars: function () {
            return supportsCssVariables(window);
          },
          computeBoundingRect: function () {
            return instance.root_.getBoundingClientRect();
          },
          containsEventTarget: function (target) {
            return instance.root_.contains(target);
          },
          deregisterDocumentInteractionHandler: function (evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, applyPassive());
          },
          deregisterInteractionHandler: function (evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, applyPassive());
          },
          deregisterResizeHandler: function (handler) {
            return window.removeEventListener('resize', handler);
          },
          getWindowPageOffset: function () {
            return {
              x: window.pageXOffset,
              y: window.pageYOffset
            };
          },
          isSurfaceActive: function () {
            return matches(instance.root_, ':active');
          },
          isSurfaceDisabled: function () {
            return Boolean(instance.disabled);
          },
          isUnbounded: function () {
            return Boolean(instance.unbounded);
          },
          registerDocumentInteractionHandler: function (evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, applyPassive());
          },
          registerInteractionHandler: function (evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, applyPassive());
          },
          registerResizeHandler: function (handler) {
            return window.addEventListener('resize', handler);
          },
          removeClass: function (className) {
            return instance.root_.classList.remove(className);
          },
          updateCssVariable: function (varName, value) {
            return instance.root_.style.setProperty(varName, value);
          }
        };
      };

      Object.defineProperty(MDCRipple.prototype, "unbounded", {
        get: function () {
          return Boolean(this.unbounded_);
        },
        set: function (unbounded) {
          this.unbounded_ = Boolean(unbounded);
          this.setUnbounded_();
        },
        enumerable: true,
        configurable: true
      });

      MDCRipple.prototype.activate = function () {
        this.foundation_.activate();
      };

      MDCRipple.prototype.deactivate = function () {
        this.foundation_.deactivate();
      };

      MDCRipple.prototype.layout = function () {
        this.foundation_.layout();
      };

      MDCRipple.prototype.getDefaultFoundation = function () {
        return new MDCRippleFoundation(MDCRipple.createAdapter(this));
      };

      MDCRipple.prototype.initialSyncWithDOM = function () {
        var root = this.root_;
        this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
      };
      /**
       * Closure Compiler throws an access control error when directly accessing a
       * protected or private property inside a getter/setter, like unbounded above.
       * By accessing the protected property inside a method, we solve that problem.
       * That's why this function exists.
       */


      MDCRipple.prototype.setUnbounded_ = function () {
        this.foundation_.setUnbounded(Boolean(this.unbounded_));
      };

      return MDCRipple;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$4 = {
      ROOT: 'mdc-text-field-character-counter'
    };
    var strings$2 = {
      ROOT_SELECTOR: "." + cssClasses$4.ROOT
    };

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextFieldCharacterCounterFoundation =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldCharacterCounterFoundation, _super);

      function MDCTextFieldCharacterCounterFoundation(adapter) {
        return _super.call(this, __assign({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter, adapter)) || this;
      }

      Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
        get: function () {
          return cssClasses$4;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
        get: function () {
          return strings$2;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
         */
        get: function () {
          return {
            setContent: function () {
              return undefined;
            }
          };
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
        currentLength = Math.min(currentLength, maxLength);
        this.adapter_.setContent(currentLength + " / " + maxLength);
      };

      return MDCTextFieldCharacterCounterFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextFieldCharacterCounter =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldCharacterCounter, _super);

      function MDCTextFieldCharacterCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCTextFieldCharacterCounter.attachTo = function (root) {
        return new MDCTextFieldCharacterCounter(root);
      };

      Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundation", {
        get: function () {
          return this.foundation_;
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


        var adapter = {
          setContent: function (content) {
            _this.root_.textContent = content;
          }
        };
        return new MDCTextFieldCharacterCounterFoundation(adapter);
      };

      return MDCTextFieldCharacterCounter;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$3 = {
      ARIA_CONTROLS: 'aria-controls',
      ICON_SELECTOR: '.mdc-text-field__icon',
      INPUT_SELECTOR: '.mdc-text-field__input',
      LABEL_SELECTOR: '.mdc-floating-label',
      LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
      OUTLINE_SELECTOR: '.mdc-notched-outline'
    };
    var cssClasses$5 = {
      DENSE: 'mdc-text-field--dense',
      DISABLED: 'mdc-text-field--disabled',
      FOCUSED: 'mdc-text-field--focused',
      HELPER_LINE: 'mdc-text-field-helper-line',
      INVALID: 'mdc-text-field--invalid',
      OUTLINED: 'mdc-text-field--outlined',
      ROOT: 'mdc-text-field',
      TEXTAREA: 'mdc-text-field--textarea',
      WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon'
    };
    var numbers$2 = {
      DENSE_LABEL_SCALE: 0.923,
      LABEL_SCALE: 0.75
    };
    /**
     * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
     * under the "Validation-related attributes" section.
     */

    var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];
    /**
     * Label should always float for these types as they show some UI even if value is empty.
     */

    var ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week'];

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
    var INTERACTION_EVENTS = ['click', 'keydown'];

    var MDCTextFieldFoundation =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldFoundation, _super);
      /**
       * @param adapter
       * @param foundationMap Map from subcomponent names to their subfoundations.
       */


      function MDCTextFieldFoundation(adapter, foundationMap) {
        if (foundationMap === void 0) {
          foundationMap = {};
        }

        var _this = _super.call(this, __assign({}, MDCTextFieldFoundation.defaultAdapter, adapter)) || this;

        _this.isFocused_ = false;
        _this.receivedUserInput_ = false;
        _this.isValid_ = true;
        _this.useNativeValidation_ = true;
        _this.helperText_ = foundationMap.helperText;
        _this.characterCounter_ = foundationMap.characterCounter;
        _this.leadingIcon_ = foundationMap.leadingIcon;
        _this.trailingIcon_ = foundationMap.trailingIcon;

        _this.inputFocusHandler_ = function () {
          return _this.activateFocus();
        };

        _this.inputBlurHandler_ = function () {
          return _this.deactivateFocus();
        };

        _this.inputInputHandler_ = function () {
          return _this.handleInput();
        };

        _this.setPointerXOffset_ = function (evt) {
          return _this.setTransformOrigin(evt);
        };

        _this.textFieldInteractionHandler_ = function () {
          return _this.handleTextFieldInteraction();
        };

        _this.validationAttributeChangeHandler_ = function (attributesList) {
          return _this.handleValidationAttributeChange(attributesList);
        };

        return _this;
      }

      Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
        get: function () {
          return cssClasses$5;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation, "strings", {
        get: function () {
          return strings$3;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation, "numbers", {
        get: function () {
          return numbers$2;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
        get: function () {
          var type = this.getNativeInput_().type;
          return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
        get: function () {
          return this.shouldAlwaysFloat_ || this.isFocused_ || Boolean(this.getValue()) || this.isBadInput_();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
        get: function () {
          return !this.isFocused_ && !this.isValid() && Boolean(this.getValue());
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            addClass: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            hasClass: function () {
              return true;
            },
            registerTextFieldInteractionHandler: function () {
              return undefined;
            },
            deregisterTextFieldInteractionHandler: function () {
              return undefined;
            },
            registerInputInteractionHandler: function () {
              return undefined;
            },
            deregisterInputInteractionHandler: function () {
              return undefined;
            },
            registerValidationAttributeChangeHandler: function () {
              return new MutationObserver(function () {
                return undefined;
              });
            },
            deregisterValidationAttributeChangeHandler: function () {
              return undefined;
            },
            getNativeInput: function () {
              return null;
            },
            isFocused: function () {
              return false;
            },
            activateLineRipple: function () {
              return undefined;
            },
            deactivateLineRipple: function () {
              return undefined;
            },
            setLineRippleTransformOrigin: function () {
              return undefined;
            },
            shakeLabel: function () {
              return undefined;
            },
            floatLabel: function () {
              return undefined;
            },
            hasLabel: function () {
              return false;
            },
            getLabelWidth: function () {
              return 0;
            },
            hasOutline: function () {
              return false;
            },
            notchOutline: function () {
              return undefined;
            },
            closeOutline: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldFoundation.prototype.init = function () {
        var _this = this;

        if (this.adapter_.isFocused()) {
          this.inputFocusHandler_();
        } else if (this.adapter_.hasLabel() && this.shouldFloat) {
          this.notchOutline(true);
          this.adapter_.floatLabel(true);
        }

        this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
        POINTERDOWN_EVENTS.forEach(function (evtType) {
          _this.adapter_.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
        });
        INTERACTION_EVENTS.forEach(function (evtType) {
          _this.adapter_.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
        });
        this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        this.setCharacterCounter_(this.getValue().length);
      };

      MDCTextFieldFoundation.prototype.destroy = function () {
        var _this = this;

        this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
        POINTERDOWN_EVENTS.forEach(function (evtType) {
          _this.adapter_.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
        });
        INTERACTION_EVENTS.forEach(function (evtType) {
          _this.adapter_.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
        });
        this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
      };
      /**
       * Handles user interactions with the Text Field.
       */


      MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
        var nativeInput = this.adapter_.getNativeInput();

        if (nativeInput && nativeInput.disabled) {
          return;
        }

        this.receivedUserInput_ = true;
      };
      /**
       * Handles validation attribute changes
       */


      MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
        var _this = this;

        attributesList.some(function (attributeName) {
          if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
            _this.styleValidity_(true);

            return true;
          }

          return false;
        });

        if (attributesList.indexOf('maxlength') > -1) {
          this.setCharacterCounter_(this.getValue().length);
        }
      };
      /**
       * Opens/closes the notched outline.
       */


      MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
        if (!this.adapter_.hasOutline()) {
          return;
        }

        if (openNotch) {
          var isDense = this.adapter_.hasClass(cssClasses$5.DENSE);
          var labelScale = isDense ? numbers$2.DENSE_LABEL_SCALE : numbers$2.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          this.adapter_.notchOutline(labelWidth);
        } else {
          this.adapter_.closeOutline();
        }
      };
      /**
       * Activates the text field focus state.
       */


      MDCTextFieldFoundation.prototype.activateFocus = function () {
        this.isFocused_ = true;
        this.styleFocused_(this.isFocused_);
        this.adapter_.activateLineRipple();

        if (this.adapter_.hasLabel()) {
          this.notchOutline(this.shouldFloat);
          this.adapter_.floatLabel(this.shouldFloat);
          this.adapter_.shakeLabel(this.shouldShake);
        }

        if (this.helperText_) {
          this.helperText_.showToScreenReader();
        }
      };
      /**
       * Sets the line ripple's transform origin, so that the line ripple activate
       * animation will animate out from the user's click location.
       */


      MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
        var touches = evt.touches;
        var targetEvent = touches ? touches[0] : evt;
        var targetClientRect = targetEvent.target.getBoundingClientRect();
        var normalizedX = targetEvent.clientX - targetClientRect.left;
        this.adapter_.setLineRippleTransformOrigin(normalizedX);
      };
      /**
       * Handles input change of text input and text area.
       */


      MDCTextFieldFoundation.prototype.handleInput = function () {
        this.autoCompleteFocus();
        this.setCharacterCounter_(this.getValue().length);
      };
      /**
       * Activates the Text Field's focus state in cases when the input value
       * changes without user input (e.g. programmatically).
       */


      MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
        if (!this.receivedUserInput_) {
          this.activateFocus();
        }
      };
      /**
       * Deactivates the Text Field's focus state.
       */


      MDCTextFieldFoundation.prototype.deactivateFocus = function () {
        this.isFocused_ = false;
        this.adapter_.deactivateLineRipple();
        var isValid = this.isValid();
        this.styleValidity_(isValid);
        this.styleFocused_(this.isFocused_);

        if (this.adapter_.hasLabel()) {
          this.notchOutline(this.shouldFloat);
          this.adapter_.floatLabel(this.shouldFloat);
          this.adapter_.shakeLabel(this.shouldShake);
        }

        if (!this.shouldFloat) {
          this.receivedUserInput_ = false;
        }
      };

      MDCTextFieldFoundation.prototype.getValue = function () {
        return this.getNativeInput_().value;
      };
      /**
       * @param value The value to set on the input Element.
       */


      MDCTextFieldFoundation.prototype.setValue = function (value) {
        // Prevent Safari from moving the caret to the end of the input when the value has not changed.
        if (this.getValue() !== value) {
          this.getNativeInput_().value = value;
        }

        var isValid = this.isValid();
        this.styleValidity_(isValid);

        if (this.adapter_.hasLabel()) {
          this.notchOutline(this.shouldFloat);
          this.adapter_.floatLabel(this.shouldFloat);
          this.adapter_.shakeLabel(this.shouldShake);
        }
      };
      /**
       * @return The custom validity state, if set; otherwise, the result of a native validity check.
       */


      MDCTextFieldFoundation.prototype.isValid = function () {
        return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
      };
      /**
       * @param isValid Sets the custom validity state of the Text Field.
       */


      MDCTextFieldFoundation.prototype.setValid = function (isValid) {
        this.isValid_ = isValid;
        this.styleValidity_(isValid);
        var shouldShake = !isValid && !this.isFocused_;

        if (this.adapter_.hasLabel()) {
          this.adapter_.shakeLabel(shouldShake);
        }
      };
      /**
       * Enables or disables the use of native validation. Use this for custom validation.
       * @param useNativeValidation Set this to false to ignore native input validation.
       */


      MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
        this.useNativeValidation_ = useNativeValidation;
      };

      MDCTextFieldFoundation.prototype.isDisabled = function () {
        return this.getNativeInput_().disabled;
      };
      /**
       * @param disabled Sets the text-field disabled or enabled.
       */


      MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
        this.getNativeInput_().disabled = disabled;
        this.styleDisabled_(disabled);
      };
      /**
       * @param content Sets the content of the helper text.
       */


      MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
        if (this.helperText_) {
          this.helperText_.setContent(content);
        }
      };
      /**
       * Sets the aria label of the leading icon.
       */


      MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
        if (this.leadingIcon_) {
          this.leadingIcon_.setAriaLabel(label);
        }
      };
      /**
       * Sets the text content of the leading icon.
       */


      MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
        if (this.leadingIcon_) {
          this.leadingIcon_.setContent(content);
        }
      };
      /**
       * Sets the aria label of the trailing icon.
       */


      MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
        if (this.trailingIcon_) {
          this.trailingIcon_.setAriaLabel(label);
        }
      };
      /**
       * Sets the text content of the trailing icon.
       */


      MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
        if (this.trailingIcon_) {
          this.trailingIcon_.setContent(content);
        }
      };
      /**
       * Sets character counter values that shows characters used and the total character limit.
       */


      MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
        if (!this.characterCounter_) {
          return;
        }

        var maxLength = this.getNativeInput_().maxLength;

        if (maxLength === -1) {
          throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
        }

        this.characterCounter_.setCounterValue(currentLength, maxLength);
      };
      /**
       * @return True if the Text Field input fails in converting the user-supplied value.
       */


      MDCTextFieldFoundation.prototype.isBadInput_ = function () {
        // The badInput property is not supported in IE 11 💩.
        return this.getNativeInput_().validity.badInput || false;
      };
      /**
       * @return The result of native validity checking (ValidityState.valid).
       */


      MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
        return this.getNativeInput_().validity.valid;
      };
      /**
       * Styles the component based on the validity state.
       */


      MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
        var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

        if (isValid) {
          this.adapter_.removeClass(INVALID);
        } else {
          this.adapter_.addClass(INVALID);
        }

        if (this.helperText_) {
          this.helperText_.setValidity(isValid);
        }
      };
      /**
       * Styles the component based on the focused state.
       */


      MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
        var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

        if (isFocused) {
          this.adapter_.addClass(FOCUSED);
        } else {
          this.adapter_.removeClass(FOCUSED);
        }
      };
      /**
       * Styles the component based on the disabled state.
       */


      MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
        var _a = MDCTextFieldFoundation.cssClasses,
            DISABLED = _a.DISABLED,
            INVALID = _a.INVALID;

        if (isDisabled) {
          this.adapter_.addClass(DISABLED);
          this.adapter_.removeClass(INVALID);
        } else {
          this.adapter_.removeClass(DISABLED);
        }

        if (this.leadingIcon_) {
          this.leadingIcon_.setDisabled(isDisabled);
        }

        if (this.trailingIcon_) {
          this.trailingIcon_.setDisabled(isDisabled);
        }
      };
      /**
       * @return The native text input element from the host environment, or an object with the same shape for unit tests.
       */


      MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
        // this.adapter_ may be undefined in foundation unit tests. This happens when testdouble is creating a mock object
        // and invokes the shouldShake/shouldFloat getters (which in turn call getValue(), which calls this method) before
        // init() has been called from the MDCTextField constructor. To work around that issue, we return a dummy object.
        var nativeInput = this.adapter_ ? this.adapter_.getNativeInput() : null;
        return nativeInput || {
          disabled: false,
          maxLength: -1,
          type: 'input',
          validity: {
            badInput: false,
            valid: true
          },
          value: ''
        };
      };

      return MDCTextFieldFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$6 = {
      HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
      HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
      ROOT: 'mdc-text-field-helper-text'
    };
    var strings$4 = {
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role',
      ROOT_SELECTOR: "." + cssClasses$6.ROOT
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextFieldHelperTextFoundation =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldHelperTextFoundation, _super);

      function MDCTextFieldHelperTextFoundation(adapter) {
        return _super.call(this, __assign({}, MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)) || this;
      }

      Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
        get: function () {
          return cssClasses$6;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
        get: function () {
          return strings$4;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            addClass: function () {
              return undefined;
            },
            removeClass: function () {
              return undefined;
            },
            hasClass: function () {
              return false;
            },
            setAttr: function () {
              return undefined;
            },
            removeAttr: function () {
              return undefined;
            },
            setContent: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });
      /**
       * Sets the content of the helper text field.
       */

      MDCTextFieldHelperTextFoundation.prototype.setContent = function (content) {
        this.adapter_.setContent(content);
      };
      /**
       * @param isPersistent Sets the persistency of the helper text.
       */


      MDCTextFieldHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
        if (isPersistent) {
          this.adapter_.addClass(cssClasses$6.HELPER_TEXT_PERSISTENT);
        } else {
          this.adapter_.removeClass(cssClasses$6.HELPER_TEXT_PERSISTENT);
        }
      };
      /**
       * @param isValidation True to make the helper text act as an error validation message.
       */


      MDCTextFieldHelperTextFoundation.prototype.setValidation = function (isValidation) {
        if (isValidation) {
          this.adapter_.addClass(cssClasses$6.HELPER_TEXT_VALIDATION_MSG);
        } else {
          this.adapter_.removeClass(cssClasses$6.HELPER_TEXT_VALIDATION_MSG);
        }
      };
      /**
       * Makes the helper text visible to the screen reader.
       */


      MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function () {
        this.adapter_.removeAttr(strings$4.ARIA_HIDDEN);
      };
      /**
       * Sets the validity of the helper text based on the input validity.
       */


      MDCTextFieldHelperTextFoundation.prototype.setValidity = function (inputIsValid) {
        var helperTextIsPersistent = this.adapter_.hasClass(cssClasses$6.HELPER_TEXT_PERSISTENT);
        var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$6.HELPER_TEXT_VALIDATION_MSG);
        var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

        if (validationMsgNeedsDisplay) {
          this.adapter_.setAttr(strings$4.ROLE, 'alert');
        } else {
          this.adapter_.removeAttr(strings$4.ROLE);
        }

        if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
          this.hide_();
        }
      };
      /**
       * Hides the help text from screen readers.
       */


      MDCTextFieldHelperTextFoundation.prototype.hide_ = function () {
        this.adapter_.setAttr(strings$4.ARIA_HIDDEN, 'true');
      };

      return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextFieldHelperText =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldHelperText, _super);

      function MDCTextFieldHelperText() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCTextFieldHelperText.attachTo = function (root) {
        return new MDCTextFieldHelperText(root);
      };

      Object.defineProperty(MDCTextFieldHelperText.prototype, "foundation", {
        get: function () {
          return this.foundation_;
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldHelperText.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = {
          addClass: function (className) {
            return _this.root_.classList.add(className);
          },
          removeClass: function (className) {
            return _this.root_.classList.remove(className);
          },
          hasClass: function (className) {
            return _this.root_.classList.contains(className);
          },
          setAttr: function (attr, value) {
            return _this.root_.setAttribute(attr, value);
          },
          removeAttr: function (attr) {
            return _this.root_.removeAttribute(attr);
          },
          setContent: function (content) {
            _this.root_.textContent = content;
          }
        }; // tslint:enable:object-literal-sort-keys

        return new MDCTextFieldHelperTextFoundation(adapter);
      };

      return MDCTextFieldHelperText;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var strings$5 = {
      ICON_EVENT: 'MDCTextField:icon',
      ICON_ROLE: 'button'
    };

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var INTERACTION_EVENTS$1 = ['click', 'keydown'];

    var MDCTextFieldIconFoundation =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldIconFoundation, _super);

      function MDCTextFieldIconFoundation(adapter) {
        var _this = _super.call(this, __assign({}, MDCTextFieldIconFoundation.defaultAdapter, adapter)) || this;

        _this.savedTabIndex_ = null;

        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };

        return _this;
      }

      Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
        get: function () {
          return strings$5;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
         */
        get: function () {
          // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
          return {
            getAttr: function () {
              return null;
            },
            setAttr: function () {
              return undefined;
            },
            removeAttr: function () {
              return undefined;
            },
            setContent: function () {
              return undefined;
            },
            registerInteractionHandler: function () {
              return undefined;
            },
            deregisterInteractionHandler: function () {
              return undefined;
            },
            notifyIconAction: function () {
              return undefined;
            }
          }; // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldIconFoundation.prototype.init = function () {
        var _this = this;

        this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
        INTERACTION_EVENTS$1.forEach(function (evtType) {
          _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
        });
      };

      MDCTextFieldIconFoundation.prototype.destroy = function () {
        var _this = this;

        INTERACTION_EVENTS$1.forEach(function (evtType) {
          _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
        });
      };

      MDCTextFieldIconFoundation.prototype.setDisabled = function (disabled) {
        if (!this.savedTabIndex_) {
          return;
        }

        if (disabled) {
          this.adapter_.setAttr('tabindex', '-1');
          this.adapter_.removeAttr('role');
        } else {
          this.adapter_.setAttr('tabindex', this.savedTabIndex_);
          this.adapter_.setAttr('role', strings$5.ICON_ROLE);
        }
      };

      MDCTextFieldIconFoundation.prototype.setAriaLabel = function (label) {
        this.adapter_.setAttr('aria-label', label);
      };

      MDCTextFieldIconFoundation.prototype.setContent = function (content) {
        this.adapter_.setContent(content);
      };

      MDCTextFieldIconFoundation.prototype.handleInteraction = function (evt) {
        var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;

        if (evt.type === 'click' || isEnterKey) {
          this.adapter_.notifyIconAction();
        }
      };

      return MDCTextFieldIconFoundation;
    }(MDCFoundation);

    /**
     * @license
     * Copyright 2017 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextFieldIcon =
    /** @class */
    function (_super) {
      __extends(MDCTextFieldIcon, _super);

      function MDCTextFieldIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCTextFieldIcon.attachTo = function (root) {
        return new MDCTextFieldIcon(root);
      };

      Object.defineProperty(MDCTextFieldIcon.prototype, "foundation", {
        get: function () {
          return this.foundation_;
        },
        enumerable: true,
        configurable: true
      });

      MDCTextFieldIcon.prototype.getDefaultFoundation = function () {
        var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = {
          getAttr: function (attr) {
            return _this.root_.getAttribute(attr);
          },
          setAttr: function (attr, value) {
            return _this.root_.setAttribute(attr, value);
          },
          removeAttr: function (attr) {
            return _this.root_.removeAttribute(attr);
          },
          setContent: function (content) {
            _this.root_.textContent = content;
          },
          registerInteractionHandler: function (evtType, handler) {
            return _this.listen(evtType, handler);
          },
          deregisterInteractionHandler: function (evtType, handler) {
            return _this.unlisten(evtType, handler);
          },
          notifyIconAction: function () {
            return _this.emit(MDCTextFieldIconFoundation.strings.ICON_EVENT, {}
            /* evtData */
            , true
            /* shouldBubble */
            );
          }
        }; // tslint:enable:object-literal-sort-keys

        return new MDCTextFieldIconFoundation(adapter);
      };

      return MDCTextFieldIcon;
    }(MDCComponent);

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    var MDCTextField =
    /** @class */
    function (_super) {
      __extends(MDCTextField, _super);

      function MDCTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      MDCTextField.attachTo = function (root) {
        return new MDCTextField(root);
      };

      MDCTextField.prototype.initialize = function (rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
        if (rippleFactory === void 0) {
          rippleFactory = function (el, foundation) {
            return new MDCRipple(el, foundation);
          };
        }

        if (lineRippleFactory === void 0) {
          lineRippleFactory = function (el) {
            return new MDCLineRipple(el);
          };
        }

        if (helperTextFactory === void 0) {
          helperTextFactory = function (el) {
            return new MDCTextFieldHelperText(el);
          };
        }

        if (characterCounterFactory === void 0) {
          characterCounterFactory = function (el) {
            return new MDCTextFieldCharacterCounter(el);
          };
        }

        if (iconFactory === void 0) {
          iconFactory = function (el) {
            return new MDCTextFieldIcon(el);
          };
        }

        if (labelFactory === void 0) {
          labelFactory = function (el) {
            return new MDCFloatingLabel(el);
          };
        }

        if (outlineFactory === void 0) {
          outlineFactory = function (el) {
            return new MDCNotchedOutline(el);
          };
        }

        this.input_ = this.root_.querySelector(strings$3.INPUT_SELECTOR);
        var labelElement = this.root_.querySelector(strings$3.LABEL_SELECTOR);
        this.label_ = labelElement ? labelFactory(labelElement) : null;
        var lineRippleElement = this.root_.querySelector(strings$3.LINE_RIPPLE_SELECTOR);
        this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
        var outlineElement = this.root_.querySelector(strings$3.OUTLINE_SELECTOR);
        this.outline_ = outlineElement ? outlineFactory(outlineElement) : null; // Helper text

        var helperTextStrings = MDCTextFieldHelperTextFoundation.strings;
        var nextElementSibling = this.root_.nextElementSibling;
        var hasHelperLine = nextElementSibling && nextElementSibling.classList.contains(cssClasses$5.HELPER_LINE);
        var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
        this.helperText_ = helperTextEl ? helperTextFactory(helperTextEl) : null; // Character counter

        var characterCounterStrings = MDCTextFieldCharacterCounterFoundation.strings;
        var characterCounterEl = this.root_.querySelector(characterCounterStrings.ROOT_SELECTOR); // If character counter is not found in root element search in sibling element.

        if (!characterCounterEl && hasHelperLine && nextElementSibling) {
          characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
        }

        this.characterCounter_ = characterCounterEl ? characterCounterFactory(characterCounterEl) : null;
        this.leadingIcon_ = null;
        this.trailingIcon_ = null;
        var iconElements = this.root_.querySelectorAll(strings$3.ICON_SELECTOR);

        if (iconElements.length > 0) {
          if (iconElements.length > 1) {
            // Has both icons.
            this.leadingIcon_ = iconFactory(iconElements[0]);
            this.trailingIcon_ = iconFactory(iconElements[1]);
          } else {
            if (this.root_.classList.contains(cssClasses$5.WITH_LEADING_ICON)) {
              this.leadingIcon_ = iconFactory(iconElements[0]);
            } else {
              this.trailingIcon_ = iconFactory(iconElements[0]);
            }
          }
        }

        this.ripple = this.createRipple_(rippleFactory);
      };

      MDCTextField.prototype.destroy = function () {
        if (this.ripple) {
          this.ripple.destroy();
        }

        if (this.lineRipple_) {
          this.lineRipple_.destroy();
        }

        if (this.helperText_) {
          this.helperText_.destroy();
        }

        if (this.characterCounter_) {
          this.characterCounter_.destroy();
        }

        if (this.leadingIcon_) {
          this.leadingIcon_.destroy();
        }

        if (this.trailingIcon_) {
          this.trailingIcon_.destroy();
        }

        if (this.label_) {
          this.label_.destroy();
        }

        if (this.outline_) {
          this.outline_.destroy();
        }

        _super.prototype.destroy.call(this);
      };
      /**
       * Initializes the Text Field's internal state based on the environment's
       * state.
       */


      MDCTextField.prototype.initialSyncWithDOM = function () {
        this.disabled = this.input_.disabled;
      };

      Object.defineProperty(MDCTextField.prototype, "value", {
        get: function () {
          return this.foundation_.getValue();
        },

        /**
         * @param value The value to set on the input.
         */
        set: function (value) {
          this.foundation_.setValue(value);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "disabled", {
        get: function () {
          return this.foundation_.isDisabled();
        },

        /**
         * @param disabled Sets the Text Field disabled or enabled.
         */
        set: function (disabled) {
          this.foundation_.setDisabled(disabled);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "valid", {
        get: function () {
          return this.foundation_.isValid();
        },

        /**
         * @param valid Sets the Text Field valid or invalid.
         */
        set: function (valid) {
          this.foundation_.setValid(valid);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "required", {
        get: function () {
          return this.input_.required;
        },

        /**
         * @param required Sets the Text Field to required.
         */
        set: function (required) {
          this.input_.required = required;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "pattern", {
        get: function () {
          return this.input_.pattern;
        },

        /**
         * @param pattern Sets the input element's validation pattern.
         */
        set: function (pattern) {
          this.input_.pattern = pattern;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "minLength", {
        get: function () {
          return this.input_.minLength;
        },

        /**
         * @param minLength Sets the input element's minLength.
         */
        set: function (minLength) {
          this.input_.minLength = minLength;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "maxLength", {
        get: function () {
          return this.input_.maxLength;
        },

        /**
         * @param maxLength Sets the input element's maxLength.
         */
        set: function (maxLength) {
          // Chrome throws exception if maxLength is set to a value less than zero
          if (maxLength < 0) {
            this.input_.removeAttribute('maxLength');
          } else {
            this.input_.maxLength = maxLength;
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "min", {
        get: function () {
          return this.input_.min;
        },

        /**
         * @param min Sets the input element's min.
         */
        set: function (min) {
          this.input_.min = min;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "max", {
        get: function () {
          return this.input_.max;
        },

        /**
         * @param max Sets the input element's max.
         */
        set: function (max) {
          this.input_.max = max;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "step", {
        get: function () {
          return this.input_.step;
        },

        /**
         * @param step Sets the input element's step.
         */
        set: function (step) {
          this.input_.step = step;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
        /**
         * Sets the helper text element content.
         */
        set: function (content) {
          this.foundation_.setHelperTextContent(content);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
        /**
         * Sets the aria label of the leading icon.
         */
        set: function (label) {
          this.foundation_.setLeadingIconAriaLabel(label);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
        /**
         * Sets the text content of the leading icon.
         */
        set: function (content) {
          this.foundation_.setLeadingIconContent(content);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
        /**
         * Sets the aria label of the trailing icon.
         */
        set: function (label) {
          this.foundation_.setTrailingIconAriaLabel(label);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
        /**
         * Sets the text content of the trailing icon.
         */
        set: function (content) {
          this.foundation_.setTrailingIconContent(content);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
        /**
         * Enables or disables the use of native validation. Use this for custom validation.
         * @param useNativeValidation Set this to false to ignore native input validation.
         */
        set: function (useNativeValidation) {
          this.foundation_.setUseNativeValidation(useNativeValidation);
        },
        enumerable: true,
        configurable: true
      });
      /**
       * Focuses the input element.
       */

      MDCTextField.prototype.focus = function () {
        this.input_.focus();
      };
      /**
       * Recomputes the outline SVG path for the outline element.
       */


      MDCTextField.prototype.layout = function () {
        var openNotch = this.foundation_.shouldFloat;
        this.foundation_.notchOutline(openNotch);
      };

      MDCTextField.prototype.getDefaultFoundation = function () {
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = __assign({}, this.getRootAdapterMethods_(), this.getInputAdapterMethods_(), this.getLabelAdapterMethods_(), this.getLineRippleAdapterMethods_(), this.getOutlineAdapterMethods_()); // tslint:enable:object-literal-sort-keys


        return new MDCTextFieldFoundation(adapter, this.getFoundationMap_());
      };

      MDCTextField.prototype.getRootAdapterMethods_ = function () {
        var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        return {
          addClass: function (className) {
            return _this.root_.classList.add(className);
          },
          removeClass: function (className) {
            return _this.root_.classList.remove(className);
          },
          hasClass: function (className) {
            return _this.root_.classList.contains(className);
          },
          registerTextFieldInteractionHandler: function (evtType, handler) {
            return _this.listen(evtType, handler);
          },
          deregisterTextFieldInteractionHandler: function (evtType, handler) {
            return _this.unlisten(evtType, handler);
          },
          registerValidationAttributeChangeHandler: function (handler) {
            var getAttributesList = function (mutationsList) {
              return mutationsList.map(function (mutation) {
                return mutation.attributeName;
              }).filter(function (attributeName) {
                return attributeName;
              });
            };

            var observer = new MutationObserver(function (mutationsList) {
              return handler(getAttributesList(mutationsList));
            });
            var config = {
              attributes: true
            };
            observer.observe(_this.input_, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: function (observer) {
            return observer.disconnect();
          }
        }; // tslint:enable:object-literal-sort-keys
      };

      MDCTextField.prototype.getInputAdapterMethods_ = function () {
        var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        return {
          getNativeInput: function () {
            return _this.input_;
          },
          isFocused: function () {
            return document.activeElement === _this.input_;
          },
          registerInputInteractionHandler: function (evtType, handler) {
            return _this.input_.addEventListener(evtType, handler);
          },
          deregisterInputInteractionHandler: function (evtType, handler) {
            return _this.input_.removeEventListener(evtType, handler);
          }
        }; // tslint:enable:object-literal-sort-keys
      };

      MDCTextField.prototype.getLabelAdapterMethods_ = function () {
        var _this = this;

        return {
          floatLabel: function (shouldFloat) {
            return _this.label_ && _this.label_.float(shouldFloat);
          },
          getLabelWidth: function () {
            return _this.label_ ? _this.label_.getWidth() : 0;
          },
          hasLabel: function () {
            return Boolean(_this.label_);
          },
          shakeLabel: function (shouldShake) {
            return _this.label_ && _this.label_.shake(shouldShake);
          }
        };
      };

      MDCTextField.prototype.getLineRippleAdapterMethods_ = function () {
        var _this = this;

        return {
          activateLineRipple: function () {
            if (_this.lineRipple_) {
              _this.lineRipple_.activate();
            }
          },
          deactivateLineRipple: function () {
            if (_this.lineRipple_) {
              _this.lineRipple_.deactivate();
            }
          },
          setLineRippleTransformOrigin: function (normalizedX) {
            if (_this.lineRipple_) {
              _this.lineRipple_.setRippleCenter(normalizedX);
            }
          }
        };
      };

      MDCTextField.prototype.getOutlineAdapterMethods_ = function () {
        var _this = this;

        return {
          closeOutline: function () {
            return _this.outline_ && _this.outline_.closeNotch();
          },
          hasOutline: function () {
            return Boolean(_this.outline_);
          },
          notchOutline: function (labelWidth) {
            return _this.outline_ && _this.outline_.notch(labelWidth);
          }
        };
      };
      /**
       * @return A map of all subcomponents to subfoundations.
       */


      MDCTextField.prototype.getFoundationMap_ = function () {
        return {
          characterCounter: this.characterCounter_ ? this.characterCounter_.foundation : undefined,
          helperText: this.helperText_ ? this.helperText_.foundation : undefined,
          leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
          trailingIcon: this.trailingIcon_ ? this.trailingIcon_.foundation : undefined
        };
      };

      MDCTextField.prototype.createRipple_ = function (rippleFactory) {
        var _this = this;

        var isTextArea = this.root_.classList.contains(cssClasses$5.TEXTAREA);
        var isOutlined = this.root_.classList.contains(cssClasses$5.OUTLINED);

        if (isTextArea || isOutlined) {
          return null;
        } // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


        var adapter = __assign({}, MDCRipple.createAdapter(this), {
          isSurfaceActive: function () {
            return matches(_this.input_, ':active');
          },
          registerInteractionHandler: function (evtType, handler) {
            return _this.input_.addEventListener(evtType, handler);
          },
          deregisterInteractionHandler: function (evtType, handler) {
            return _this.input_.removeEventListener(evtType, handler);
          }
        }); // tslint:enable:object-literal-sort-keys


        return rippleFactory(this.root_, new MDCRippleFoundation(adapter));
      };

      return MDCTextField;
    }(MDCComponent);

    const username = new MDCTextField(document.querySelector('.username'));
    const password = new MDCTextField(document.querySelector('.password'));
    new MDCRipple(document.querySelector('.cancel'));
    new MDCRipple(document.querySelector('.next'));

}));

//# sourceMappingURL=../maps/js/login.js.map
