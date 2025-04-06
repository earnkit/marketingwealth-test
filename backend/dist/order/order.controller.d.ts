import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(name: string, date: string): Promise<import("./entities/order.entity").Order[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
