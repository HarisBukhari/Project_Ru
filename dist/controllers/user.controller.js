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
const user_service_1 = __importDefault(require("../services/user.service"));
const apiError_1 = __importDefault(require("../utils/apiError"));
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (!req.user) {
                throw new apiError_1.default(401, 'Unauthorized');
            }
            // Check if user is requesting their own data or is admin
            if (req.user.id !== userId && req.user.role !== 'admin') {
                throw new apiError_1.default(403, 'Forbidden');
            }
            const user = yield user_service_1.default.findUserById(userId);
            if (!user) {
                throw new apiError_1.default(404, 'User not found');
            }
            res.json(user);
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            if (!req.user || req.user.role !== 'admin') {
                throw new apiError_1.default(403, 'Forbidden');
            }
            const users = yield user_service_1.default.findAllUsers();
            res.json(users);
        });
    }
    updateUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { status } = req.body;
            if (!req.user) {
                throw new apiError_1.default(401, 'Unauthorized');
            }
            // Check if user is updating their own status or is admin
            if (req.user.id !== userId && req.user.role !== 'admin') {
                throw new apiError_1.default(403, 'Forbidden');
            }
            const updatedUser = yield user_service_1.default.updateUserStatus(userId, { status });
            res.json(updatedUser);
        });
    }
}
exports.default = new UserController();
