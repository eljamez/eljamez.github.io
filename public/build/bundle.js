
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                info.blocks[i] = null;
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const github_api_url = `https://api.github.com/users/eljamez/repos`;

    const github = async () => {
      let response = await fetch(github_api_url);
      let data = await response.json();
      return data.reduce((acc, curr) => {
        if (!curr.private) {
          acc = [
            ...acc,
            {
              name: curr.name,
              description: curr.description,
              url: curr.homepage || curr.html_url,
              image: curr.owner.avatar_url,
            },
          ];
          return acc;
        }
      }, []);
    };

    const RSS_URL = `https://codepen.io/collection/XEovPJ/feed/`;

    let codepen = [];

    fetch(RSS_URL)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        items.forEach((el) => {
          const description = el
            .querySelector("description")
            .innerHTML.split("<p>")[3]
            .split("</p>")[0]
            .trim();
          const pen = {
            name: el.querySelector("title").innerHTML,
            url: el.querySelector("link").innerHTML,
            image: `${el.querySelector("link").innerHTML}/image/thumb.png`,
            description: description.length
              ? description
              : "A Cool JameScript™ CodePen",
          };
          codepen.push(pen);
        });
      });

    const npmjs_api_url = `https://api.npms.io/v2/search?q=author:eljamez`;

    const npm = async () => {
      let response = await fetch(npmjs_api_url);
      let data = await response.json();
      return data.results.reduce((acc, curr) => {
        acc = [
          ...acc,
          {
            name: curr.package.name,
            description: curr.package.description,
            url: curr.package.links.npm,
          },
        ];
        return acc;
      }, []);
    };

    const title = "JameScript.com";

    const sections = [
      {
        id: 0,
        name: "Home",
        iconClass: "fas fa-home",
        color: "green",
        description: `Welcome to JameScript.com, the internet code home of <a href="https://eljamez.com">James Augustus Hall</a>. I\'m a Software Engineer and these are my personal projects and experiments. I hope you find something useful, fun, and/or interesing.`,
        technical: `The site you are now viewing is hosted via <a href="https://pages.github.com/">GitHub Pages</a> and build using <a href="https://emotion.sh/">Emotion</a> and <a href="https://svelte.dev/">Svelte</a>, with help from <a href="https://fontawesome.com/">Font Awesome</a> and <a href="https://fonts.google.com/">Google Fonts</a>`,
      },
      {
        id: 1,
        name: "CodePen",
        iconClass: "fab fa-codepen",
        color: "purple",
        link: "https://codepen.io/eljamez",
        projects: codepen,
      },
      {
        id: 2,
        name: "Repos",
        iconClass: "fab fa-github",
        color: "blue",
        link: "https://github.com/eljamez/",
        projects: github,
      },
      {
        id: 3,
        name: "NPM",
        iconClass: "fab fa-npm",
        color: "red",
        link: "https://www.npmjs.com/~eljamez",
        projects: npm,
      },
    ];

    const copy = {
      header: "JameScript.com",
      subheader: "JavaScript / CSS and more by James Augustus Hall",
    };

    const links = [
      {
        name: "eljamez",
        url: "https://eljamez.com",
        iconClass: "fas fa-laptop-house",
      },
      {
        name: "twitter",
        url: "https://twitter.com/eljamez",
        iconClass: "fab fa-twitter",
      },
      {
        name: "ensly mogul",
        url: "http://enslymogul.com",
        iconClass: "fas fa-music",
      },
      {
        name: "soundcloud",
        url: "https://soundcloud.com/eljamez",
        iconClass: "fab fa-soundcloud",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com/in/eljamez/",
        iconClass: "fab fa-linkedin-in",
      },
      {
        name: "spotify",
        url:
          "https://open.spotify.com/playlist/4yQ0U5YrMbK2IKqFYT0O0n?si=O3f7zQ1gR5-99SbRLrwNXQ",
        iconClass: "fab fa-spotify",
      },
    ];

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const mobile = {
      width: "620px",
      height: {
        header: "36px",
      },
    };

    const tablet = {
      width: "870px",
      sidebar: "140px",
      height: {
        header: "58px",
      },
    };

    const height = {
      header: "80px",
      footer: "100px",
    };

    const width = {
      sidebar: "200px",
    };

    // spacing
    const spacing = {
      xSmall: "6px",
      small: "10px",
      mid: "20px",
      large: "30px",
      xLarge: "40px",
    };

    // rgb
    const rgb = {
      yellow: "240, 219, 79",
      gray: "50, 51, 48",
      blue: "3, 102, 214",
      red: "196, 11, 10",
      green: "71, 139, 66",
      purple: "174, 99, 228",
    };

    // colors
    const colors = {
      yellow: `rgb(${rgb.yellow})`,
      gray: `rgb(${rgb.gray})`,
      blue: `rgb(${rgb.blue})`,
      red: `rgb(${rgb.red})`,
      green: `rgb(${rgb.green})`,
      purple: `rgb(${rgb.purple})`,
    };

    const mixins = {
      textShadow: `text-shadow: 0 1px 1px ${colors.gray}`,
      headerFont: `font-family: 'Staatliches', cursive`,
      transition: "transition: all .2s ease",
    };

    const currentSection = writable("Home");
    const isMobile = writable(
      window.innerWidth < mobile.width.split("px")[0]
    );

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var emotion_umd_min = createCommonjsModule(function (module, exports) {
    !function(e,r){r(exports);}(commonjsGlobal,function(e){var r=function(){function e(e){this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.before=null;}var r=e.prototype;return r.insert=function(e){if(this.ctr%(this.isSpeedy?65e3:1)==0){var r,t=function(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),void 0!==e.nonce&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r}(this);r=0===this.tags.length?this.before:this.tags[this.tags.length-1].nextSibling,this.container.insertBefore(t,r),this.tags.push(t);}var a=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}(a);try{var i=105===e.charCodeAt(1)&&64===e.charCodeAt(0);n.insertRule(e,i?0:n.cssRules.length);}catch(e){}}else a.appendChild(document.createTextNode(e));this.ctr++;},r.flush=function(){this.tags.forEach(function(e){return e.parentNode.removeChild(e)}),this.tags=[],this.ctr=0;},e}();function t(e){function r(e,r,a){var n=r.trim().split(b);r=n;var i=n.length,s=e.length;switch(s){case 0:case 1:var c=0;for(e=0===s?"":e[0]+" ";c<i;++c)r[c]=t(e,r[c],a).trim();break;default:var o=c=0;for(r=[];c<i;++c)for(var l=0;l<s;++l)r[o++]=t(e[l]+" ",n[c],a).trim();}return r}function t(e,r,t){var a=r.charCodeAt(0);switch(33>a&&(a=(r=r.trim()).charCodeAt(0)),a){case 38:return r.replace(g,"$1"+e.trim());case 58:return e.trim()+r.replace(g,"$1"+e.trim());default:if(0<1*t&&0<r.indexOf("\f"))return r.replace(g,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+r}function a(e,r,t,i){var s=e+";",c=2*r+3*t+4*i;if(944===c){e=s.indexOf(":",9)+1;var o=s.substring(e,s.length-1).trim();return o=s.substring(0,e).trim()+o+";",1===z||2===z&&n(o,1)?"-webkit-"+o+o:o}if(0===z||2===z&&!n(s,1))return s;switch(c){case 1015:return 97===s.charCodeAt(10)?"-webkit-"+s+s:s;case 951:return 116===s.charCodeAt(3)?"-webkit-"+s+s:s;case 963:return 110===s.charCodeAt(5)?"-webkit-"+s+s:s;case 1009:if(100!==s.charCodeAt(4))break;case 969:case 942:return "-webkit-"+s+s;case 978:return "-webkit-"+s+"-moz-"+s+s;case 1019:case 983:return "-webkit-"+s+"-moz-"+s+"-ms-"+s+s;case 883:if(45===s.charCodeAt(8))return "-webkit-"+s+s;if(0<s.indexOf("image-set(",11))return s.replace(S,"$1-webkit-$2")+s;break;case 932:if(45===s.charCodeAt(4))switch(s.charCodeAt(5)){case 103:return "-webkit-box-"+s.replace("-grow","")+"-webkit-"+s+"-ms-"+s.replace("grow","positive")+s;case 115:return "-webkit-"+s+"-ms-"+s.replace("shrink","negative")+s;case 98:return "-webkit-"+s+"-ms-"+s.replace("basis","preferred-size")+s}return "-webkit-"+s+"-ms-"+s+s;case 964:return "-webkit-"+s+"-ms-flex-"+s+s;case 1023:if(99!==s.charCodeAt(8))break;return "-webkit-box-pack"+(o=s.substring(s.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+s+"-ms-flex-pack"+o+s;case 1005:return d.test(s)?s.replace(u,":-webkit-")+s.replace(u,":-moz-")+s:s;case 1e3:switch(r=(o=s.substring(13).trim()).indexOf("-")+1,o.charCodeAt(0)+o.charCodeAt(r)){case 226:o=s.replace(v,"tb");break;case 232:o=s.replace(v,"tb-rl");break;case 220:o=s.replace(v,"lr");break;default:return s}return "-webkit-"+s+"-ms-"+o+s;case 1017:if(-1===s.indexOf("sticky",9))break;case 975:switch(r=(s=e).length-10,c=(o=(33===s.charCodeAt(r)?s.substring(0,r):s).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|o.charCodeAt(7))){case 203:if(111>o.charCodeAt(8))break;case 115:s=s.replace(o,"-webkit-"+o)+";"+s;break;case 207:case 102:s=s.replace(o,"-webkit-"+(102<c?"inline-":"")+"box")+";"+s.replace(o,"-webkit-"+o)+";"+s.replace(o,"-ms-"+o+"box")+";"+s;}return s+";";case 938:if(45===s.charCodeAt(5))switch(s.charCodeAt(6)){case 105:return o=s.replace("-items",""),"-webkit-"+s+"-webkit-box-"+o+"-ms-flex-"+o+s;case 115:return "-webkit-"+s+"-ms-flex-item-"+s.replace(A,"")+s;default:return "-webkit-"+s+"-ms-flex-line-pack"+s.replace("align-content","").replace(A,"")+s}break;case 973:case 989:if(45!==s.charCodeAt(3)||122===s.charCodeAt(4))break;case 931:case 953:if(!0===x.test(e))return 115===(o=e.substring(e.indexOf(":")+1)).charCodeAt(0)?a(e.replace("stretch","fill-available"),r,t,i).replace(":fill-available",":stretch"):s.replace(o,"-webkit-"+o)+s.replace(o,"-moz-"+o.replace("fill-",""))+s;break;case 962:if(s="-webkit-"+s+(102===s.charCodeAt(5)?"-ms-"+s:"")+s,211===t+i&&105===s.charCodeAt(13)&&0<s.indexOf("transform",10))return s.substring(0,s.indexOf(";",27)+1).replace(h,"$1-webkit-$2")+s}return s}function n(e,r){var t=e.indexOf(1===r?":":"{"),a=e.substring(0,3!==r?t:10);return t=e.substring(t+1,e.length-1),G(2!==r?a:a.replace(C,"$1"),t,r)}function i(e,r){var t=a(r,r.charCodeAt(0),r.charCodeAt(1),r.charCodeAt(2));return t!==r+";"?t.replace(y," or ($1)").substring(4):"("+r+")"}function s(e,r,t,a,n,i,s,c,l,f){for(var u,d=0,h=r;d<_;++d)switch(u=R[d].call(o,e,h,t,a,n,i,s,c,l,f)){case void 0:case!1:case!0:case null:break;default:h=u;}if(h!==r)return h}function c(e){return void 0!==(e=e.prefix)&&(G=null,e?"function"!=typeof e?z=1:(z=2,G=e):z=0),c}function o(e,t){var c=e;if(33>c.charCodeAt(0)&&(c=c.trim()),c=[c],0<_){var o=s(-1,t,c,c,$,O,0,0,0,0);void 0!==o&&"string"==typeof o&&(t=o);}var u=function e(t,c,o,u,d){for(var h,b,g,v,y,A=0,C=0,x=0,S=0,R=0,G=0,I=g=h=0,M=0,W=0,P=0,D=0,F=o.length,L=F-1,T="",q="",B="",H="";M<F;){if(b=o.charCodeAt(M),M===L&&0!==C+S+x+A&&(0!==C&&(b=47===C?10:47),S=x=A=0,F++,L++),0===C+S+x+A){if(M===L&&(0<W&&(T=T.replace(f,"")),0<T.trim().length)){switch(b){case 32:case 9:case 59:case 13:case 10:break;default:T+=o.charAt(M);}b=59;}switch(b){case 123:for(h=(T=T.trim()).charCodeAt(0),g=1,D=++M;M<F;){switch(b=o.charCodeAt(M)){case 123:g++;break;case 125:g--;break;case 47:switch(b=o.charCodeAt(M+1)){case 42:case 47:e:{for(I=M+1;I<L;++I)switch(o.charCodeAt(I)){case 47:if(42===b&&42===o.charCodeAt(I-1)&&M+2!==I){M=I+1;break e}break;case 10:if(47===b){M=I+1;break e}}M=I;}}break;case 91:b++;case 40:b++;case 34:case 39:for(;M++<L&&o.charCodeAt(M)!==b;);}if(0===g)break;M++;}switch(g=o.substring(D,M),0===h&&(h=(T=T.replace(l,"").trim()).charCodeAt(0)),h){case 64:switch(0<W&&(T=T.replace(f,"")),b=T.charCodeAt(1)){case 100:case 109:case 115:case 45:W=c;break;default:W=E;}if(D=(g=e(c,W,g,b,d+1)).length,0<_&&(y=s(3,g,W=r(E,T,P),c,$,O,D,b,d,u),T=W.join(""),void 0!==y&&0===(D=(g=y.trim()).length)&&(b=0,g="")),0<D)switch(b){case 115:T=T.replace(w,i);case 100:case 109:case 45:g=T+"{"+g+"}";break;case 107:g=(T=T.replace(p,"$1 $2"))+"{"+g+"}",g=1===z||2===z&&n("@"+g,3)?"@-webkit-"+g+"@"+g:"@"+g;break;default:g=T+g,112===u&&(q+=g,g="");}else g="";break;default:g=e(c,r(c,T,P),g,u,d+1);}B+=g,g=P=W=I=h=0,T="",b=o.charCodeAt(++M);break;case 125:case 59:if(1<(D=(T=(0<W?T.replace(f,""):T).trim()).length))switch(0===I&&(h=T.charCodeAt(0),45===h||96<h&&123>h)&&(D=(T=T.replace(" ",":")).length),0<_&&void 0!==(y=s(1,T,c,t,$,O,q.length,u,d,u))&&0===(D=(T=y.trim()).length)&&(T="\0\0"),h=T.charCodeAt(0),b=T.charCodeAt(1),h){case 0:break;case 64:if(105===b||99===b){H+=T+o.charAt(M);break}default:58!==T.charCodeAt(D-1)&&(q+=a(T,h,b,T.charCodeAt(2)));}P=W=I=h=0,T="",b=o.charCodeAt(++M);}}switch(b){case 13:case 10:47===C?C=0:0===1+h&&107!==u&&0<T.length&&(W=1,T+="\0"),0<_*N&&s(0,T,c,t,$,O,q.length,u,d,u),O=1,$++;break;case 59:case 125:if(0===C+S+x+A){O++;break}default:switch(O++,v=o.charAt(M),b){case 9:case 32:if(0===S+A+C)switch(R){case 44:case 58:case 9:case 32:v="";break;default:32!==b&&(v=" ");}break;case 0:v="\\0";break;case 12:v="\\f";break;case 11:v="\\v";break;case 38:0===S+C+A&&(W=P=1,v="\f"+v);break;case 108:if(0===S+C+A+j&&0<I)switch(M-I){case 2:112===R&&58===o.charCodeAt(M-3)&&(j=R);case 8:111===G&&(j=G);}break;case 58:0===S+C+A&&(I=M);break;case 44:0===C+x+S+A&&(W=1,v+="\r");break;case 34:case 39:0===C&&(S=S===b?0:0===S?b:S);break;case 91:0===S+C+x&&A++;break;case 93:0===S+C+x&&A--;break;case 41:0===S+C+A&&x--;break;case 40:if(0===S+C+A){if(0===h)switch(2*R+3*G){case 533:break;default:h=1;}x++;}break;case 64:0===C+x+S+A+I+g&&(g=1);break;case 42:case 47:if(!(0<S+A+x))switch(C){case 0:switch(2*b+3*o.charCodeAt(M+1)){case 235:C=47;break;case 220:D=M,C=42;}break;case 42:47===b&&42===R&&D+2!==M&&(33===o.charCodeAt(D+2)&&(q+=o.substring(D,M+1)),v="",C=0);}}0===C&&(T+=v);}G=R,R=b,M++;}if(0<(D=q.length)){if(W=c,0<_&&void 0!==(y=s(2,q,W,t,$,O,D,u,d,u))&&0===(q=y).length)return H+q+B;if(q=W.join(",")+"{"+q+"}",0!=z*j){switch(2!==z||n(q,2)||(j=0),j){case 111:q=q.replace(k,":-moz-$1")+q;break;case 112:q=q.replace(m,"::-webkit-input-$1")+q.replace(m,"::-moz-$1")+q.replace(m,":-ms-input-$1")+q;}j=0;}}return H+q+B}(E,c,t,0,0);return 0<_&&(void 0!==(o=s(-2,u,c,c,$,O,u.length,0,0,0))&&(u=o)),j=0,O=$=1,u}var l=/^\0+/g,f=/[\0\r\f]/g,u=/: */g,d=/zoo|gra/,h=/([,: ])(transform)/g,b=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,p=/@(k\w+)\s*(\S*)\s*/,m=/::(place)/g,k=/:(read-only)/g,v=/[svh]\w+-[tblr]{2}/,w=/\(\s*(.*)\s*\)/g,y=/([\s\S]*?);/g,A=/-self|flex-/g,C=/[^]*?(:[rp][el]a[\w-]+)[^]*/,x=/stretch|:\s*\w+\-(?:conte|avail)/,S=/([^-])(image-set\()/,O=1,$=1,j=0,z=1,E=[],R=[],_=0,G=null,N=0;return o.use=function e(r){switch(r){case void 0:case null:_=R.length=0;break;default:if("function"==typeof r)R[_++]=r;else if("object"==typeof r)for(var t=0,a=r.length;t<a;++t)e(r[t]);else N=0|!!r;}return e},o.set=c,void 0!==e&&c(e),o}function a(e){e&&n.current.insert(e+"}");}var n={current:null},i=function(e,r,t,i,s,c,o,l,f,u){switch(e){case 1:switch(r.charCodeAt(0)){case 64:return n.current.insert(r+";"),"";case 108:if(98===r.charCodeAt(2))return ""}break;case 2:if(0===l)return r+"/*|*/";break;case 3:switch(l){case 102:case 112:return n.current.insert(t[0]+r),"";default:return r+(0===u?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(a);}};var s={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var c=/[A-Z]|^ms/g,o=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},f=function(e){return null!=e&&"boolean"!=typeof e},u=function(e){var r={};return function(t){return void 0===r[t]&&(r[t]=e(t)),r[t]}}(function(e){return l(e)?e:e.replace(c,"-$&").toLowerCase()}),d=function(e,r){switch(e){case"animation":case"animationName":if("string"==typeof r)return r.replace(o,function(e,r,t){return b={name:r,styles:t,next:b},r})}return 1===s[e]||l(e)||"number"!=typeof r||0===r?r:r+"px"};function h(e,r,t,a){if(null==t)return "";if(void 0!==t.__emotion_styles)return t;switch(typeof t){case"boolean":return "";case"object":if(1===t.anim)return b={name:t.name,styles:t.styles,next:b},t.name;if(void 0!==t.styles){var n=t.next;if(void 0!==n)for(;void 0!==n;)b={name:n.name,styles:n.styles,next:b},n=n.next;return t.styles+";"}return function(e,r,t){var a="";if(Array.isArray(t))for(var n=0;n<t.length;n++)a+=h(e,r,t[n],!1);else for(var i in t){var s=t[i];if("object"!=typeof s)null!=r&&void 0!==r[s]?a+=i+"{"+r[s]+"}":f(s)&&(a+=u(i)+":"+d(i,s)+";");else if(!Array.isArray(s)||"string"!=typeof s[0]||null!=r&&void 0!==r[s[0]]){var c=h(e,r,s,!1);switch(i){case"animation":case"animationName":a+=u(i)+":"+c+";";break;default:a+=i+"{"+c+"}";}}else for(var o=0;o<s.length;o++)f(s[o])&&(a+=u(i)+":"+d(i,s[o])+";");}return a}(e,r,t);case"function":if(void 0!==e){var i=b,s=t(e);return b=i,h(e,r,s,a)}}if(null==r)return t;var c=r[t];return void 0===c||a?t:c}var b,g=/label:\s*([^\s;\n{]+)\s*;/g,p=function(e,r,t){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var a=!0,n="";b=void 0;var i=e[0];null==i||void 0===i.raw?(a=!1,n+=h(t,r,i,!1)):n+=i[0];for(var s=1;s<e.length;s++)n+=h(t,r,e[s],46===n.charCodeAt(n.length-1)),a&&(n+=i[s]);g.lastIndex=0;for(var c,o="";null!==(c=g.exec(n));)o+="-"+c[1];return {name:function(e){for(var r,t=e.length,a=t^t,n=0;t>=4;)r=1540483477*(65535&(r=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+((1540483477*(r>>>16)&65535)<<16),a=1540483477*(65535&a)+((1540483477*(a>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),t-=4,++n;switch(t){case 3:a^=(255&e.charCodeAt(n+2))<<16;case 2:a^=(255&e.charCodeAt(n+1))<<8;case 1:a=1540483477*(65535&(a^=255&e.charCodeAt(n)))+((1540483477*(a>>>16)&65535)<<16);}return a=1540483477*(65535&(a^=a>>>13))+((1540483477*(a>>>16)&65535)<<16),((a^=a>>>15)>>>0).toString(36)}(n)+o,styles:n,next:b}};function m(e,r,t){var a="";return t.split(" ").forEach(function(t){void 0!==e[t]?r.push(e[t]):a+=t+" ";}),a}function k(e,r){if(void 0===e.inserted[r.name])return e.insert("",r,e.sheet,!0)}function v(e,r,t){var a=[],n=m(e,a,t);return a.length<2?t:n+r(a)}var w=function e(r){for(var t="",a=0;a<r.length;a++){var n=r[a];if(null!=n){var i=void 0;switch(typeof n){case"boolean":break;case"object":if(Array.isArray(n))i=e(n);else for(var s in i="",n)n[s]&&s&&(i&&(i+=" "),i+=s);break;default:i=n;}i&&(t&&(t+=" "),t+=i);}}return t},y=function(e){var a=function(e){void 0===e&&(e={});var a,s=e.key||"css";void 0!==e.prefix&&(a={prefix:e.prefix});var c,o=new t(a),l={};c=e.container||document.head;var f,u=document.querySelectorAll("style[data-emotion-"+s+"]");Array.prototype.forEach.call(u,function(e){e.getAttribute("data-emotion-"+s).split(" ").forEach(function(e){l[e]=!0;}),e.parentNode!==c&&c.appendChild(e);}),o.use(e.stylisPlugins)(i),f=function(e,r,t,a){var i=r.name;n.current=t,o(e,r.styles),a&&(d.inserted[i]=!0);};var d={key:s,sheet:new r({key:s,container:c,nonce:e.nonce,speedy:e.speedy}),nonce:e.nonce,inserted:l,registered:{},insert:f};return d}(e);a.sheet.speedy=function(e){this.isSpeedy=e;},a.compat=!0;var s=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=p(r,a.registered,void 0);return function(e,r,t){var a=e.key+"-"+r.name;if(!1===t&&void 0===e.registered[a]&&(e.registered[a]=r.styles),void 0===e.inserted[r.name]){var n=r;do{e.insert("."+a,n,e.sheet,!0),n=n.next;}while(void 0!==n)}}(a,n,!1),a.key+"-"+n.name};return {css:s,cx:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return v(a.registered,s,w(r))},injectGlobal:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=p(r,a.registered);k(a,n);},keyframes:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=p(r,a.registered),i="animation-"+n.name;return k(a,{name:n.name,styles:"@keyframes "+i+"{"+n.styles+"}"}),i},hydrate:function(e){e.forEach(function(e){a.inserted[e]=!0;});},flush:function(){a.registered={},a.inserted={},a.sheet.flush();},sheet:a.sheet,cache:a,getRegisteredStyles:m.bind(null,a.registered),merge:v.bind(null,a.registered,s)}}(),A=y.flush,C=y.hydrate,x=y.cx,S=y.merge,O=y.getRegisteredStyles,$=y.injectGlobal,j=y.keyframes,z=y.css,E=y.sheet,R=y.cache;e.cache=R,e.css=z,e.cx=x,e.flush=A,e.getRegisteredStyles=O,e.hydrate=C,e.injectGlobal=$,e.keyframes=j,e.merge=S,e.sheet=E,Object.defineProperty(e,"__esModule",{value:!0});});
    //# sourceMappingURL=emotion.umd.min.js.map
    });

    var emotion = unwrapExports(emotion_umd_min);

    const { css } = emotion;

    const styles = {
      container: css`
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;

    @media (min-width: ${mobile.width}) {
      display: grid;
      grid-template-columns: ${tablet.sidebar} auto;
      grid-template-rows: 100vh;
      justify-items: stretch;
    }

    @media (min-width: ${tablet.width}) {
      grid-template-columns: ${width.sidebar} auto;
    }
  `,
    };

    /* src/components/Container.svelte generated by Svelte v3.20.1 */
    const file = "src/components/Container.svelte";

    // (9:8)      
    function fallback_block(ctx) {
    	let em;

    	const block = {
    		c: function create() {
    			em = element("em");
    			em.textContent = "Missing Content";
    			add_location(em, file, 9, 4, 153);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(9:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(div, "class", /*container*/ ctx[0]);
    			add_location(div, file, 7, 0, 116);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	const { container } = styles;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Container> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Container", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ styles, container });
    	return [container, $$scope, $$slots];
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Container",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const { css: css$1 } = emotion;

    const styles$1 = {
      sidebar: css$1`
    ${mixins.transition};
    box-sizing: border-box;
    background-image: url("../../public/bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;
    padding-top: ${mobile.height.header};

    @media (min-width: ${mobile.width}) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      padding-top: ${tablet.height.header};
    }

    @media (min-width: ${tablet.width}) {
      padding-top: ${height.header};
    }
  `,
    };

    /* src/components/Sidebar.svelte generated by Svelte v3.20.1 */
    const file$1 = "src/components/Sidebar.svelte";

    // (9:8)      
    function fallback_block$1(ctx) {
    	let em;

    	const block = {
    		c: function create() {
    			em = element("em");
    			em.textContent = "missing content";
    			add_location(em, file$1, 9, 4, 158);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(9:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let aside;
    	let aside_class_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(aside, "class", aside_class_value = styles$1.sidebar);
    			add_location(aside, file$1, 7, 0, 114);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(aside, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const { container } = styles$1;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Sidebar", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ styles: styles$1, container });
    	return [container, $$scope, $$slots];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const { css: css$2 } = emotion;

    const styles$2 = {
      title: css$2`
    box-sizing: border-box;
    position: absolute;
    padding: ${spacing.small} ${spacing.large};
    z-index: 11;
    width: 100vw;

    h1 {
      ${mixins.headerFont};
      ${mixins.textShadow};
      ${mixins.transition};
      text-transform: uppercase;
      font-size: 2rem;
      margin: 0;
      text-align: center;
      color: ${colors.yellow};
    }

    @media (min-width: ${mobile.width}) {
      h1 {
        text-align: left;
        font-size: 3rem;
      }
    }
    @media (min-width: ${tablet.width}) {
      h1 {
        font-size: 4rem;
      }
    }
  `,
    };

    /* src/components/Title.svelte generated by Svelte v3.20.1 */
    const file$2 = "src/components/Title.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let h1;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = `${title}`;
    			add_location(h1, file$2, 6, 2, 135);
    			attr_dev(div, "class", div_class_value = styles$2.title);
    			add_location(div, file$2, 5, 0, 106);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Title> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Title", $$slots, []);
    	$$self.$capture_state = () => ({ styles: styles$2, title });
    	return [];
    }

    class Title extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Title",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const { css: css$3 } = emotion;

    const styles$3 = {
      button: css$3`
    border: 0px;
    cursor: pointer;
    text-align: center;
    color: ${colors.yellow};
    width: 25%;
    padding: ${spacing.small} ${spacing.large};
    background: transparent;
    margin: 0;
    transition: all 0.2s ease;

    span {
      display: none;
    }

    i {
      font-size: 1.5rem;
      transform-origin: center;
      transition: all 0.4s ease;
    }

    @media (min-width: ${mobile.width}) {
      width: 100%;
      i {
        font-size: 2.5rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      text-align: right;
      span {
        display: inline-block;
        font-size: 1.3rem;
        transform-origin: right;
        transform: scaleX(0);
        transition: all 0.4s ease;
        overflow: hidden;
        padding-right: ${spacing.xsmall};
        line-height: 2.1rem;
      }
    }
  `,

      unselected: css$3`
    &:hover {
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${mobile.width}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }

      @media (min-width: ${tablet.width}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `,

      selected: css$3`
     {
      ${mixins.textShadow};
      color: white;
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${mobile.width}) {
        transform: translateX(${spacing.xLarge});
        width: 80%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
      @media (min-width: ${tablet.width}) {
        transform: translateX(${spacing.large});
        width: 100%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `,
    };

    /* src/components/Button.svelte generated by Svelte v3.20.1 */
    const file$3 = "src/components/Button.svelte";

    function create_fragment$3(ctx) {
    	let button;
    	let span;
    	let t0_value = /*section*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let i;
    	let i_class_value;
    	let button_class_value;
    	let button_data_name_value;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			i = element("i");
    			add_location(span, file$3, 31, 2, 747);
    			attr_dev(i, "class", i_class_value = "fab " + /*section*/ ctx[0].iconClass);
    			add_location(i, file$3, 32, 2, 777);

    			attr_dev(button, "class", button_class_value = /*css*/ ctx[3]`
    ${styles$3.button};
    ${/*isSelected*/ ctx[2]
			? styles$3.selected
			: styles$3.unselected};
    background-color: ${/*isSelected*/ ctx[2] && colors[/*section*/ ctx[0].color]};
    color: ${colors[/*section*/ ctx[0].color]};`);

    			attr_dev(button, "data-name", button_data_name_value = /*section*/ ctx[0].name);
    			add_location(button, file$3, 23, 0, 484);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			append_dev(span, t0);
    			append_dev(button, t1);
    			append_dev(button, i);
    			if (remount) dispose();

    			dispose = listen_dev(
    				button,
    				"click",
    				function () {
    					if (is_function(/*handleButtonClick*/ ctx[1])) /*handleButtonClick*/ ctx[1].apply(this, arguments);
    				},
    				false,
    				false,
    				false
    			);
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*section*/ 1 && t0_value !== (t0_value = /*section*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*section*/ 1 && i_class_value !== (i_class_value = "fab " + /*section*/ ctx[0].iconClass)) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*isSelected, section*/ 5 && button_class_value !== (button_class_value = /*css*/ ctx[3]`
    ${styles$3.button};
    ${/*isSelected*/ ctx[2]
			? styles$3.selected
			: styles$3.unselected};
    background-color: ${/*isSelected*/ ctx[2] && colors[/*section*/ ctx[0].color]};
    color: ${colors[/*section*/ ctx[0].color]};`)) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (dirty & /*section*/ 1 && button_data_name_value !== (button_data_name_value = /*section*/ ctx[0].name)) {
    				attr_dev(button, "data-name", button_data_name_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $currentSection;
    	validate_store(currentSection, "currentSection");
    	component_subscribe($$self, currentSection, $$value => $$invalidate(4, $currentSection = $$value));
    	let { section } = $$props;
    	let { handleButtonClick } = $$props;
    	const { css } = emotion;

    	// import styles
    	const { container } = styles$3;

    	let isSelected;

    	afterUpdate(() => {
    		$$invalidate(2, isSelected = section.name === $currentSection);
    	});

    	const writable_props = ["section", "handleButtonClick"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, []);

    	$$self.$set = $$props => {
    		if ("section" in $$props) $$invalidate(0, section = $$props.section);
    		if ("handleButtonClick" in $$props) $$invalidate(1, handleButtonClick = $$props.handleButtonClick);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		currentSection,
    		emotion,
    		colors,
    		styles: styles$3,
    		section,
    		handleButtonClick,
    		css,
    		container,
    		isSelected,
    		$currentSection
    	});

    	$$self.$inject_state = $$props => {
    		if ("section" in $$props) $$invalidate(0, section = $$props.section);
    		if ("handleButtonClick" in $$props) $$invalidate(1, handleButtonClick = $$props.handleButtonClick);
    		if ("isSelected" in $$props) $$invalidate(2, isSelected = $$props.isSelected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [section, handleButtonClick, isSelected, css];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { section: 0, handleButtonClick: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*section*/ ctx[0] === undefined && !("section" in props)) {
    			console.warn("<Button> was created without expected prop 'section'");
    		}

    		if (/*handleButtonClick*/ ctx[1] === undefined && !("handleButtonClick" in props)) {
    			console.warn("<Button> was created without expected prop 'handleButtonClick'");
    		}
    	}

    	get section() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set section(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get handleButtonClick() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set handleButtonClick(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const { css: css$4 } = emotion;

    const styles$4 = {
      nav: css$4`
    padding-top: ${spacing.mid};
  `,
    };

    /* src/components/Nav.svelte generated by Svelte v3.20.1 */
    const file$4 = "src/components/Nav.svelte";

    // (9:8)      
    function fallback_block$2(ctx) {
    	let em;

    	const block = {
    		c: function create() {
    			em = element("em");
    			em.textContent = "missing content";
    			add_location(em, file$4, 9, 4, 148);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(9:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let nav;
    	let nav_class_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
    	const default_slot_or_fallback = default_slot || fallback_block$2(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(nav, "class", nav_class_value = styles$4.nav);
    			add_location(nav, file$4, 7, 0, 110);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(nav, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const { container } = styles$4;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Nav", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ styles: styles$4, container });
    	return [container, $$scope, $$slots];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const { css: css$5 } = emotion;

    const styles$5 = {
      links: css$5`
    ${mixins.textShadow};
    padding: ${spacing.small} 0 ${spacing.small};
    text-align: center;

    h2 {
      ${mixins.headerFont};
      font-size: 1.8rem;
      margin: 0;
    }

    ul {
      list-style: none;
      padding: ${spacing.xSmall} 0 0;

      li {
        font-size: 0.9rem;
        a {
          ${mixins.transition};
          display: block;
          padding: ${spacing.xSmall} 0 0;
          line-height: 1.4rem;
        }
        a:hover {
          color: white;
          transform: translateX(-${spacing.xSmall});
        }
        i {
          margin-left: 0.6rem;
        }
      }
    }
    p {
      line-height: 1.2rem;
    }

    @media (min-width: ${mobile.width}) {
      padding: ${spacing.mid};
      text-align: right;
      ul {
        li {
          font-size: 0.8rem;
          i {
            margin-left: 0.2rem;
            font-size: 0.6rem;
          }
        }
      }
    }

    @media (min-width: ${tablet.width}) {
      padding: ${spacing.large};
    }
  `,
    };

    /* src/components/Links.svelte generated by Svelte v3.20.1 */
    const file$5 = "src/components/Links.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (14:4) {#each links as link}
    function create_each_block(ctx) {
    	let li;
    	let a;
    	let t0_value = /*link*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let i;
    	let i_class_value;
    	let a_href_value;
    	let t2;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			i = element("i");
    			t2 = space();
    			attr_dev(i, "class", i_class_value = /*link*/ ctx[1].iconClass);
    			add_location(i, file$5, 17, 10, 334);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[1].url);
    			add_location(a, file$5, 15, 8, 282);
    			add_location(li, file$5, 14, 6, 269);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, i);
    			append_dev(li, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(14:4) {#each links as link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let ul;
    	let div_class_value;
    	let each_value = links;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = `${title$1}`;
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$5, 11, 2, 213);
    			add_location(ul, file$5, 12, 2, 232);
    			attr_dev(div, "class", div_class_value = styles$5.links);
    			add_location(div, file$5, 10, 0, 184);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*links*/ 0) {
    				each_value = links;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const title$1 = "Links";

    function instance$5($$self, $$props, $$invalidate) {
    	const { container } = styles$5;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Links> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Links", $$slots, []);
    	$$self.$capture_state = () => ({ styles: styles$5, links, container, title: title$1 });
    	return [];
    }

    class Links extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Links",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const { css: css$6 } = emotion;

    const styles$6 = {
      about: css$6`
    padding: ${spacing.large};
    ${mixins.textShadow};
    h2 {
      font-size: 1.8rem;
      text-align: right;
      ${mixins.headerFont};
    }
    p {
      line-height: 1.2rem;
    }
  `,
    };

    /* src/components/About.svelte generated by Svelte v3.20.1 */
    const file$6 = "src/components/About.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = `${title$2}`;
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = `${copy$1}`;
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = `${copy2}`;
    			add_location(h2, file$6, 14, 2, 543);
    			add_location(p0, file$6, 15, 2, 562);
    			add_location(p1, file$6, 16, 2, 578);
    			attr_dev(div, "class", div_class_value = styles$6.about);
    			add_location(div, file$6, 13, 0, 514);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(div, t3);
    			append_dev(div, p1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const title$2 = "About";
    const copy$1 = "Welcome to JameScript.com, the internet code home of James Augustus Hall. I'm a Software Engineer and have had the pleasure of working on a diverse array of projects throughout the years. These are my personal projects. I hope you find something useful, fun, and or interesing. ";
    const copy2 = "I write JavaScript primarily, along with CSS and HTML.";

    function instance$6($$self, $$props, $$invalidate) {
    	const { container } = styles$6;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("About", $$slots, []);
    	$$self.$capture_state = () => ({ styles: styles$6, container, title: title$2, copy: copy$1, copy2 });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function quintOut(t) {
        return --t * t * t * t * t + 1;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => `overflow: hidden;` +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    const { css: css$7 } = emotion;

    const styles$7 = {
      content: css$7`
    ${mixins.transition};
    box-sizing: border-box;
    padding-top: ${spacing.small};

    @media (min-width: ${mobile.width}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      justify-self: stretch;
      padding-top: ${tablet.height.header};
      overflow-y: scroll;
      position: relative;
    }

    @media (min-width: ${tablet.width}) {
      padding-top: ${height.header};
    }
  `,
    };

    const { css: css$8 } = emotion;

    const styles$8 = {
      project: css$8`
    display: grid;
    grid-template-columns: 50px 1fr;
    box-sizing: border-box;
    border-radius: 5px;
    margin: ${spacing.large} 0;
    width: 100%;
    overflow: hidden;
    background-position: center;
    background-size: cover;

    h3 {
      margin: 0 0 ${spacing.xSmall};
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: bold;
      i {
        margin-right: ${spacing.xSmall};
      }
    }

    p {
      a {
        font-size: 0.8rem;
        font-weight: bold;
      }

      i {
        display: none;
      }
    }

    p:first-of-type {
      margin-top: 0px;
    }

    p:last-of-type {
      margin-bottom: 0px;
    }

    @media (min-width: ${mobile.width}) {
      background-image: none !important;
      background-color: rgba(0, 0, 0, 0.5);
      grid-template-columns: 100px 1fr;
      gap: ${spacing.mid};
      padding: ${spacing.mid};
      margin: 0 0 ${spacing.large};

      h3 {
        margin-top: 0;
        font-size: 1.6rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      p {
        i {
          display: inline-block;
          margin-right: ${spacing.xSmall};
        }
      }
    }
  `,

      imageHolder: css$8`
    display: none;
    border-radius: 5px;
    background-size: cover;
    background-position: 50%;
    height: 50px;
    width: 0px;
    grid-column: 1 / span 0;

    @media (min-width: ${mobile.width}) {
      display: block;
      height: 100px;
      width: 100px;
      grid-column: 1 / span 1;
    }
  `,

      contentHolder: css$8`
    grid-column: 1 / -1;
    background-color: rgba(0, 0, 0, 0.5);
    padding: ${spacing.small};

    @media (min-width: ${mobile.width}) {
      grid-column: 2 / -1;
      background-color: transparent;
      padding: 0;
    }
  `,
    };

    /* src/components/Project.svelte generated by Svelte v3.20.1 */
    const file$7 = "src/components/Project.svelte";

    // (14:4) {#if project.name}
    function create_if_block_2(ctx) {
    	let h3;
    	let t_value = /*project*/ ctx[0].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t = text(t_value);
    			add_location(h3, file$7, 14, 6, 412);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && t_value !== (t_value = /*project*/ ctx[0].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(14:4) {#if project.name}",
    		ctx
    	});

    	return block;
    }

    // (17:4) {#if project.url}
    function create_if_block_1(ctx) {
    	let p;
    	let a;
    	let t_value = /*project*/ ctx[0].url + "";
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = /*project*/ ctx[0].url);
    			add_location(a, file$7, 18, 8, 486);
    			add_location(p, file$7, 17, 6, 474);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, a);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && t_value !== (t_value = /*project*/ ctx[0].url + "")) set_data_dev(t, t_value);

    			if (dirty & /*project*/ 1 && a_href_value !== (a_href_value = /*project*/ ctx[0].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(17:4) {#if project.url}",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#if project.description}
    function create_if_block(ctx) {
    	let p;
    	let t_value = /*project*/ ctx[0].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$7, 22, 6, 583);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && t_value !== (t_value = /*project*/ ctx[0].description + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(22:4) {#if project.description}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div2;
    	let div0;
    	let div0_class_value;
    	let div0_style_value;
    	let t0;
    	let div1;
    	let t1;
    	let t2;
    	let div1_class_value;
    	let div2_class_value;
    	let div2_style_value;
    	let if_block0 = /*project*/ ctx[0].name && create_if_block_2(ctx);
    	let if_block1 = /*project*/ ctx[0].url && create_if_block_1(ctx);
    	let if_block2 = /*project*/ ctx[0].description && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div0, "class", div0_class_value = styles$8.imageHolder);
    			attr_dev(div0, "style", div0_style_value = `background-image: url(${/*avatar*/ ctx[1]})`);
    			add_location(div0, file$7, 11, 2, 268);
    			attr_dev(div1, "class", div1_class_value = styles$8.contentHolder);
    			add_location(div1, file$7, 12, 2, 348);
    			attr_dev(div2, "class", div2_class_value = styles$8.project);
    			attr_dev(div2, "style", div2_style_value = `background-image: url(${/*avatar*/ ctx[1]})`);
    			add_location(div2, file$7, 10, 0, 194);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t1);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t2);
    			if (if_block2) if_block2.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*project*/ ctx[0].name) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(div1, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*project*/ ctx[0].url) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					if_block1.m(div1, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*project*/ ctx[0].description) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const defaultImage = "avatar.png";

    function instance$7($$self, $$props, $$invalidate) {
    	let { project } = $$props;
    	const avatar = project.image ? project.image : "public/avatar.png";
    	const writable_props = ["project"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Project", $$slots, []);

    	$$self.$set = $$props => {
    		if ("project" in $$props) $$invalidate(0, project = $$props.project);
    	};

    	$$self.$capture_state = () => ({ project, styles: styles$8, defaultImage, avatar });

    	$$self.$inject_state = $$props => {
    		if ("project" in $$props) $$invalidate(0, project = $$props.project);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [project, avatar];
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { project: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Project",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*project*/ ctx[0] === undefined && !("project" in props)) {
    			console.warn("<Project> was created without expected prop 'project'");
    		}
    	}

    	get project() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set project(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const { css: css$9 } = emotion;

    const styles$9 = {
      section: css$9`
    box-sizing: border-box;
    padding: ${spacing.mid};

    h2 {
      ${mixins.headerFont};
      ${mixins.textShadow};
      margin: 0;
      font-size: 1.6rem;
      text-align: center;
      padding-bottom: 0;
      text-transform: uppercase;
    }

    @media (min-width: ${mobile.width}) {
      padding: ${spacing.mid} ${spacing.large};
      position: absolute;
      justify-self: stretch;
      min-width: 100%;

      h2 {
        text-align: left;
        font-size: 1.8rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      h2 {
        display: none;
      }
    }
  `,

      description: css$9`
    text-indent: ${spacing.mid};
    margin: ${spacing.mid} 0;
    line-height: 1.6rem;

    &::first-letter {
      font-size: 2rem;
    }

    @media (min-width: ${mobile.width}) {
      width: 80%;
    }
  `,

      link: css$9`
    ${mixins.textShadow};
    font-size: 1.2rem;
    text-align: center;
    margin: 0;

    @media (min-width: ${mobile.width}) {
      text-align: left;
      padding-bottom: ${spacing.mid};
    }

    @media (min-width: ${tablet.width}) {
      margin-bottom: ${spacing.mid};
      font-size: 2rem;
    }
  `,
    };

    /* src/components/Section.svelte generated by Svelte v3.20.1 */
    const file$8 = "src/components/Section.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (31:2) {#if section.name}
    function create_if_block_5(ctx) {
    	let h2;
    	let t_value = /*section*/ ctx[0].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t = text(t_value);
    			add_location(h2, file$8, 31, 4, 883);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && t_value !== (t_value = /*section*/ ctx[0].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(31:2) {#if section.name}",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if section.link}
    function create_if_block_4(ctx) {
    	let p;
    	let a;
    	let t_value = /*section*/ ctx[0].link + "";
    	let t;
    	let a_href_value;
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = /*section*/ ctx[0].link);
    			add_location(a, file$8, 35, 6, 970);
    			attr_dev(p, "class", p_class_value = styles$9.link);
    			add_location(p, file$8, 34, 4, 940);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, a);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && t_value !== (t_value = /*section*/ ctx[0].link + "")) set_data_dev(t, t_value);

    			if (dirty & /*section*/ 1 && a_href_value !== (a_href_value = /*section*/ ctx[0].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(34:2) {#if section.link}",
    		ctx
    	});

    	return block;
    }

    // (39:2) {#if section.description}
    function create_if_block_3(ctx) {
    	let p;
    	let raw_value = /*section*/ ctx[0].description + "";
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", p_class_value = styles$9.description);
    			add_location(p, file$8, 39, 4, 1061);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && raw_value !== (raw_value = /*section*/ ctx[0].description + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(39:2) {#if section.description}",
    		ctx
    	});

    	return block;
    }

    // (44:2) {#if section.technical}
    function create_if_block_2$1(ctx) {
    	let p;
    	let raw_value = /*section*/ ctx[0].technical + "";
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", p_class_value = styles$9.description);
    			add_location(p, file$8, 44, 4, 1173);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && raw_value !== (raw_value = /*section*/ ctx[0].technical + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(44:2) {#if section.technical}",
    		ctx
    	});

    	return block;
    }

    // (49:2) {#if section.skills}
    function create_if_block_1$1(ctx) {
    	let p;
    	let raw_value = /*section*/ ctx[0].skills + "";
    	let p_class_value;

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", p_class_value = styles$9.description);
    			add_location(p, file$8, 49, 4, 1280);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && raw_value !== (raw_value = /*section*/ ctx[0].skills + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(49:2) {#if section.skills}",
    		ctx
    	});

    	return block;
    }

    // (54:2) {#if section.projects}
    function create_if_block$1(ctx) {
    	let await_block_anchor;
    	let promise;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 5,
    		error: 6,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*getProjects*/ ctx[2](/*section*/ ctx[0]), info);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*section*/ 1 && promise !== (promise = /*getProjects*/ ctx[2](/*section*/ ctx[0])) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[5] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(54:2) {#if section.projects}",
    		ctx
    	});

    	return block;
    }

    // (62:4) {:catch error}
    function create_catch_block(ctx) {
    	let p;
    	let t0;
    	let t1_value = /*error*/ ctx[6].message + "";
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Something went wrong: ");
    			t1 = text(t1_value);
    			add_location(p, file$8, 63, 6, 1630);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*section*/ 1 && t1_value !== (t1_value = /*error*/ ctx[6].message + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(62:4) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (58:4) {:then value}
    function create_then_block(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*value*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getProjects, section*/ 5) {
    				each_value = /*value*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(58:4) {:then value}",
    		ctx
    	});

    	return block;
    }

    // (59:6) {#each value as project}
    function create_each_block$1(ctx) {
    	let current;

    	const project = new Project({
    			props: { project: /*project*/ ctx[7] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(project.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(project, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const project_changes = {};
    			if (dirty & /*section*/ 1) project_changes.project = /*project*/ ctx[7];
    			project.$set(project_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(project.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(project.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(project, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(59:6) {#each value as project}",
    		ctx
    	});

    	return block;
    }

    // (55:33)        <!-- promise is pending -->       <p>Getting Data</p>     {:then value}
    function create_pending_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Getting Data";
    			add_location(p, file$8, 56, 6, 1456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(55:33)        <!-- promise is pending -->       <p>Getting Data</p>     {:then value}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let div_class_value;
    	let div_intro;
    	let div_outro;
    	let current;
    	let if_block0 = /*section*/ ctx[0].name && create_if_block_5(ctx);
    	let if_block1 = /*section*/ ctx[0].link && create_if_block_4(ctx);
    	let if_block2 = /*section*/ ctx[0].description && create_if_block_3(ctx);
    	let if_block3 = /*section*/ ctx[0].technical && create_if_block_2$1(ctx);
    	let if_block4 = /*section*/ ctx[0].skills && create_if_block_1$1(ctx);
    	let if_block5 = /*section*/ ctx[0].projects && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (if_block4) if_block4.c();
    			t4 = space();
    			if (if_block5) if_block5.c();

    			attr_dev(div, "class", div_class_value = /*css*/ ctx[1]`
    ${styles$9.section};
    section_${/*section*/ ctx[0].name.toLowerCase()};`);

    			add_location(div, file$8, 24, 0, 614);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t1);
    			if (if_block2) if_block2.m(div, null);
    			append_dev(div, t2);
    			if (if_block3) if_block3.m(div, null);
    			append_dev(div, t3);
    			if (if_block4) if_block4.m(div, null);
    			append_dev(div, t4);
    			if (if_block5) if_block5.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*section*/ ctx[0].name) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*section*/ ctx[0].link) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*section*/ ctx[0].description) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_3(ctx);
    					if_block2.c();
    					if_block2.m(div, t2);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*section*/ ctx[0].technical) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block_2$1(ctx);
    					if_block3.c();
    					if_block3.m(div, t3);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (/*section*/ ctx[0].skills) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);
    				} else {
    					if_block4 = create_if_block_1$1(ctx);
    					if_block4.c();
    					if_block4.m(div, t4);
    				}
    			} else if (if_block4) {
    				if_block4.d(1);
    				if_block4 = null;
    			}

    			if (/*section*/ ctx[0].projects) {
    				if (if_block5) {
    					if_block5.p(ctx, dirty);
    					transition_in(if_block5, 1);
    				} else {
    					if_block5 = create_if_block$1(ctx);
    					if_block5.c();
    					transition_in(if_block5, 1);
    					if_block5.m(div, null);
    				}
    			} else if (if_block5) {
    				group_outros();

    				transition_out(if_block5, 1, 1, () => {
    					if_block5 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*section*/ 1 && div_class_value !== (div_class_value = /*css*/ ctx[1]`
    ${styles$9.section};
    section_${/*section*/ ctx[0].name.toLowerCase()};`)) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block5);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				if (!div_intro) div_intro = create_in_transition(div, fly, {
    					delay: 50,
    					duration: 200,
    					x: -20,
    					opacity: 0,
    					easing: quintOut
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block5);
    			if (div_intro) div_intro.invalidate();

    			div_outro = create_out_transition(div, fly, {
    				delay: 50,
    				duration: 200,
    				x: 20,
    				opacity: 0,
    				easing: quintOut
    			});

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			if (if_block5) if_block5.d();
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $isMobile;
    	validate_store(isMobile, "isMobile");
    	component_subscribe($$self, isMobile, $$value => $$invalidate(3, $isMobile = $$value));
    	let { section } = $$props;
    	const { css } = emotion;

    	const getProjects = async section => {
    		if (section.name !== "CodePen") {
    			const repos = await section.projects();
    			return repos;
    		}

    		return section.projects;
    	};

    	const xOrY = $isMobile ? "y" : "x";
    	const writable_props = ["section"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Section> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Section", $$slots, []);

    	$$self.$set = $$props => {
    		if ("section" in $$props) $$invalidate(0, section = $$props.section);
    	};

    	$$self.$capture_state = () => ({
    		section,
    		fly,
    		quintOut,
    		isMobile,
    		Project,
    		emotion,
    		colors,
    		rgb,
    		styles: styles$9,
    		css,
    		getProjects,
    		xOrY,
    		$isMobile
    	});

    	$$self.$inject_state = $$props => {
    		if ("section" in $$props) $$invalidate(0, section = $$props.section);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [section, css, getProjects];
    }

    class Section extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { section: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*section*/ ctx[0] === undefined && !("section" in props)) {
    			console.warn("<Section> was created without expected prop 'section'");
    		}
    	}

    	get section() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set section(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Content.svelte generated by Svelte v3.20.1 */
    const file$9 = "src/components/Content.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (31:4) {#if section.name === $currentSection}
    function create_if_block$2(ctx) {
    	let current;

    	const section = new Section({
    			props: { section: /*section*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(31:4) {#if section.name === $currentSection}",
    		ctx
    	});

    	return block;
    }

    // (30:2) {#each sections as section}
    function create_each_block$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*section*/ ctx[5].name === /*$currentSection*/ ctx[2] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*section*/ ctx[5].name === /*$currentSection*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(30:2) {#each sections as section}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let main;
    	let main_class_value;
    	let current;
    	let each_value = sections;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(main, "class", main_class_value = /*css*/ ctx[3]`
    ${styles$7.content};
    background: linear-gradient(${/*gradientDeg*/ ctx[1]}deg, rgba(${rgb[/*currSection*/ ctx[0].color]}, 1) 0%, rgba(${rgb[/*currSection*/ ctx[0].color]}, 0.5) 100%);`);

    			add_location(main, file$9, 25, 0, 702);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sections, $currentSection*/ 4) {
    				each_value = sections;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(main, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*gradientDeg, currSection*/ 3 && main_class_value !== (main_class_value = /*css*/ ctx[3]`
    ${styles$7.content};
    background: linear-gradient(${/*gradientDeg*/ ctx[1]}deg, rgba(${rgb[/*currSection*/ ctx[0].color]}, 1) 0%, rgba(${rgb[/*currSection*/ ctx[0].color]}, 0.5) 100%);`)) {
    				attr_dev(main, "class", main_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $isMobile;
    	let $currentSection;
    	validate_store(isMobile, "isMobile");
    	component_subscribe($$self, isMobile, $$value => $$invalidate(4, $isMobile = $$value));
    	validate_store(currentSection, "currentSection");
    	component_subscribe($$self, currentSection, $$value => $$invalidate(2, $currentSection = $$value));
    	const { css } = emotion;
    	let currSection = sections[0];
    	let gradientDeg = $isMobile ? 180 : 90;

    	afterUpdate(() => {
    		$$invalidate(0, currSection = sections.find(section => section.name === $currentSection));
    		$$invalidate(1, gradientDeg = $isMobile ? 180 : 90);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Content", $$slots, []);

    	$$self.$capture_state = () => ({
    		slide,
    		quintOut,
    		afterUpdate,
    		currentSection,
    		isMobile,
    		emotion,
    		colors,
    		rgb,
    		styles: styles$7,
    		Section,
    		sections,
    		css,
    		currSection,
    		gradientDeg,
    		$isMobile,
    		$currentSection
    	});

    	$$self.$inject_state = $$props => {
    		if ("currSection" in $$props) $$invalidate(0, currSection = $$props.currSection);
    		if ("gradientDeg" in $$props) $$invalidate(1, gradientDeg = $$props.gradientDeg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currSection, gradientDeg, $currentSection, css];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    const { css: css$a } = emotion;

    const styles$a = {
      footer: css$a`
    box-sizing: border-box;
    padding: ${spacing.mid};
    text-align: center;

    @media (min-width: ${mobile.width}) {
      text-align: right;
      padding-bottom: 0;

      p {
        font-size: 1.1rem;
      }
    }

    @media (min-width: ${tablet.width}) {
      p {
        font-size: 0.8rem;
      }
    }
  `,
    };

    /* src/components/Footer.svelte generated by Svelte v3.20.1 */
    const file$a = "src/components/Footer.svelte";

    // (9:8)      
    function fallback_block$3(ctx) {
    	let em;

    	const block = {
    		c: function create() {
    			em = element("em");
    			em.textContent = "Missing Content";
    			add_location(em, file$a, 9, 4, 157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(9:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let footer;
    	let t0;
    	let p;
    	let footer_class_value;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
    	const default_slot_or_fallback = default_slot || fallback_block$3(ctx);

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t0 = space();
    			p = element("p");
    			p.textContent = "James Augustus Hall ©";
    			add_location(p, file$a, 11, 2, 194);
    			attr_dev(footer, "class", footer_class_value = styles$a.footer);
    			add_location(footer, file$a, 7, 0, 113);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(footer, null);
    			}

    			append_dev(footer, t0);
    			append_dev(footer, p);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[1], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const { container } = styles$a;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Footer", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ styles: styles$a, container });
    	return [container, $$scope, $$slots];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.20.1 */
    const file$b = "src/App.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (37:6) {#each sections as section}
    function create_each_block$3(ctx) {
    	let current;

    	const button = new Button({
    			props: {
    				section: /*section*/ ctx[3],
    				handleButtonClick: /*handleButtonClick*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(37:6) {#each sections as section}",
    		ctx
    	});

    	return block;
    }

    // (36:4) <Nav>
    function create_default_slot_4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = sections;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sections, handleButtonClick*/ 2) {
    				each_value = sections;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(36:4) <Nav>",
    		ctx
    	});

    	return block;
    }

    // (41:4) {#if !$isMobile}
    function create_if_block_1$2(ctx) {
    	let t;
    	let current;
    	const links = new Links({ $$inline: true });

    	const footer = new Footer({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(links.$$.fragment);
    			t = space();
    			create_component(footer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(links, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(links.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(links.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(links, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(41:4) {#if !$isMobile}",
    		ctx
    	});

    	return block;
    }

    // (43:6) <Footer>
    function create_default_slot_3(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fas fa-coffee");
    			add_location(i, file$b, 43, 8, 1274);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(43:6) <Footer>",
    		ctx
    	});

    	return block;
    }

    // (35:2) <Sidebar>
    function create_default_slot_2(ctx) {
    	let t;
    	let if_block_anchor;
    	let current;

    	const nav = new Nav({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = !/*$isMobile*/ ctx[0] && create_if_block_1$2(ctx);

    	const block = {
    		c: function create() {
    			create_component(nav.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(nav, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const nav_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				nav_changes.$$scope = { dirty, ctx };
    			}

    			nav.$set(nav_changes);

    			if (!/*$isMobile*/ ctx[0]) {
    				if (!if_block) {
    					if_block = create_if_block_1$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					transition_in(if_block, 1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(35:2) <Sidebar>",
    		ctx
    	});

    	return block;
    }

    // (49:2) {#if $isMobile}
    function create_if_block$3(ctx) {
    	let current;

    	const footer = new Footer({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(footer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(49:2) {#if $isMobile}",
    		ctx
    	});

    	return block;
    }

    // (50:4) <Footer>
    function create_default_slot_1(ctx) {
    	let current;
    	const links = new Links({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(links.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(links, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(links.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(links.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(links, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(50:4) <Footer>",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Container>
    function create_default_slot(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let if_block_anchor;
    	let current;
    	const title = new Title({ $$inline: true });

    	const sidebar = new Sidebar({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const content = new Content({ $$inline: true });
    	let if_block = /*$isMobile*/ ctx[0] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			create_component(title.$$.fragment);
    			t0 = space();
    			create_component(sidebar.$$.fragment);
    			t1 = space();
    			create_component(content.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(title, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(sidebar, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(content, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sidebar_changes = {};

    			if (dirty & /*$$scope, $isMobile*/ 65) {
    				sidebar_changes.$$scope = { dirty, ctx };
    			}

    			sidebar.$set(sidebar_changes);

    			if (/*$isMobile*/ ctx[0]) {
    				if (!if_block) {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					transition_in(if_block, 1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title.$$.fragment, local);
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(content.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title.$$.fragment, local);
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(content.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(title, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(sidebar, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(content, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(33:0) <Container>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let current;

    	const container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const container_changes = {};

    			if (dirty & /*$$scope, $isMobile*/ 65) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $isMobile;
    	validate_store(isMobile, "isMobile");
    	component_subscribe($$self, isMobile, $$value => $$invalidate(0, $isMobile = $$value));

    	const handleButtonClick = e => {
    		currentSection.set(e.currentTarget.dataset.name);
    	};

    	const handleWindowResize = e => {
    		isMobile.set(window.innerWidth < mobile.width.split("px")[0]);
    	};

    	onMount(() => {
    		window.addEventListener("resize", handleWindowResize);
    	});

    	onDestroy(() => {
    		window.removeEventListener("resize", handleWindowResize);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		sections,
    		copy,
    		currentSection,
    		isMobile,
    		onMount,
    		onDestroy,
    		mobile,
    		Container,
    		Sidebar,
    		Title,
    		Button,
    		Nav,
    		Links,
    		About,
    		Content,
    		Footer,
    		handleButtonClick,
    		handleWindowResize,
    		$isMobile
    	});

    	return [$isMobile, handleButtonClick];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    var app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
