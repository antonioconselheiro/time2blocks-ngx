"use strict";
exports.__esModule = true;
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.getInstance = function () {
        if (!this.instance) {
            this.instance = new ConfigService();
        }
        return this.instance;
    };
    ConfigService.configure = function (config) {
        this.defaultConfig = this.getInstance().mergeConfigs(this.defaultConfig, config);
    };
    ConfigService.prototype.mergeConfigs = function (config, mergeWith) {
        var clonedConfig = JSON.parse(JSON.stringify(config));
        if (!mergeWith) {
            return clonedConfig;
        }
        if (mergeWith.thrownStrategy !== undefined) {
            clonedConfig.thrownStrategy = mergeWith.thrownStrategy;
        }
        if (mergeWith.throwNaN !== undefined) {
            clonedConfig.throwNaN = mergeWith.throwNaN;
        }
        if (mergeWith.throwInfinite !== undefined) {
            clonedConfig.throwInfinite = mergeWith.throwInfinite;
        }
        if (mergeWith.throwUnsafeNumber !== undefined) {
            clonedConfig.throwUnsafeNumber = mergeWith.throwUnsafeNumber;
        }
        return clonedConfig;
    };
    ConfigService.prototype.createConfigs = function (customConfig) {
        return this.mergeConfigs(ConfigService.defaultConfig, customConfig);
    };
    ConfigService.instance = null;
    ConfigService.defaultConfig = {
        thrownStrategy: 'emit-event',
        throwNaN: true,
        throwInfinite: true,
        throwUnsafeNumber: true
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
