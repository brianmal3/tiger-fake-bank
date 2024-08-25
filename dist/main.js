"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
const tag = '🅿️ 🅿️ 🅿️ 🅿️ 🅿️ 🅿️ FakeBank 🅿️ 🅿️';
const logger = new common_1.Logger(tag);
(0, dotenv_1.config)();
async function bootstrap() {
    logger.log(`... really starting the Fake Bank ...`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const status = process.env.STATUS;
    let port = 8080;
    if (status == 'dev') {
        port = 3000;
    }
    await app.listen(port);
    logger.log(`Listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map