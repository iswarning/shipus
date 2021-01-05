/*! @license ScrollReveal v4.0.7

	Copyright 2020 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ScrollReveal = factory());
}(this, function () { 'use strict';

	var defaults = {
		delay: 0,
		distance: '0',
		duration: 600,
		easing: 'cubic-bezier(0.5, 0, 0, 1)',
		interval: 0,
		opacity: 0,
		origin: 'bottom',
		rotate: {
			x: 0,
			y: 0,
			z: 0
		},
		scale: 1,
		cleanup: false,
		container: document.documentElement,
		desktop: true,
		mobile: true,
		reset: false,
		useDelay: 'always',
		viewFactor: 0.0,
		viewOffset: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		afterReset: function afterReset() {},
		afterReveal: function afterReveal() {},
		beforeReset: function beforeReset() {},
		beforeReveal: function beforeReveal() {}
	};

	function failure() {
		document.documentElement.classList.remove('sr');

		return {
			clean: function clean() {},
			destroy: function destroy() {},
			reveal: function reveal() {},
			sync: function sync() {},
			get noop() {
				return true
			}
		}
	}

	function success() {
		document.documentElement.classList.add('sr');

		if (document.body) {
			document.body.style.height = '100%';
		} else {
			document.addEventListener('DOMContentLoaded', function () {
				document.body.style.height = '100%';
			});
		}
	}

	var mount = { success: success, failure: failure };

	/*! @license is-dom-node v1.0.4

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/
	function isDomNode(x) {
		return typeof window.Node === 'object'
			? x instanceof window.Node
			: x !== null &&
					typeof x === 'object' &&
					typeof x.nodeType === 'number' &&
					typeof x.nodeName === 'string'
	}

	/*! @license is-dom-node-list v1.2.1

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/

	function isDomNodeList(x) {
		var prototypeToString = Object.prototype.toString.call(x);
		var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;

		return typeof window.NodeList === 'object'
			? x instanceof window.NodeList
			: x !== null &&
					typeof x === 'object' &&
					typeof x.length === 'number' &&
					regex.test(prototypeToString) &&
					(x.length === 0 || isDomNode(x[0]))
	}

	/*! @license Tealight v0.3.6

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/

	function tealight(target, context) {
	  if ( context === void 0 ) { context = document; }

	  if (target instanceof Array) { return target.filter(isDomNode); }
	  if (isDomNode(target)) { return [target]; }
	  if (isDomNodeList(target)) { return Array.prototype.slice.call(target); }
	  if (typeof target === "string") {
	    try {
	      var query = context.querySelectorAll(target);
	      return Array.prototype.slice.call(query);
	    } catch (err) {
	      return [];
	    }
	  }
	  return [];
	}

	function isObject(x) {
		return (
			x !== null &&
			x instanceof Object &&
			(x.constructor === Object ||
				Object.prototype.toString.call(x) === '[object Object]')
		)
	}

	function each(collection, callback) {
		if (isObject(collection)) {
			var keys = Object.keys(collection);
			return keys.forEach(function (key) { return callback(collection[key], key, collection); })
		}
		if (collection instanceof Array) {
			return collection.forEach(function (item, i) { return callback(item, i, collection); })
		}
		throw new TypeError('Expected either an array or object literal.')
	}

	function logger(message) {
		var details = [], len = arguments.length - 1;
		while ( len-- > 0 ) details[ len ] = arguments[ len + 1 ];

		if (this.constructor.debug && console) {
			var report = "%cScrollReveal: " + message;
			details.forEach(function (detail) { return (report += "\n — " + detail); });
			console.log(report, 'color: #ea654b;'); // eslint-disable-line no-console
		}
	}

	function rinse() {
		var this$1 = this;

		var struct = function () { return ({
			active: [],
			stale: []
		}); };

		var elementIds = struct();
		var sequenceIds = struct();
		var containerIds = struct();

		/**
		 * Take stock of active element IDs.
		 */
		try {
			each(tealight('[data-sr-id]'), function (node) {
				var id = parseInt(node.getAttribute('data-sr-id'));
				elementIds.active.push(id);
			});
		} catch (e) {
			throw e
		}
		/**
		 * Destroy stale elements.
		 */
		each(this.store.elements, function (element) {
			if (elementIds.active.indexOf(element.id) === -1) {
				elementIds.stale.push(element.id);
			}
		});

		each(elementIds.stale, function (staleId) { return delete this$1.store.elements[staleId]; });

		/**
		 * Take stock of active container and sequence IDs.
		 */
		each(this.store.elements, function (element) {
			if (containerIds.active.indexOf(element.containerId) === -1) {
				containerIds.active.push(element.containerId);
			}
			if (element.hasOwnProperty('sequence')) {
				if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
					sequenceIds.active.push(element.sequence.id);
				}
			}
		});

		/**
		 * Destroy stale containers.
		 */
		each(this.store.containers, function (container) {
			if (containerIds.active.indexOf(container.id) === -1) {
				containerIds.stale.push(container.id);
			}
		});

		each(containerIds.stale, function (staleId) {
			var stale = this$1.store.containers[staleId].node;
			stale.removeEventListener('scroll', this$1.delegate);
			stale.removeEventListener('resize', this$1.delegate);
			delete this$1.store.containers[staleId];
		});

		/**
		 * Destroy stale sequences.
		 */
		each(this.store.sequences, function (sequence) {
			if (sequenceIds.active.indexOf(sequence.id) === -1) {
				sequenceIds.stale.push(sequence.id);
			}
		});

		each(sequenceIds.stale, function (staleId) { return delete this$1.store.sequences[staleId]; });
	}

	function clean(target) {
		var this$1 = this;

		var dirty;
		try {
			each(tealight(target), function (node) {
				var id = node.getAttribute('data-sr-id');
				if (id !== null) {
					dirty = true;
					var element = this$1.store.elements[id];
					if (element.callbackTimer) {
						window.clearTimeout(element.callbackTimer.clock);
					}
					node.setAttribute('style', element.styles.inline.generated);
					node.removeAttribute('data-sr-id');
					delete this$1.store.elements[id];
				}
			});
		} catch (e) {
			return logger.call(this, 'Clean failed.', e.message)
		}

		if (dirty) {
			try {
				rinse.call(this);
			} catch (e) {
				return logger.call(this, 'Clean failed.', e.message)
			}
		}
	}

	function destroy() {
		var this$1 = this;

		/**
		 * Remove all generated styles and element ids
		 */
		each(this.store.elements, function (element) {
			element.node.setAttribute('style', element.styles.inline.generated);
			element.node.removeAttribute('data-sr-id');
		});

		/**
		 * Remove all event listeners.
		 */
		each(this.store.containers, function (container) {
			var target =
				container.node === document.documentElement ? window : container.node;
			target.removeEventListener('scroll', this$1.delegate);
			target.removeEventListener('resize', this$1.delegate);
		});

		/**
		 * Clear all data from the store
		 */
		this.store = {
			containers: {},
			elements: {},
			history: [],
			sequences: {}
		};
	}

	/*! @license Rematrix v0.3.0

		Copyright 2018 Julian Lloyd.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
	*/
	/**
	 * @module Rematrix
	 */

	/**
	 * Transformation matrices in the browser come in two flavors:
	 *
	 *  - `matrix` using 6 values (short)
	 *  - `matrix3d` using 16 values (long)
	 *
	 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
	 * to expand short form matrices to their equivalent long form.
	 *
	 * @param  {array} source - Accepts both short and long form matrices.
	 * @return {array}
	 */
	function format(source) {
		if (source.constructor !== Array) {
			throw new TypeError('Expected array.')
		}
		if (source.length === 16) {
			return source
		}
		if (source.length === 6) {
			var matrix = identity();
			matrix[0] = source[0];
			matrix[1] = source[1];
			matrix[4] = source[2];
			matrix[5] = source[3];
			matrix[12] = source[4];
			matrix[13] = source[5];
			return matrix
		}
		throw new RangeError('Expected array with either 6 or 16 values.')
	}

	/**
	 * Returns a matrix representing no transformation. The product of any matrix
	 * multiplied by the identity matrix will be the original matrix.
	 *
	 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
	 *
	 * @return {array}
	 */
	function identity() {
		var matrix = [];
		for (var i = 0; i < 16; i++) {
			i % 5 == 0 ? matrix.push(1) : matrix.push(0);
		}
		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing the combined transformations
	 * of both arguments.
	 *
	 * > **Note:** Order is very important. For example, rotating 45°
	 * along the Z-axis, followed by translating 500 pixels along the
	 * Y-axis... is not the same as translating 500 pixels along the
	 * Y-axis, followed by rotating 45° along on the Z-axis.
	 *
	 * @param  {array} m - Accepts both short and long form matrices.
	 * @param  {array} x - Accepts both short and long form matrices.
	 * @return {array}
	 */
	function multiply(m, x) {
		var fm = format(m);
		var fx = format(x);
		var product = [];

		for (var i = 0; i < 4; i++) {
			var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
			for (var j = 0; j < 4; j++) {
				var k = j * 4;
				var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
				var result =
					row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];

				product[i + k] = result;
			}
		}

		return product
	}

	/**
	 * Attempts to return a 4x4 matrix describing the CSS transform
	 * matrix passed in, but will return the identity matrix as a
	 * fallback.
	 *
	 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
	 * `string` from computed styles) to its equivalent array format.
	 *
	 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
	 * @return {array}
	 */
	function parse(source) {
		if (typeof source === 'string') {
			var match = source.match(/matrix(3d)?\(([^)]+)\)/);
			if (match) {
				var raw = match[2].split(', ').map(parseFloat);
				return format(raw)
			}
		}
		return identity()
	}

	/**
	 * Returns a 4x4 matrix describing X-axis rotation.
	 *
	 * @param  {number} angle - Measured in degrees.
	 * @return {array}
	 */
	function rotateX(angle) {
		var theta = Math.PI / 180 * angle;
		var matrix = identity();

		matrix[5] = matrix[10] = Math.cos(theta);
		matrix[6] = matrix[9] = Math.sin(theta);
		matrix[9] *= -1;

		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing Y-axis rotation.
	 *
	 * @param  {number} angle - Measured in degrees.
	 * @return {array}
	 */
	function rotateY(angle) {
		var theta = Math.PI / 180 * angle;
		var matrix = identity();

		matrix[0] = matrix[10] = Math.cos(theta);
		matrix[2] = matrix[8] = Math.sin(theta);
		matrix[2] *= -1;

		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing Z-axis rotation.
	 *
	 * @param  {number} angle - Measured in degrees.
	 * @return {array}
	 */
	function rotateZ(angle) {
		var theta = Math.PI / 180 * angle;
		var matrix = identity();

		matrix[0] = matrix[5] = Math.cos(theta);
		matrix[1] = matrix[4] = Math.sin(theta);
		matrix[4] *= -1;

		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing 2D scaling. The first argument
	 * is used for both X and Y-axis scaling, unless an optional
	 * second argument is provided to explicitly define Y-axis scaling.
	 *
	 * @param  {number} scalar    - Decimal multiplier.
	 * @param  {number} [scalarY] - Decimal multiplier.
	 * @return {array}
	 */
	function scale(scalar, scalarY) {
		var matrix = identity();

		matrix[0] = scalar;
		matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;

		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing X-axis translation.
	 *
	 * @param  {number} distance - Measured in pixels.
	 * @return {array}
	 */
	function translateX(distance) {
		var matrix = identity();
		matrix[12] = distance;
		return matrix
	}

	/**
	 * Returns a 4x4 matrix describing Y-axis translation.
	 *
	 * @param  {number} distance - Measured in pixels.
	 * @return {array}
	 */
	function translateY(distance) {
		var matrix = identity();
		matrix[13] = distance;
		return matrix
	}

	var getPrefixedCssProp = (function () {
		var properties = {};
		var style = document.documentElement.style;

		function getPrefixedCssProperty(name, source) {
			if ( source === void 0 ) source = style;

			if (name && typeof name === 'string') {
				if (properties[name]) {
					return properties[name]
				}
				if (typeof source[name] === 'string') {
					return (properties[name] = name)
				}
				if (typeof source[("-webkit-" + name)] === 'string') {
					return (properties[name] = "-webkit-" + name)
				}
				throw new RangeError(("Unable to find \"" + name + "\" style property."))
			}
			throw new TypeError('Expected a string.')
		}

		getPrefixedCssProperty.clearCache = function () { return (properties = {}); };

		return getPrefixedCssProperty
	})();

	function style(element) {
		var computed = window.getComputedStyle(element.node);
		var position = computed.position;
		var config = element.config;

		/**
		 * Generate inline styles
		 */
		var inline = {};
		var inlineStyle = element.node.getAttribute('style') || '';
		var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];

		inline.computed = inlineMatch ? inlineMatch.map(function (m) { return m.trim(); }).join('; ') + ';' : '';

		inline.generated = inlineMatch.some(function (m) { return m.match(/visibility\s?:\s?visible/i); })
			? inline.computed
			: inlineMatch.concat( ['visibility: visible']).map(function (m) { return m.trim(); }).join('; ') + ';';

		/**
		 * Generate opacity styles
		 */
		var computedOpacity = parseFloat(computed.opacity);
		var configOpacity = !isNaN(parseFloat(config.opacity))
			? parseFloat(config.opacity)
			: parseFloat(computed.opacity);

		var opacity = {
			computed: computedOpacity !== configOpacity ? ("opacity: " + computedOpacity + ";") : '',
			generated: computedOpacity !== configOpacity ? ("opacity: " + configOpacity + ";") : ''
		};

		/**
		 * Generate transformation styles
		 */
		var transformations = [];

		if (parseFloat(config.distance)) {
			var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';

			/**
			 * Let’s make sure our our pixel distances are negative for top and left.
			 * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
			 */
			var distance = config.distance;
			if (config.origin === 'top' || config.origin === 'left') {
				distance = /^-/.test(distance) ? distance.substr(1) : ("-" + distance);
			}

			var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
			var value = ref[0];
			var unit = ref[1];

			switch (unit) {
				case 'em':
					distance = parseInt(computed.fontSize) * value;
					break
				case 'px':
					distance = value;
					break
				case '%':
					/**
					 * Here we use `getBoundingClientRect` instead of
					 * the existing data attached to `element.geometry`
					 * because only the former includes any transformations
					 * current applied to the element.
					 *
					 * If that behavior ends up being unintuitive, this
					 * logic could instead utilize `element.geometry.height`
					 * and `element.geoemetry.width` for the distance calculation
					 */
					distance =
						axis === 'Y'
							? (element.node.getBoundingClientRect().height * value) / 100
							: (element.node.getBoundingClientRect().width * value) / 100;
					break
				default:
					throw new RangeError('Unrecognized or missing distance unit.')
			}

			if (axis === 'Y') {
				transformations.push(translateY(distance));
			} else {
				transformations.push(translateX(distance));
			}
		}

		if (config.rotate.x) { transformations.push(rotateX(config.rotate.x)); }
		if (config.rotate.y) { transformations.push(rotateY(config.rotate.y)); }
		if (config.rotate.z) { transformations.push(rotateZ(config.rotate.z)); }
		if (config.scale !== 1) {
			if (config.scale === 0) {
				/**
				 * The CSS Transforms matrix interpolation specification
				 * basically disallows transitions of non-invertible
				 * matrixes, which means browsers won't transition
				 * elements with zero scale.
				 *
				 * That’s inconvenient for the API and developer
				 * experience, so we simply nudge their value
				 * slightly above zero; this allows browsers
				 * to transition our element as expected.
				 *
				 * `0.0002` was the smallest number
				 * that performed across browsers.
				 */
				transformations.push(scale(0.0002));
			} else {
				transformations.push(scale(config.scale));
			}
		}

		var transform = {};
		if (transformations.length) {
			transform.property = getPrefixedCssProp('transform');
			/**
			 * The default computed transform value should be one of:
			 * undefined || 'none' || 'matrix()' || 'matrix3d()'
			 */
			transform.computed = {
				raw: computed[transform.property],
				matrix: parse(computed[transform.property])
			};

			transformations.unshift(transform.computed.matrix);
			var product = transformations.reduce(multiply);

			transform.generated = {
				initial: ((transform.property) + ": matrix3d(" + (product.join(', ')) + ");"),
				final: ((transform.property) + ": matrix3d(" + (transform.computed.matrix.join(', ')) + ");")
			};
		} else {
			transform.generated = {
				initial: '',
				final: ''
			};
		}

		/**
		 * Generate transition styles
		 */
		var transition = {};
		if (opacity.generated || transform.generated.initial) {
			transition.property = getPrefixedCssProp('transition');
			transition.computed = computed[transition.property];
			transition.fragments = [];

			var delay = config.delay;
			var duration = config.duration;
			var easing = config.easing;

			if (opacity.generated) {
				transition.fragments.push({
					delayed: ("opacity " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
					instant: ("opacity " + (duration / 1000) + "s " + easing + " 0s")
				});
			}

			if (transform.generated.initial) {
				transition.fragments.push({
					delayed: ((transform.property) + " " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
					instant: ((transform.property) + " " + (duration / 1000) + "s " + easing + " 0s")
				});
			}

			/**
			 * The default computed transition property should be undefined, or one of:
			 * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
			 */
			var hasCustomTransition =
				transition.computed && !transition.computed.match(/all 0s|none 0s/);

			if (hasCustomTransition) {
				transition.fragments.unshift({
					delayed: transition.computed,
					instant: transition.computed
				});
			}

			var composed = transition.fragments.reduce(
				function (composition, fragment, i) {
					composition.delayed += i === 0 ? fragment.delayed : (", " + (fragment.delayed));
					composition.instant += i === 0 ? fragment.instant : (", " + (fragment.instant));
					return composition
				},
				{
					delayed: '',
					instant: ''
				}
			);

			transition.generated = {
				delayed: ((transition.property) + ": " + (composed.delayed) + ";"),
				instant: ((transition.property) + ": " + (composed.instant) + ";")
			};
		} else {
			transition.generated = {
				delayed: '',
				instant: ''
			};
		}

		return {
			inline: inline,
			opacity: opacity,
			position: position,
			transform: transform,
			transition: transition
		}
	}

	function animate(element, force) {
		if ( force === void 0 ) force = {};

		var pristine = force.pristine || this.pristine;
		var delayed =
			element.config.useDelay === 'always' ||
			(element.config.useDelay === 'onload' && pristine) ||
			(element.config.useDelay === 'once' && !element.seen);

		var shouldReveal = element.visible && !element.revealed;
		var shouldReset = !element.visible && element.revealed && element.config.reset;

		if (force.reveal || shouldReveal) {
			return triggerReveal.call(this, element, delayed)
		}

		if (force.reset || shouldReset) {
			return triggerReset.call(this, element)
		}
	}

	function triggerReveal(element, delayed) {
		var styles = [
			element.styles.inline.generated,
			element.styles.opacity.computed,
			element.styles.transform.generated.final
		];
		if (delayed) {
			styles.push(element.styles.transition.generated.delayed);
		} else {
			styles.push(element.styles.transition.generated.instant);
		}
		element.revealed = element.seen = true;
		element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
		registerCallbacks.call(this, element, delayed);
	}

	function triggerReset(element) {
		var styles = [
			element.styles.inline.generated,
			element.styles.opacity.generated,
			element.styles.transform.generated.initial,
			element.styles.transition.generated.instant
		];
		element.revealed = false;
		element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
		registerCallbacks.call(this, element);
	}

	function registerCallbacks(element, isDelayed) {
		var this$1 = this;

		var duration = isDelayed
			? element.config.duration + element.config.delay
			: element.config.duration;

		var beforeCallback = element.revealed
			? element.config.beforeReveal
			: element.config.beforeReset;

		var afterCallback = element.revealed
			? element.config.afterReveal
			: element.config.afterReset;

		var elapsed = 0;
		if (element.callbackTimer) {
			elapsed = Date.now() - element.callbackTimer.start;
			window.clearTimeout(element.callbackTimer.clock);
		}

		beforeCallback(element.node);

		element.callbackTimer = {
			start: Date.now(),
			clock: window.setTimeout(function () {
				afterCallback(element.node);
				element.callbackTimer = null;
				if (element.revealed && !element.config.reset && element.config.cleanup) {
					clean.call(this$1, element.node);
				}
			}, duration - elapsed)
		};
	}

	var nextUniqueId = (function () {
		var uid = 0;
		return function () { return uid++; }
	})();

	function sequence(element, pristine) {
		if ( pristine === void 0 ) pristine = this.pristine;

		/**
		 * We first check if the element should reset.
		 */
		if (!element.visible && element.revealed && element.config.reset) {
			return animate.call(this, element, { reset: true })
		}

		var seq = this.store.sequences[element.sequence.id];
		var i = element.sequence.index;

		if (seq) {
			var visible = new SequenceModel(seq, 'visible', this.store);
			var revealed = new SequenceModel(seq, 'revealed', this.store);

			seq.models = { visible: visible, revealed: revealed };

			/**
			 * If the sequence has no revealed members,
			 * then we reveal the first visible element
			 * within that sequence.
			 *
			 * The sequence then cues a recursive call
			 * in both directions.
			 */
			if (!revealed.body.length) {
				var nextId = seq.members[visible.body[0]];
				var nextElement = this.store.elements[nextId];

				if (nextElement) {
					cue.call(this, seq, visible.body[0], -1, pristine);
					cue.call(this, seq, visible.body[0], +1, pristine);
					return animate.call(this, nextElement, { reveal: true, pristine: pristine })
				}
			}

			/**
			 * If our element isn’t resetting, we check the
			 * element sequence index against the head, and
			 * then the foot of the sequence.
			 */
			if (
				!seq.blocked.head &&
				i === [].concat( revealed.head ).pop() &&
				i >= [].concat( visible.body ).shift()
			) {
				cue.call(this, seq, i, -1, pristine);
				return animate.call(this, element, { reveal: true, pristine: pristine })
			}

			if (
				!seq.blocked.foot &&
				i === [].concat( revealed.foot ).shift() &&
				i <= [].concat( visible.body ).pop()
			) {
				cue.call(this, seq, i, +1, pristine);
				return animate.call(this, element, { reveal: true, pristine: pristine })
			}
		}
	}

	function Sequence(interval) {
		var i = Math.abs(interval);
		if (!isNaN(i)) {
			this.id = nextUniqueId();
			this.interval = Math.max(i, 16);
			this.members = [];
			this.models = {};
			this.blocked = {
				head: false,
				foot: false
			};
		} else {
			throw new RangeError('Invalid sequence interval.')
		}
	}

	function SequenceModel(seq, prop, store) {
		var this$1 = this;

		this.head = [];
		this.body = [];
		this.foot = [];

		each(seq.members, function (id, index) {
			var element = store.elements[id];
			if (element && element[prop]) {
				this$1.body.push(index);
			}
		});

		if (this.body.length) {
			each(seq.members, function (id, index) {
				var element = store.elements[id];
				if (element && !element[prop]) {
					if (index < this$1.body[0]) {
						this$1.head.push(index);
					} else {
						this$1.foot.push(index);
					}
				}
			});
		}
	}

	function cue(seq, i, direction, pristine) {
		var this$1 = this;

		var blocked = ['head', null, 'foot'][1 + direction];
		var nextId = seq.members[i + direction];
		var nextElement = this.store.elements[nextId];

		seq.blocked[blocked] = true;

		setTimeout(function () {
			seq.blocked[blocked] = false;
			if (nextElement) {
				sequence.call(this$1, nextElement, pristine);
			}
		}, seq.interval);
	}

	function initialize() {
		var this$1 = this;

		rinse.call(this);

		each(this.store.elements, function (element) {
			var styles = [element.styles.inline.generated];

			if (element.visible) {
				styles.push(element.styles.opacity.computed);
				styles.push(element.styles.transform.generated.final);
				element.revealed = true;
			} else {
				styles.push(element.styles.opacity.generated);
				styles.push(element.styles.transform.generated.initial);
				element.revealed = false;
			}

			element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
		});

		each(this.store.containers, function (container) {
			var target =
				container.node === document.documentElement ? window : container.node;
			target.addEventListener('scroll', this$1.delegate);
			target.addEventListener('resize', this$1.delegate);
		});

		/**
		 * Manually invoke delegate once to capture
		 * element and container dimensions, container
		 * scroll position, and trigger any valid reveals
		 */
		this.delegate();

		/**
		 * Wipe any existing `setTimeout` now
		 * that initialization has completed.
		 */
		this.initTimeout = null;
	}

	function isMobile(agent) {
		if ( agent === void 0 ) agent = navigator.userAgent;

		return /Android|iPhone|iPad|iPod/i.test(agent)
	}

	function deepAssign(target) {
		var sources = [], len = arguments.length - 1;
		while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

		if (isObject(target)) {
			each(sources, function (source) {
				each(source, function (data, key) {
					if (isObject(data)) {
						if (!target[key] || !isObject(target[key])) {
							target[key] = {};
						}
						deepAssign(target[key], data);
					} else {
						target[key] = data;
					}
				});
			});
			return target
		} else {
			throw new TypeError('Target must be an object literal.')
		}
	}

	function reveal(target, options, syncing) {
		var this$1 = this;
		if ( options === void 0 ) options = {};
		if ( syncing === void 0 ) syncing = false;

		var containerBuffer = [];
		var sequence$$1;
		var interval = options.interval || defaults.interval;

		try {
			if (interval) {
				sequence$$1 = new Sequence(interval);
			}

			var nodes = tealight(target);
			if (!nodes.length) {
				throw new Error('Invalid reveal target.')
			}

			var elements = nodes.reduce(function (elementBuffer, elementNode) {
				var element = {};
				var existingId = elementNode.getAttribute('data-sr-id');

				if (existingId) {
					deepAssign(element, this$1.store.elements[existingId]);

					/**
					 * In order to prevent previously generated styles
					 * from throwing off the new styles, the style tag
					 * has to be reverted to its pre-reveal state.
					 */
					element.node.setAttribute('style', element.styles.inline.computed);
				} else {
					element.id = nextUniqueId();
					element.node = elementNode;
					element.seen = false;
					element.revealed = false;
					element.visible = false;
				}

				var config = deepAssign({}, element.config || this$1.defaults, options);

				if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
					if (existingId) {
						clean.call(this$1, element);
					}
					return elementBuffer // skip elements that are disabled
				}

				var containerNode = tealight(config.container)[0];
				if (!containerNode) {
					throw new Error('Invalid container.')
				}
				if (!containerNode.contains(elementNode)) {
					return elementBuffer // skip elements found outside the container
				}

				var containerId;
				{
					containerId = getContainerId(
						containerNode,
						containerBuffer,
						this$1.store.containers
					);
					if (containerId === null) {
						containerId = nextUniqueId();
						containerBuffer.push({ id: containerId, node: containerNode });
					}
				}

				element.config = config;
				element.containerId = containerId;
				element.styles = style(element);

				if (sequence$$1) {
					element.sequence = {
						id: sequence$$1.id,
						index: sequence$$1.members.length
					};
					sequence$$1.members.push(element.id);
				}

				elementBuffer.push(element);
				return elementBuffer
			}, []);

			/**
			 * Modifying the DOM via setAttribute needs to be handled
			 * separately from reading computed styles in the map above
			 * for the browser to batch DOM changes (limiting reflows)
			 */
			each(elements, function (element) {
				this$1.store.elements[element.id] = element;
				element.node.setAttribute('data-sr-id', element.id);
			});
		} catch (e) {
			return logger.call(this, 'Reveal failed.', e.message)
		}

		/**
		 * Now that element set-up is complete...
		 * Let’s commit any container and sequence data we have to the store.
		 */
		each(containerBuffer, function (container) {
			this$1.store.containers[container.id] = {
				id: container.id,
				node: container.node
			};
		});
		if (sequence$$1) {
			this.store.sequences[sequence$$1.id] = sequence$$1;
		}

		/**
		 * If reveal wasn't invoked by sync, we want to
		 * make sure to add this call to the history.
		 */
		if (syncing !== true) {
			this.store.history.push({ target: target, options: options });

			/**
			 * Push initialization to the event queue, giving
			 * multiple reveal calls time to be interpreted.
			 */
			if (this.initTimeout) {
				window.clearTimeout(this.initTimeout);
			}
			this.initTimeout = window.setTimeout(initialize.bind(this), 0);
		}
	}

	function getContainerId(node) {
		var collections = [], len = arguments.length - 1;
		while ( len-- > 0 ) collections[ len ] = arguments[ len + 1 ];

		var id = null;
		each(collections, function (collection) {
			each(collection, function (container) {
				if (id === null && container.node === node) {
					id = container.id;
				}
			});
		});
		return id
	}

	/**
	 * Re-runs the reveal method for each record stored in history,
	 * for capturing new content asynchronously loaded into the DOM.
	 */
	function sync() {
		var this$1 = this;

		each(this.store.history, function (record) {
			reveal.call(this$1, record.target, record.options, true);
		});

		initialize.call(this);
	}

	var polyfill = function (x) { return (x > 0) - (x < 0) || +x; };
	var mathSign = Math.sign || polyfill;

	/*! @license miniraf v1.0.1

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/
	var polyfill$1 = (function () {
		var clock = Date.now();

		return function (callback) {
			var currentTime = Date.now();
			if (currentTime - clock > 16) {
				clock = currentTime;
				callback(currentTime);
			} else {
				setTimeout(function () { return polyfill$1(callback); }, 0);
			}
		}
	})();

	var miniraf = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		polyfill$1;

	function getGeometry(target, isContainer) {
		/**
		 * We want to ignore padding and scrollbars for container elements.
		 * More information here: https://goo.gl/vOZpbz
		 */
		var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
		var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;

		var offsetTop = 0;
		var offsetLeft = 0;
		var node = target.node;

		do {
			if (!isNaN(node.offsetTop)) {
				offsetTop += node.offsetTop;
			}
			if (!isNaN(node.offsetLeft)) {
				offsetLeft += node.offsetLeft;
			}
			node = node.offsetParent;
		} while (node)

		return {
			bounds: {
				top: offsetTop,
				right: offsetLeft + width,
				bottom: offsetTop + height,
				left: offsetLeft
			},
			height: height,
			width: width
		}
	}

	function getScrolled(container) {
		var top, left;
		if (container.node === document.documentElement) {
			top = window.pageYOffset;
			left = window.pageXOffset;
		} else {
			top = container.node.scrollTop;
			left = container.node.scrollLeft;
		}
		return { top: top, left: left }
	}

	function isElementVisible(element) {
		if ( element === void 0 ) element = {};

		var container = this.store.containers[element.containerId];
		if (!container) { return }

		var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
		var viewOffset = element.config.viewOffset;

		var elementBounds = {
			top: element.geometry.bounds.top + element.geometry.height * viewFactor,
			right: element.geometry.bounds.right - element.geometry.width * viewFactor,
			bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
			left: element.geometry.bounds.left + element.geometry.width * viewFactor
		};

		var containerBounds = {
			top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
			right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
			bottom:
				container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
			left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
		};

		return (
			(elementBounds.top < containerBounds.bottom &&
				elementBounds.right > containerBounds.left &&
				elementBounds.bottom > containerBounds.top &&
				elementBounds.left < containerBounds.right) ||
			element.styles.position === 'fixed'
		)
	}

	function delegate(
		event,
		elements
	) {
		var this$1 = this;
		if ( event === void 0 ) event = { type: 'init' };
		if ( elements === void 0 ) elements = this.store.elements;

		miniraf(function () {
			var stale = event.type === 'init' || event.type === 'resize';

			each(this$1.store.containers, function (container) {
				if (stale) {
					container.geometry = getGeometry.call(this$1, container, true);
				}
				var scroll = getScrolled.call(this$1, container);
				if (container.scroll) {
					container.direction = {
						x: mathSign(scroll.left - container.scroll.left),
						y: mathSign(scroll.top - container.scroll.top)
					};
				}
				container.scroll = scroll;
			});

			/**
			 * Due to how the sequencer is implemented, it’s
			 * important that we update the state of all
			 * elements, before any animation logic is
			 * evaluated (in the second loop below).
			 */
			each(elements, function (element) {
				if (stale || element.geometry === undefined) {
					element.geometry = getGeometry.call(this$1, element);
				}
				element.visible = isElementVisible.call(this$1, element);
			});

			each(elements, function (element) {
				if (element.sequence) {
					sequence.call(this$1, element);
				} else {
					animate.call(this$1, element);
				}
			});

			this$1.pristine = false;
		});
	}

	function isTransformSupported() {
		var style = document.documentElement.style;
		return 'transform' in style || 'WebkitTransform' in style
	}

	function isTransitionSupported() {
		var style = document.documentElement.style;
		return 'transition' in style || 'WebkitTransition' in style
	}

	var version = "4.0.7";

	var boundDelegate;
	var boundDestroy;
	var boundReveal;
	var boundClean;
	var boundSync;
	var config;
	var debug;
	var instance;

	function ScrollReveal(options) {
		if ( options === void 0 ) options = {};

		var invokedWithoutNew =
			typeof this === 'undefined' ||
			Object.getPrototypeOf(this) !== ScrollReveal.prototype;

		if (invokedWithoutNew) {
			return new ScrollReveal(options)
		}

		if (!ScrollReveal.isSupported()) {
			logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
			return mount.failure()
		}

		var buffer;
		try {
			buffer = config
				? deepAssign({}, config, options)
				: deepAssign({}, defaults, options);
		} catch (e) {
			logger.call(this, 'Invalid configuration.', e.message);
			return mount.failure()
		}

		try {
			var container = tealight(buffer.container)[0];
			if (!container) {
				throw new Error('Invalid container.')
			}
		} catch (e) {
			logger.call(this, e.message);
			return mount.failure()
		}

		config = buffer;

		if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
			logger.call(
				this,
				'This device is disabled.',
				("desktop: " + (config.desktop)),
				("mobile: " + (config.mobile))
			);
			return mount.failure()
		}

		mount.success();

		this.store = {
			containers: {},
			elements: {},
			history: [],
			sequences: {}
		};

		this.pristine = true;

		boundDelegate = boundDelegate || delegate.bind(this);
		boundDestroy = boundDestroy || destroy.bind(this);
		boundReveal = boundReveal || reveal.bind(this);
		boundClean = boundClean || clean.bind(this);
		boundSync = boundSync || sync.bind(this);

		Object.defineProperty(this, 'delegate', { get: function () { return boundDelegate; } });
		Object.defineProperty(this, 'destroy', { get: function () { return boundDestroy; } });
		Object.defineProperty(this, 'reveal', { get: function () { return boundReveal; } });
		Object.defineProperty(this, 'clean', { get: function () { return boundClean; } });
		Object.defineProperty(this, 'sync', { get: function () { return boundSync; } });

		Object.defineProperty(this, 'defaults', { get: function () { return config; } });
		Object.defineProperty(this, 'version', { get: function () { return version; } });
		Object.defineProperty(this, 'noop', { get: function () { return false; } });

		return instance ? instance : (instance = this)
	}

	ScrollReveal.isSupported = function () { return isTransformSupported() && isTransitionSupported(); };

	Object.defineProperty(ScrollReveal, 'debug', {
		get: function () { return debug || false; },
		set: function (value) { return (debug = typeof value === 'boolean' ? value : debug); }
	});

	ScrollReveal();

	return ScrollReveal;

}));

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

