"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = exports.getPeople = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_PATH = 'https://swapi.dev/api/people/';
const getPeople = (page) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`${API_BASE_PATH}?page=${page}`);
        if (response === null || response === void 0 ? void 0 : response.data) {
            const results = response.data.results || [];
            for (let result of results) {
                try {
                    const homeworldResponse = yield axios_1.default.get(result.homeworld);
                    if (homeworldResponse.data) {
                        result.homeworld = homeworldResponse.data.name || 'Unknown';
                    }
                }
                catch (error) {
                    result.homeworld = 'No Name';
                }
            }
            return {
                count: ((_a = response.data) === null || _a === void 0 ? void 0 : _a.count) || 0,
                results
            };
        }
        return null;
    }
    catch (error) {
        console.error('FAILED TO RETRIEVE DATA', error.message);
    }
});
exports.getPeople = getPeople;
const getPerson = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const response = yield axios_1.default.get(`${API_BASE_PATH}?search=${name}`);
        if ((_c = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c.length) {
            const characterData = response.data.results[0];
            try {
                const homeworldResponse = yield axios_1.default.get(characterData.homeworld);
                if (homeworldResponse.data) {
                    characterData.homeworld = homeworldResponse.data.name || 'Unknown';
                }
            }
            catch (error) {
                characterData.homeworld = 'No Name';
            }
            return characterData;
        }
        return null;
    }
    catch (error) {
    }
});
exports.getPerson = getPerson;
//# sourceMappingURL=index.js.map