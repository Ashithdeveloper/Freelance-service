"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const DataBase_1 = __importDefault(require("./db/DataBase"));
const userlogin_route_1 = __importDefault(require("./routes/userlogin.route"));
const data_route_1 = __importDefault(require("./routes/data.route"));
const cors_2 = __importDefault(require("./config/cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", userlogin_route_1.default);
app.use("/api", data_route_1.default);
cors_2.default.start();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    (0, DataBase_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