$(document).ready(() => {
    $(this).scrollTop(0);
    const nb_brand = $('.brand').length / 2;
    $('.brand').each((i, el) => {
        if (i >= nb_brand) {
            ScrollReveal().reveal(el, {delay: (i - nb_brand) * 200});
        } else {
            ScrollReveal().reveal(el, {delay: i * 200});
        }
    })

    ScrollReveal({opacity: 0, easing: 'cubic-bezier(0.5, 0, 0, 1)', viewFactor: 1.0, duration: 1200});
    $('.intro').each((i, el) => {
        ScrollReveal().reveal(el, {
            delay: i * 300
        });
    })


    ScrollReveal().reveal('.section__title', {
        delay: 200, distance: '100px',
    });

    $('.article--step').each((i, el) => ScrollReveal().reveal(el, {
        delay: i * 200,
        distance: '50px',
        viewFactor: 0.2
    }))
    ScrollReveal().reveal('.des-section .des-img', {delay: 500, distance: '100px'})
    ScrollReveal().reveal('.des-section .des-content', {delay: 200, distance: '100px'})
    $('input[name=price]').attr('placeholder', $('input[name=region]:checked').val());

    $('input[name=region]').change(e => {
        let name = $(e.target).val();
        $('input[name=price]').attr('placeholder', name);
    })
    $('.slide-feedback').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    });

    //scroll to show step
    $(window).trigger('scroll')
    $(window).scroll(function () {
        let containers = $(".steps-container");
        containers.each((i, container) => {
            let windowBottom = $(this).scrollTop() + $(this).height();
            let elementTop = $(container).offset().top;
            let percentage = Math.trunc((windowBottom - elementTop - 200) / $(container).height()* 100);
            if (percentage <= 100 && windowBottom >= elementTop) {
                $(container).find(".steps-process>span").css('height', percentage + "%")
                const steps = $(container).find('.step');
                const percentagePerStep = Math.trunc(100 / (steps.length - 1));
                for (let i = 0; i < steps.length; i++) {
                    if (percentage > i * percentagePerStep){
                        $(steps[i]).children('span').addClass('active');
                    }
                    else {
                        $(steps[i]).children('span').removeClass('active');
                    }
                }
            }
        });
    });

    let slickHeight = $('.slick-track').height() - 20;
    $('.slick-slide').children('div').height(slickHeight);
});