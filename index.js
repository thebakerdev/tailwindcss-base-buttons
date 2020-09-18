const _ = require('lodash');
const Color = require('color');
const buttons = require('./scripts/buttons');
const defaultOptions = require('./scripts/defaultOptions');

/* Sets a color config object from the options */
function setColorConfig(options) {
    
    const colorConfig = _.omit({
        ..._.isFunction(options.colors.default) ? options.colors.default() : options.colors.default,
        ..._.isFunction(options.colors.theme) ? options.colors.theme() : options.colors.theme
    });

    return colorConfig;
}

/* Combines all button styles */
function combineStyles(colorConfig, options, custom) {

    let customStyles = {};

    if (typeof custom === 'function') {

        customStyles = custom(colorConfig, options);
    } else if (typeof custom === 'object') {

        customStyles = custom;
    }

    return {
        ...buttons.createDefault(options),
        ...buttons.createRounded(options),
        ...buttons.createSolid(colorConfig, options),
        ...buttons.createOutlined(colorConfig, options),
        ...buttons.createGradient(colorConfig, options),
        ...customStyles
    }
}

module.exports = function(options, custom) {

    options = _.isFunction(options) ? defaultOptions() : _.defaultsDeep(options, defaultOptions());

    const colorConfig = setColorConfig(options);

    const buttonStyles = combineStyles(colorConfig, options, custom);

    const buttonSizes = buttons.createSizes(options);
    
    return function({ addComponents }) {

        addComponents([
            buttonStyles,
            buttonSizes
        ]);
    }
}