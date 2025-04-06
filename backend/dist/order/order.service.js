"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
let OrderService = class OrderService {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async create(createOrderDto) {
        const order = await this.orderRepository.create(createOrderDto);
        const toCreate = await this.orderRepository.insert(createOrderDto);
        return { message: "ok" };
    }
    async findAll() {
        return this.orderRepository.find();
    }
    async findOne(name, date) {
        return await this.orderRepository.createQueryBuilder('test')
            .where('test.name = :name', { name })
            .orWhere('test.date = :date', { date })
            .getMany();
    }
    async update(id, updateOrderDto) {
        let order = await this.orderRepository.findOneBy({ id: id });
        const updatedOrder = {
            ...order,
            ...updateOrderDto,
        };
        const toUpdate = await this.orderRepository.save(updatedOrder);
        return { message: "ok" };
    }
    async remove(id) {
        const toDelete = await this.orderRepository.delete(id);
        return { message: "ok" };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map