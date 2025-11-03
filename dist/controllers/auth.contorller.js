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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const jwt_1 = require("../utils/jwt");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.createUser(req.body);
            // Exclude password from response
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            res.status(201).json(userWithoutPassword);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_service_1.default.login(req.body);
            const token = (0, jwt_1.generateToken)(user);
            // Exclude password from response
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            res.json({
                user: userWithoutPassword,
                token
            });
        });
    }
}
exports.default = new AuthController();
