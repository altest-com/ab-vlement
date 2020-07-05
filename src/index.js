import './styles/index.scss'; // global css

const install = (Vue, options = {}) => {
    const components = require('./components');

    const register = options.components || Object.keys(components); 
    register.forEach(name => {
        if (components[name]) {
            const _name = options.prefix ? options.prefix + name : name;
            Vue.component(_name, components[name]);
        } else {
            console.warn(`Unknown component name "${name}".`);
        }
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install 
};
